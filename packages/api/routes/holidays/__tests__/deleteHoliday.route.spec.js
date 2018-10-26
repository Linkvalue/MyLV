import deleteHoliday from '../deleteHoliday.route'

jest.mock('config', () => ({ cracra: { partnersRoles: ['board'] } }))
jest.unmock('../deleteHoliday.route')

describe('DELETE /api/holiday/{id}', () => {
  let request
  let reply
  beforeEach(() => {
    const server = {
      app: {
        models: {
          Holiday: {
            findById: jest.fn(() => Promise.resolve({
              user: 'hello',
              remove: jest.fn(() => Promise.resolve()),
            })),
          },
        },
      },
    }
    const auth = { credentials: { id: 'hello', roles: [] } }

    request = { server, auth }
    reply = jest.fn()
  })

  it('should delete holiday entry from db and return success', async () => {
    // Given
    request.params = { id: 'foo' }

    // When
    await deleteHoliday.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith({ success: true })
  })

  it('should return 403 if insufficient rights', async () => {
    // Given
    request.params = { id: 'foo' }
    request.auth.credentials.id = 'world'

    // When
    await deleteHoliday.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith(new Error('You don\'t have the rights to delete others holidays'))
  })

  it('should delete someone else\'s holiday from db if have rights', async () => {
    // Given
    request.params = { id: 'foo' }
    request.auth.credentials.id = 'world'
    request.auth.credentials.roles = ['board']

    // When
    await deleteHoliday.handler(request, reply)

    // Then
    expect(reply).toHaveBeenCalledWith({ success: true })
  })
})
