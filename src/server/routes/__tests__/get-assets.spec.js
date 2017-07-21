jest.unmock('../get-assets')

const getAssets = require('../get-assets')

describe('GET /{path*}', () => {
  let request
  let reply
  beforeEach(() => {
    request = { params: { path: '' } }
    reply = { file: jest.fn() }
  })

  it('should return index.html if no extension is found in path', () => {
    // Given
    request.params.path = 'hello/world'

    // When
    getAssets.handler(request, reply)

    // Then
    expect(reply.file).toHaveBeenCalledWith('dist/index.html')
  })

  it('should return index.html if no extension is found in path', () => {
    // Given
    request.params.path = 'assets/hello.css'

    // When
    getAssets.handler(request, reply)

    // Then
    expect(reply.file).toHaveBeenCalledWith('dist/assets/hello.css')
  })
})
