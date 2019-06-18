import React from "react"
import { shallow } from "enzyme"
import Header from "~/Components/SelectContacts/header"
import SelectContacts from "~/Screens/SelectContacts/SelectContacts"
import { ListItem } from "react-native-elements"
import { FAB } from "react-native-paper"

describe("rendering", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<SelectContacts />)
  })
  it("should render a FlatList", () => {
    expect(wrapper.find("FlatList")).toHaveLength(1)
  })
  it("should render a item", () => {
    expect(wrapper.find(ListItem)).toHaveLength(1)
  })
  it("should render a header", () => {
    expect(wrapper.find(Header)).toHaveLength(1)
  })
  it("should render a fab button", () => {
    expect(wrapper.find(FAB.Group)).toHaveLength(1)
  })
})
