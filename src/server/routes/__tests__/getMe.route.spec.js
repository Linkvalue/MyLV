jest.unmock('../getMe.route')

const getMe = require('../getMe.route')

describe('GET /api/me', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      app: {
        models: {
          ProofOfTransport: {
            findOne: jest.fn(() => ({
              sort: jest.fn(async () => null),
            })),
          },
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
    expect(request.server.app.models.ProofOfTransport.findOne)
      .toHaveBeenCalledWith({ userId: request.auth.credentials.id })
    expect(reply.mongodb).toHaveBeenCalledWith(Object.assign({}, request.auth.credentials, {
      proofOfTransport: null,
    }))
  })
})
