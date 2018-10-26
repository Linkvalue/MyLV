jest.unmock('../getMe.route')

const getMe = require('../getMe.route')

describe('GET /api/me', () => {
  let request
  let reply
  let profile
  beforeEach(() => {
    profile = { hasProofOfTransport: false }
    const server = {
      app: {
        models: {
          Profile: {
            findOne: jest.fn(() => profile),
          },
        },
      },
      plugins: {
        proofOfTransports: {
          getLatestProofOfTransport: jest.fn(() => ({ foo: 'bar' })),
        },
      },
    }
    const auth = { credentials: { foo: 'bar', id: '0123456789' } }

    request = { auth, server }
    reply = {
      mongodb: jest.fn(),
    }
  })

  it('should reply user profile', async () => {
    // When
    await getMe.handler(request, reply)

    // Then
    expect(request.server.plugins.proofOfTransports.getLatestProofOfTransport)
      .not.toHaveBeenCalled()
    expect(reply.mongodb).toHaveBeenCalledWith(Object.assign({}, request.auth.credentials, {
      proofOfTransport: undefined,
      profile,
    }))
  })

  it('should reply user profile with proofOfTransport', async () => {
    // Given
    profile.hasProofOfTransport = true

    // When
    await getMe.handler(request, reply)

    // Then
    expect(request.server.plugins.proofOfTransports.getLatestProofOfTransport)
      .toHaveBeenCalledWith(request.auth.credentials.id)
    expect(reply.mongodb).toHaveBeenCalledWith(Object.assign({}, request.auth.credentials, {
      proofOfTransport: { foo: 'bar' },
      profile,
    }))
  })
})
