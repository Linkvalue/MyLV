jest.unmock('joi')
jest.unmock('../postClient.route')

const postClient = require('../postClient.route')

describe('POST /api/clients', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      app: {
        models: {
          Client: {
            create: jest.fn(obj => Promise.resolve(obj)),
          },
        },
      },
    }

    request = { server }
    reply = jest.fn()
  })

  it('should return created client', async () => {
    // Given
    expect.assertions(2)
    request.payload = {
      name: 'foo',
      address: 'bar',
    }

    // When
    await postClient.handler(request, reply)

    // Then
    expect(request.server.app.models.Client.create).toHaveBeenCalledWith(request.payload)
    expect(reply).toHaveBeenCalledWith(request.payload)
  })
})
