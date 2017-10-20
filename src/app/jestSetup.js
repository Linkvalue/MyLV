import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

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
