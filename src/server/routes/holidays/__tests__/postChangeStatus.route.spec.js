import postChangeStatus from '../postChangeStatus.route'
import {
  HOLIDAY_REQUEST_APPROVED,
  HOLIDAY_REQUEST_REJECTED,
  HOLIDAY_REQUEST_PENDING,
} from '../../../../shared/holidays.constants'
import { getPeriodDayCount } from '../../../../shared/holidays.utils'

jest.unmock('moment')
jest.unmock('../postChangeStatus.route')

describe('POST /api/holidays/{id}/changeStatus', () => {
  let request
  let reply
  let holidayRequest
  beforeEach(() => {
    holidayRequest = {
      status: HOLIDAY_REQUEST_PENDING,
      periods: [{
        label: 'foo',
        startDate: '2018-07-11 12:00:00',
        endDate: '2018-07-16 12:00:00',
      }],
      user: 'bar',
    }

    const Holiday = {
      findOneAndUpdate: jest.fn((_, { $set: { status } }) => Promise.resolve({
        ...holidayRequest,
        status,
      })),
    }

    const server = {
      app: {
        models: {
          Holiday,
        },
      },
      methods: {
        sendPushNotification: jest.fn(),
      },
      plugins: {
        worklog: {
          saveEntries: jest.fn((() => Promise.resolve())),
        },
      },
    }

    request = { server, payload: {}, params: { id: 'foo' } }
    reply = { mongodb: jest.fn() }
  })

  it('should return updated holiday request', async () => {
    // Given
    request.payload.status = HOLIDAY_REQUEST_REJECTED

    // When
    await postChangeStatus.handler(request, reply)

    // Then
    expect(reply.mongodb).toHaveBeenCalledWith({
      ...holidayRequest,
      status: HOLIDAY_REQUEST_REJECTED,
    })
  })

  it('should generate worklog entries if request is apporved', async () => {
    // Given
    request.payload.status = HOLIDAY_REQUEST_APPROVED
    getPeriodDayCount.mockImplementation(() => 5)

    // When
    await postChangeStatus.handler(request, reply)

    // Then
    expect(request.server.plugins.worklog.saveEntries).toHaveBeenCalledWith([
      { date: '2018-07-11-pm', label: 'foo' },
      { date: '2018-07-12-am', label: 'foo' },
      { date: '2018-07-12-pm', label: 'foo' },
      { date: '2018-07-13-am', label: 'foo' },
      { date: '2018-07-13-pm', label: 'foo' },
      { date: '2018-07-16-am', label: 'foo' },
    ], 'bar')
  })
})
