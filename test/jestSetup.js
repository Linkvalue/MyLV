const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

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
