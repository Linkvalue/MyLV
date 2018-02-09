const Joi = require('joi')
const promisePipe = require('promisepipe')

const formatDate = require('../../helpers/formatDate.helper')

module.exports = {
  method: 'POST',
  path: '/api/proofOfTransport',
  config: {
    payload: {
      maxBytes: 20 * 1024 * 1024,
      parse: true,
      output: 'stream',
      allow: 'multipart/form-data',
    },
    validate: {
      payload: {
        expirationDate: Joi.date().required(),
        startingDate: Joi.date().required(),
        file: Joi.any().required(),
      },
    },
  },
  async handler(req, res) {
    const { file, expirationDate, startingDate } = req.payload
    const { gridfs } = req.server.plugins.mongodb
    const { ProofOfTransport } = req.server.app.models
    const userId = req.auth.credentials.id
    const { firstName, lastName } = req.auth.credentials

    const fileExt = file.hapi.filename.split('.').slice(1).join('.')
    const filename = `${firstName}-${lastName}-${formatDate(startingDate)}-${formatDate(expirationDate)}.${fileExt}`

    const gridFile = gridfs.createWriteStream({
      filename,
      content_type: file.hapi.headers['content-type'],
    })

    await promisePipe(file, gridFile)

    try {
      const proof = await ProofOfTransport.create({
        userId,
        expirationDate,
        startingDate,
        fileId: gridFile.id,
      })

      res.mongodb(proof)
    } catch (err) {
      gridfs.remove({ _id: gridFile.id })
      throw err
    }
  },
}
