import getPersonalHolidays from '../getPersonalHolidays.route'

jest.unmock('../getPersonalHolidays.route')

describe('GET /api/holidays/me', () => {
  let request
  let reply
  beforeEach(() => {
    const Holiday = {
      find: jest.fn(() => Promise.resolve([{ foo: 'bar' }])),
      where: jest.fn(() => Holiday),
      sort: jest.fn(() => Holiday),
    }

    const server = {
      app: {
        models: {
          Holiday,
        },
      },
    }
    const auth = { credentials: { id: 'hello' } }

    request = { server, auth }
    reply = { mongodb: jest.fn() }
  })

  it('should return holidays for authenticated user', async () => {
    // When
    await getPersonalHolidays.handler(request, reply)

    // Then
    expect(reply.mongodb).toHaveBeenCalledWith({ results: [{ foo: 'bar' }] })
  })
})
