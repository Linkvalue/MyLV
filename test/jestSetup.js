const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

jest.mock('@cracra/config/app', () => ({ cracra: {}, appName: 'MyLV' }))
jest.mock('@cracra/config/server', () => ({ cracra: {}, lvconnect: {} }))
jest.mock('@cracra/config', () => ({}))

let consoleError

beforeAll(() => {
  consoleError = console.error
  console.error = (err) => {
    throw err
  }
})

afterAll(() => {
  console.error = consoleError
})
