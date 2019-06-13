import React from "react"
import { shallow } from "enzyme"
import { Avatar, Overlay } from "react-native-elements"
import CreateGroup from "../src/Screens/CreateGroup/CreateGroup"

describe("rendering", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<CreateGroup />)
  })
  it("should render a overlay", () => {
    expect(wrapper.find(Overlay)).toHaveLength(1)
  })
  it("should render a textInput", () => {
    expect(wrapper.find("TextInput")).toHaveLength(1)
  })
  it("should render a avatar placeholder", () => {
    expect(wrapper.find(Avatar)).toHaveLength(1)
  })
})
