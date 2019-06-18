import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { shallow } from "enzyme"
import About from "~/Screens/About/about"

describe("rendering", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<About />)
  })

  it("should render 5 text components", () => {
    expect(wrapper.find(Text)).toHaveLength(5)
  })
  it("should render 3 views components", () => {
    expect(wrapper.find(View)).toHaveLength(3)
  })
  it("should render 1 scrollview component", () => {
    expect(wrapper.find(ScrollView)).toHaveLength(1)
  })
  it("should render 1 touchableopacity component", () => {
    expect(wrapper.find(TouchableOpacity)).toHaveLength(1)
  })
})
