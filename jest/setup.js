import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import mockAsyncStorage from "@react-native-community/async-storage/jest/async-storage-mock"

Enzyme.configure({ adapter: new Adapter() })
jest.mock("@react-native-community/async-storage", () => mockAsyncStorage)
jest.mock("react-native-firebase/react-native-firebase")
