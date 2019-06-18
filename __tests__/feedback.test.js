import React from "react"
import { shallow } from "enzyme"
import Touchable from "react-native-platform-touchable"
import { Icon } from "react-native-elements"
import Feedback from "../src/Screens/Feedback/feedback"

describe("rendering", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Feedback />)
  })
  it("Deveria renderizar 5 Views", () => {
    expect(wrapper.find("View")).toHaveLength(5)
  })
  it("Deveria renderizar 1 StatusBar", () => {
    expect(wrapper.find("StatusBar")).toHaveLength(1)
  })
  it("Deveria renderizar 1 Icon", () => {
    expect(wrapper.find(Icon)).toHaveLength(1)
  })
  it("Deveria renderizar 2 LinearGradient", () => {
    expect(wrapper.find("LinearGradient")).toHaveLength(2)
  })
  it("Deveria renderizar 1 Touchable", () => {
    expect(wrapper.find(Touchable)).toHaveLength(1)
  })
  it("Deveria renderizar 1 TouchableWithoutFeedback", () => {
    expect(wrapper.find("TouchableWithoutFeedback")).toHaveLength(1)
  })
  it("Deveria renderizar 1 TouchableOpacity", () => {
    expect(wrapper.find("TouchableOpacity")).toHaveLength(1)
  })
  it("Deveria renderizar 4 Text", () => {
    expect(wrapper.find("Text")).toHaveLength(4)
  })
  it("Deveria renderizar 1 TextInput", () => {
    expect(wrapper.find("TextInput")).toHaveLength(1)
  })
})
