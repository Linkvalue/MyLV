jest.unmock('joi')
jest.unmock('../deleteSubscription.route')

const deleteSubscription = require('../deleteSubscription.route')

describe('DELETE /api/subscriptions/{id}', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      app: {
        models: {
          Subscription: {
            deleteOne: jest.fn(() => Promise.resolve()),
          },
        },
      },
    }
    const auth = { credentials: { id: 'hello' } }

    request = { server, auth }
    reply = jest.fn()
  })

  it('should delete subscription successfully', async () => {
    // Given
    request.params = { id: 1234 }

    // When
    await deleteSubscription.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith({ deleted: true })
  })
})
