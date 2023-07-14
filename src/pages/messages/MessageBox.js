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

export const MessageBox = ({ selectedConversation }) => {

  const { userData, userDataMessages, userDataChangeDummy, setUserDataChangeDummy } = useContext(UserContext)
  const [dummy, setDummy] = useState(true)
  const [ conversationData, setConversationData] = useState({})

  useEffect(() => {
    fetchConversationData(selectedConversation)
  }, [userDataMessages, selectedConversation])

  const fetchConversationData = (selectedConversation) => {
    
    if(Object.keys(selectedConversation).length !== 0) {
      const conversationInfo = {
        avatar_image: "",
        username: "",
        user_id: "",
        messages: [],
      }
      console.log("LA CONVER SELECCIONADO ES ???????????¿¿¿¿¿¿¿¿¿¿¿¿¿", selectedConversation)
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
  
      const date = new Date(selectedConversation.messages[selectedConversation.messages.length - 1].createdAt)
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const dayAndMonth = date.getDate() + " " + months[date.getMonth()].slice(0,3)
      console.log("la fecha es:::::::::", dayAndMonth)
  
      console.log("La variable con la info es", conversationInfo)
  
      setConversationData(conversationInfo)
    }
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
if (conversationData) {

  return (
    <section className='messages-section'>
      <div className='message-box-header'>
        <img src={conversationData.avatar_image} alt="User avatar" className='avatar-navbar-image'/>
        <Typography component="div" variant="h5">
          {conversationData.username}
        </Typography>
      </div>
      <div className='messages-container'>
        {conversationData.messages &&
          conversationData.messages.map((message) => {
            const className = () => {
              return message.sender === userData._id ? "user-message" : "other-user-message"
            }
            return (
              <div className={className()}> 
                <p className='message'>{message.message}</p>
              </div>
            )
          })
        }
      </div>
      <div className='messages-input-container'>
        <input id="messages-input" className='messages-input'></input>
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
