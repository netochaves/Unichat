import React from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import { shallow } from "enzyme"
import About from "~/Screens/About/about"
import AboutHeader from "~/Components/About/aboutHeader"

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
  it("should render 1 image component", () => {
    expect(wrapper.find(Image)).toHaveLength(1)
  })
  it("should render AboutHeader component", () => {
    expect(wrapper.find(AboutHeader)).toHaveLength(1)
  })
})
