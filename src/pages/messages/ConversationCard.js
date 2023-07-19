import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../contexts/UserContext';
import Divider from '@mui/material/Divider'; 
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

export default function ConversationCard({ handleSelectConversation, conversation }) {

    const { userData, userMessages, unreadConversations, setUnreadConversations } = useContext(UserContext)
    const [ lastMessage, setLastMessage] = useState({})
    const [ conversationData, setConversationData] = useState({})

    useEffect(() => {

      const conversationInfo = {
        avatar_image: "",
        username: "",
        user_id: "",
        messages: [],
      }
      
      if (conversation.conversation.interlocutor1._id === userData._id) {
        conversationInfo.username = conversation.conversation.interlocutor2.username
        conversationInfo.avatar_image = conversation.conversation.interlocutor2.avatar_image
        conversationInfo.user_id = conversation.conversation.interlocutor2._id
      } else {
        conversationInfo.username = conversation.conversation.interlocutor1.username
        conversationInfo.avatar_image = conversation.conversation.interlocutor1.avatar_image
        conversationInfo.user_id = conversation.conversation.interlocutor1._id
      }

      conversationInfo.messages = conversation.messages

      const date = new Date(conversation.messages[conversation.messages.length - 1].createdAt)
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const dayAndMonth = date.getDate() + " " + months[date.getMonth()].slice(0,3)
      setLastMessage({
        text: conversation.messages[0].message,
        date: dayAndMonth,
      })

      setConversationData(conversationInfo)

      // if(position === 0) {
      //   handleSelectConversation(conversation)
      // }

    }, [userMessages, unreadConversations])

    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: "#ff2d55"
      },
    }));


    return (  
    <>   
    <Card className="conversation-card-box" onClick={() =>  { 
      console.log("Se ejecuta la función de seleccionar una conver y el id de la seleccionada es", conversation.conversation._id) 
      handleSelectConversation(conversation.conversation._id)
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%"}}>
        <CardContent className='card-content'>
            <div className='header-card-box'>
              <div className='conversation-user-info'>
                <img src={conversationData.avatar_image || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="Imagen de avatar de usuario que participa en la conversación" className='avatar-navbar-image'/>
                <Typography component="div" variant="h5">
                    {conversationData.username}
                </Typography>
              </div>
              <Typography className="alertDate-card-box" component="div" variant="h8">
                  {unreadConversations.includes(conversation) && 
                  <div className='message-alert'>
                    <AnnouncementIcon sx={{ color: 'white' }} />
                  </div>
                  }
                  {lastMessage.date}
              </Typography>
            </div>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {lastMessage.text}
          </Typography>
        </CardContent>
      </Box>
    </Card>
    <Divider />
    </> 
  )
}

