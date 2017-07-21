jest.unmock('joi')
jest.unmock('../post-auth')

jest.mock('boom', () => ({ wrap: jest.fn(err => ({ wrapped: err })) }))
jest.mock('../../helpers/lvconnect.helper', () => ({
  proxy: jest.fn(() => Promise.resolve({ token: 'yolo' }))
}))

const getAssets = require('../post-auth')
const lvConnect = require('../../helpers/lvconnect.helper')

describe('POST /api/auth', () => {
  let request
  let reply
  beforeEach(() => {
    request = { auth: { credentials: { foo: 'bar' } } }
    reply = jest.fn(() => reply)
    reply.code = jest.fn()
  })

  it('should reply lvConnect response if 200', async () => {
    // Given
    expect.assertions(1)

    // When
    await getAssets.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith({ token: 'yolo' })
  })

  it('should set status code if present in response', async () => {
    // Given
    expect.assertions(2)
    lvConnect.proxy.mockImplementation(() => Promise.reject({ statusCode: 400 }))

    // When
    await getAssets.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith({ statusCode: 400 })
    expect(reply.code).toHaveBeenCalledWith(400)
  })

  it('should wrap error if no statusCode', async () => {
    // Given
    expect.assertions(1)
    lvConnect.proxy.mockImplementation(() => Promise.reject({ foo: 'bar' }))

    // When
    await getAssets.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith({ wrapped: { foo: 'bar' } })
  })
})
