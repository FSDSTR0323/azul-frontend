import { useContext, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import SnackbarContent from '@mui/material/SnackbarContent';
import SendIcon from '@mui/icons-material/Send';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const MessageBox = ({ selectedConversation }) => {

  const { userData, userDataMessages, unreadConversations, setUnreadConversations, setUnreadCount, unreadCount, userDataChangeDummy, setUserDataChangeDummy } = useContext(UserContext)
  const [dummy, setDummy] = useState(true)
  const [ conversationData, setConversationData] = useState({})

  useEffect(() => {
    fetchConversationData(selectedConversation)
    setMessagesToRead(selectedConversation)
    // if (unreadConversations.includes(selectedConversation)) {
    //   setUnreadCount(unreadCount - 1)
    //   if (unreadConversations) {
    //     const newUnreadConversations = unreadConversations.filter(conver => conver !== selectedConversation)
    //     setUnreadConversations(newUnreadConversations)
    //   }
    // }
  }, [userDataMessages, selectedConversation])

  const fetchConversationData = (selectedConversation) => {
    
    if(Object.keys(selectedConversation).length !== 0) {
      const conversationInfo = {
        avatar_image: "",
        username: "",
        user_id: "",
        messages: [],
      }
      if (selectedConversation.conversation.interlocutor1._id === userData._id) {
        conversationInfo.username = selectedConversation.conversation.interlocutor2.username
        conversationInfo.avatar_image = selectedConversation.conversation.interlocutor2.avatar_image
        conversationInfo.user_id = selectedConversation.conversation.interlocutor2._id
      } else {
        conversationInfo.username = selectedConversation.conversation.interlocutor1.username
        conversationInfo.avatar_image = selectedConversation.conversation.interlocutor1.avatar_image
        conversationInfo.user_id = selectedConversation.conversation.interlocutor1._id
      }
  
      conversationInfo.messages = selectedConversation.messages

      setConversationData(conversationInfo)
    }
  }

  const setMessagesToRead = async (selectedConversation) => {
    await axios.put('http://localhost:5000/updateMessages', {conversation_id: selectedConversation.conversation?._id}, authorizationConfig.getHeaders())
  }

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: "#ff2d55"
    },
  }));

  const handleSendMessage = async () => {
    let message = document.getElementById("messages-input")
    if (message.value !== "") {
      try {
          await axios.post('http://localhost:5000/sendmessage', {receiver: conversationData.user_id, message: message.value}, authorizationConfig.getHeaders())
          message.value = ""
          setUserDataChangeDummy(!userDataChangeDummy)
          setDummy(!dummy)
      } catch(error) {
          console.log("Error al enviar un mensaje", error)
      }
    }
}

const sendMessage = (event)=> {
  console.log("se ejecuta something")
  if (event.keyCode === 13) {
    console.log("se teclea enter")
    handleSendMessage()
  }
}

if (conversationData) {
  return (
    <section className='messages-section'>
      <div className='message-box-header'>
        <img src={conversationData.avatar_image || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" } alt="User avatar" className='avatar-navbar-image'/>
        <Typography component="div" variant="h5">
          {conversationData.username}
        </Typography>
      </div>
      <div className='messages-container'>
        {conversationData.messages &&
          conversationData.messages.map((message) => {
            const messageSender = message.sender === userData._id ? "user-message" : "other-user-message"
            const messageDate = new Date(message.createdAt)
            const hour = messageDate.getHours()
            let minutes = messageDate.getMinutes().toString()
            if (minutes.length === 1) {
              minutes = minutes.concat("0")
            } 

            const messageRead = () => {
              return message.read ? "primary" : "action"
            }

            return (
              <div key={message._id} className={messageSender}> 
                <p className='message'>{message.message}<span className='message-date'>{hour}:{minutes}</span></p>
                {messageSender === "user-message" &&
                <DoneAllIcon color={messageRead()} fontSize='10px'/>
                }
              </div>
            )
          })
        }
      </div>
      <div className='messages-input-container'>
        <input id="messages-input" className='messages-input' onKeyDown={e => sendMessage(e)}></input>
        <IconButton 
          style={{cursor:"pointer"}} 
          onClick={handleSendMessage}
          className='navbar-icon'
          >
          <StyledBadge color="secondary">
            <SendIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </section>
  )
}
}
