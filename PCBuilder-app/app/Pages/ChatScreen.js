// import { View, Text } from 'react-native'
// import React, { useCallback, useEffect, useState } from 'react'
// import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
// import { FontAwesome } from '@expo/vector-icons';
// import GlobalApi from '../Services/GlobalApi';
// import { useRoute } from "@react-navigation/native"


// export default function ChatScreen() {
//     const route=useRoute() 
//     const userValue=route.params?.userValue

//     var message1="As of today, build me a pc "+userValue
    
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
    
// const onSend = useCallback((messages = []) => {
       
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//     if(messages[0].text)
//     {
     
//       getGemeniresp(messages[0].text);
//     }
//   }, [])

//   const getGemeniresp=(msg)=>{
//       setLoading(true)
//       GlobalApi.getGemeni(msg).then(resp=>{
         
//           if(resp.data.resp[1].content)
//           {
//               setLoading(false)
//               const chatAIResp={
//                   _id: Math.random()* (9999999 - 1),
//                   text: resp.data.resp[1].content,
//                   createdAt: new Date(),
//                   user: {
//                     _id: 2,
//                     name: 'P C ',
                    
                
//                 }
//               }
//               setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  

//           }
//           else{
//               setLoading(false)
//               const chatAIResp={
//                   _id: Math.random()* (9999999 - 1),
//                   text: "Sorry, I can not help with it",
//                   createdAt: new Date(),
//                   user: {
//                     _id: 2,
//                     name: 'P C',
                    
                
//                 }
//               }
//               setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
//           }
//       },
//       error=>{
        
//       })
//   }

//  const renderBubble =(props)=> {
//       return (
//         <Bubble
//           {...props}
//           wrapperStyle={{
//             right: {
//               backgroundColor: '#671ddf',
             
//             },left:{
             
//             }
           
//           }}
//           textStyle={{
//               right:{
//                   // fontSize:20,
//                   padding:2
//               },
//               left: {
//                 color: '#671ddf',
//                 // fontSize:20,
//                 padding:2
//               }
//             }}
//         />
//       )
//     }

//   const  renderInputToolbar =(props)=> {
//       //Add the extra styles via containerStyle
//      return <InputToolbar {...props} 
//      containerStyle={{
//      padding:3,
    
//       backgroundColor:'#671ddf',
//       color:'#fff',
//       }} 
      
//       textInputStyle={{ color: "#fff" }}
//        />
//    }

//  const  renderSend=(props)=> {
//       return (
//           <Send
//               {...props}
//           >
//               <View style={{marginRight: 10, marginBottom: 5}}>
//               <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
                 
//               </View>
//           </Send>
//       );
//   }
// return (
//   <View style={{ flex: 1,backgroundColor:'#fff' }}>

//     <GiftedChat
//     messages={messages}
//     isTyping={loading}
//     multiline ={true}
//     onSend={messages => onSend(messages)}
//     user={{
//       _id: 1,
    
//     }}
//     renderBubble={renderBubble}
//     renderInputToolbar={renderInputToolbar} 
//     renderSend={renderSend}
//   />
  
//     </View>
//   )
// }

import { View, Button } from 'react-native'
import React, { useState } from 'react'
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { FontAwesome } from '@expo/vector-icons';
import GlobalApi from '../Services/GlobalApi';
import { useRoute } from "@react-navigation/native"

export default function ChatScreen() {
  const route = useRoute()
  const userValue = route.params?.userValue

  var message1 = "As of today, build me a pc " + userValue+ "\n and give me the sites and the price for each part  "

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getGemeniresp = () => {
    setLoading(true)
    GlobalApi.getGemeni(message1).then(resp => {
      if (resp.data.resp[1].content) {
        setLoading(false)
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: resp.data.resp[1].content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'P C ',
          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))
      } else {
        setLoading(false)
        const chatAIResp = {
          _id: Math.random() * (9999999 - 1),
          text: "Sorry, I can not help with it",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'P C',
          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))
      }
    },
      error => {
        setLoading(false)
        // Handle error
      })
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#671ddf',
          },
          left: {

          }

        }}
        textStyle={{
          right: {
            padding: 2
          },
          left: {
            color: '#671ddf',
            padding: 2
          }
        }}
      />
    )
  }

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={{ position:'relative',height: 0, width:0,bottom: 0, right: 0}} />
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
        </View>
      </Send>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline={true}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        minInputToolbarHeight={0}
        renderSend={renderSend}
      />
      <Button title="Ask Bot" onPress={getGemeniresp} color='#8A2BE2'/>
    </View>
  )
}

