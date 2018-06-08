import getHolidays from '../getHolidays.route'

jest.unmock('../getHolidays.route')

describe('GET /api/holidays', () => {
  let request
  let reply
  beforeEach(() => {
    const Holiday = {
      exec: jest.fn(() => {
        const instance = Object.create({ toJSON() { return { ...this } } })
        instance.user = 'foo'
        return Promise.resolve([instance])
      }),
      find: jest.fn(() => Holiday),
      sort: jest.fn(() => Holiday),
      limit: jest.fn(() => Holiday),
      skip: jest.fn(() => Holiday),
      count: jest.fn(() => Promise.resolve(10)),
    }

    const server = {
      app: {
        models: {
          Holiday,
        },
      },
    }
    const auth = { credentials: { id: 'hello' } }

    request = {
      server,
      auth,
      query: { page: 1, limit: 25 },
      app: { lvConnect: { api: jest.fn() } },
    }
    reply = { mongodb: jest.fn() }
  })

  it('should return holidays for authenticated user', async () => {
    // Given
    request.app.lvConnect.api.mockImplementation(() => Promise.resolve({
      json: jest.fn(() => Promise.resolve({ results: [{ id: 'foo' }] })),
    }))

    // When
    await getHolidays.handler(request, reply)

    // Then
    expect(reply.mongodb).toHaveBeenCalledWith({
      page: 1,
      pageCount: 1,
      limit: 25,
      results: [{ user: { id: 'foo' } }],
    })
  })
})
