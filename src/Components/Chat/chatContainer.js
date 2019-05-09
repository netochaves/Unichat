import React from "react"

import { View } from "react-native"
import shortid from "shortid"
import { ScrollView } from "react-native-gesture-handler"
import getTime from "~/functions/getTime"
import Message from "../mensagem"

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
              original={message.content}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Chat
