jest.unmock('moment')
jest.unmock('joi')
jest.unmock('../putWorklog.route')

jest.mock('boom', () => ({
  badRequest: jest.fn(message => message),
  forbidden: jest.fn(message => message),
}))

jest.mock('config', () => ({ cracra: { partnersRoles: ['hr'] } }))

const moment = require('moment')
const putWorklog = require('../putWorklog.route')

describe('PUT /api/worklog', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      plugins: {
        worklog: {
          saveEntries: jest.fn(() => Promise.resolve()),
        },
      },
    }
    const auth = { credentials: { id: 'hello', roles: ['hr'] } }

    request = { server, auth, params: { id: 'yolo' } }
    reply = jest.fn()
  })

  it('should return an out of bounds error when at least one date is invalid', () => {
    // Given
    request.payload = [{
      date: `${moment().add(3, 'months').format('YYYY-MM-DD')}-am`,
    }]

    // When
    putWorklog.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith('One or more entries have dates farther than to months from now')
  })

  it('should return an error if client is specified without manager', () => {
    // Given
    request.payload = [{
      date: `${moment().add(1, 'months').format('YYYY-MM-DD')}-am`,
      client: 'foo',
    }]

    // When
    putWorklog.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith('One or more entries have specified a client without a manager')
  })

  it('should return an error if manager is specified without client', () => {
    // Given
    request.payload = [{
      date: `${moment().add(1, 'months').format('YYYY-MM-DD')}-am`,
      manager: 'foo',
    }]

    // When
    putWorklog.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith('One or more entries have specified a client without a manager')
  })

  it('should return success if payload is valid', async () => {
    // Given
    expect.assertions(2)
    request.payload = [{
      date: `${moment().add(1, 'months').format('YYYY-MM-DD')}-am`,
      client: 'foo',
      manager: 'bar',
      label: 'yolo',
    }]

    // When
    await putWorklog.handler(request, reply)

    // Then
    expect(request.server.plugins.worklog.saveEntries).toHaveBeenCalledWith([{ ...request.payload[0] }], 'yolo')
    expect(reply).toHaveBeenCalledWith({ success: true })
  })

  it('should not permit edition of others worklog with insucient permissions', async () => {
    // Given
    request.auth.credentials.roles = []

    // When
    putWorklog.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith('Insuffiscient rights')
  })
})
