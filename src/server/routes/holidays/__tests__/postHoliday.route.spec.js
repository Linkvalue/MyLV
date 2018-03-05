import moment from 'moment'
import postHoliday from '../postHoliday.route'

jest.mock('moment', () => jest.fn())
jest.unmock('../postHoliday.route')

describe('POST /api/holiday', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      app: {
        models: {
          Holiday: {
            create: jest.fn(holiday => Promise.resolve(holiday)),
          },
        },
      },
    }
    const auth = { credentials: { id: 'hello' } }

    request = { server, auth }
    reply = { mongodb: jest.fn() }
  })

  it('should create holiday entry in db and return it', async () => {
    // Given
    request.payload = { periods: [{ label: 'foo', startDate: 'bar', endDate: 'baz' }] }
    moment.mockImplementation(() => ({ toDate: jest.fn(() => 'qux') }))

    // When
    await postHoliday.handler(request, reply)

    // Then
    expect(reply.mongodb).toHaveBeenCalledWith({
      user: 'hello',
      date: 'qux',
      periods: request.payload.periods,
    })
  })
})
