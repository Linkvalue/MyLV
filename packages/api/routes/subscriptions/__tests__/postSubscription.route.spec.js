jest.unmock('joi')
jest.unmock('../postSubscription.route')

const postSubscription = require('../postSubscription.route')

describe('DELETE /api/subscriptions/{id}', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      app: {
        models: {
          Subscription: {
            create: jest.fn(sub => Promise.resolve(sub)),
          },
        },
      },
    }
    const auth = { credentials: { id: 'hello' } }

    request = { server, auth }
    reply = { mongodb: jest.fn() }
  })

  it('should create subscription successfully', async () => {
    // Given
    request.payload = {
      endpoint: 'foo',
      keys: {
        auth: 'test',
        p256dh: 'yolo',
      },
    }

    // When
    await postSubscription.handler(request, reply)

    // Then
    expect(reply.mongodb).toHaveBeenCalledWith({ ...request.payload, user: 'hello' })
  })
})
