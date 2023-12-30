import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { FontAwesome } from '@expo/vector-icons';
import GlobalApi from '../Services/GlobalApi';
export default function ChatScreen() {
//     const [messages, setMessages] = useState([])

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ])
//   }, [])

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    

  

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     )
//   }, [])
//   return (

//     <View style={{flex:1,backgroundColor:'black'}}>
//       <GiftedChat
//       messages={messages}
//       onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
const onSend = useCallback((messages = []) => {
       
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    if(messages[0].text)
    {
      getBardResp(messages[0].text);
    }
  }, [])

  const getBardResp=(msg)=>{
      setLoading(true)
      GlobalApi.getGemeni(msg).then(resp=>{
         
          if(resp.data.resp[1].content)
          {
              setLoading(false)
              const chatAIResp={
                  _id: Math.random()* (9999999 - 1),
                  text: resp.data.resp[1].content,
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'P C ',
                    
                
                }
              }
              setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  

          }
          else{
              setLoading(false)
              const chatAIResp={
                  _id: Math.random()* (9999999 - 1),
                  text: "Sorry, I can not help with it",
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    
                
                }
              }
              setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
          }
      },
      error=>{
        
      })
  }

 const renderBubble =(props)=> {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#671ddf',
             
            },left:{
             
            }
           
          }}
          textStyle={{
              right:{
                  // fontSize:20,
                  padding:2
              },
              left: {
                color: '#671ddf',
                // fontSize:20,
                padding:2
              }
            }}
        />
      )
    }

  const  renderInputToolbar =(props)=> {
      //Add the extra styles via containerStyle
     return <InputToolbar {...props} 
     containerStyle={{
     padding:3,
    
      backgroundColor:'#671ddf',
      color:'#fff',
      }} 
      
      textInputStyle={{ color: "#fff" }}
       />
   }

 const  renderSend=(props)=> {
      return (
          <Send
              {...props}
          >
              <View style={{marginRight: 10, marginBottom: 5}}>
              <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
                 
              </View>
          </Send>
      );
  }
return (
  <View style={{ flex: 1,backgroundColor:'#fff' }}>

    <GiftedChat
    messages={messages}
    isTyping={loading}
    multiline ={true}
    onSend={messages => onSend(messages)}
    user={{
      _id: 1,
    
    }}
    renderBubble={renderBubble}
    renderInputToolbar={renderInputToolbar} 
    renderSend={renderSend}
  />
  
    </View>
  )
}