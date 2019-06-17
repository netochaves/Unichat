/* eslint-disable react-native/no-inline-styles */
import React from "react"

import { View, FlatList } from "react-native"
import getTime from "~/functions/getTime"
import Message from "../mensagem"

const Chat = props => {
  const { messages, destUserUid, onLoadMore } = props
  return (
    <View>
      <FlatList
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        data={messages}
        inverted
        keyExtractor={item => item.key}
        renderItem={({ item }) => {
          return (
            <Message
              nomeRemetente={null}
              chave={item.key}
              destUserUid={destUserUid}
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
