import React from "react"

import { View } from "react-native"
import shortid from "shortid"
import { ScrollView } from "react-native-gesture-handler"

import Message from "../mensagem"

const getTime = date => {
  let TimeType
  let hour
  let minutes

  hour = date.getHours()
  if (hour <= 11) {
    TimeType = "AM"
  } else {
    TimeType = "PM"
  }
  if (hour > 12) {
    hour -= 12
  }
  if (hour === 0) {
    hour = 12
  }
  minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = 0 + minutes.toString()
  }
  return `${hour.toString()} : ${minutes.toString()} ${TimeType.toString()}`
}

const Chat = props => {
  const { messages } = props
  let scrollView = null
  return (
    <View>
      <ScrollView
        ref={ref => {
          scrollView = ref
        }}
        onContentSizeChange={() => {
          scrollView.scrollToEnd({ animated: true })
        }}
      >
        {messages.map(message => {
          return (
            <Message
              key={shortid.generate()}
              content={
                message.source === "1"
                  ? message.content
                  : message.contentTranslated
              }
              date={getTime(message.date)}
              source={message.source}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Chat
