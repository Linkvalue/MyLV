const Joi = require('joi')

module.exports = {
  method: 'PUT',
  path: '/api/profile/me',
  config: {
    validate: {
      payload: Joi.object().keys({
        hasProofOfTransport: Joi.bool(),
      }),
    },
  },
  async handler(req, res) {
    const updatedProfile = await req.server.app.models.Profile.findOneAndUpdate(
      { userId: req.auth.credentials.id },
      { $set: req.payload },
      { new: true },
    )

    res.mongodb(updatedProfile)
  },
}
