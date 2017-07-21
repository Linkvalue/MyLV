jest.unmock('../get-me')

const getMe = require('../get-me')

describe('GET /api/me', () => {
  let request
  let reply
  beforeEach(() => {
    request = { auth: { credentials: { foo: 'bar' } } }
    reply = jest.fn()
  })

  it('should reply user profile', () => {
    // When
    getMe.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith(request.auth.credentials)
  })
})
