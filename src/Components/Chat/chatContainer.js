import React from "react"

import { View, FlatList } from "react-native"
import getTime from "~/functions/getTime"
import Message from "../mensagem"

const Chat = props => {
  const { messages } = props
  return (
    <View>
      <FlatList
        data={messages}
        inverted
        renderItem={({ item }) => {
          return (
            <Message
              key={item.key}
              content={
                item.source === "1" ? item.content : item.contentTranslated
              }
              date={getTime(item.date)}
              source={item.source}
              original={item.content}
            />
          )
        }}
      />
    </View>
  )
}

export default Chat
