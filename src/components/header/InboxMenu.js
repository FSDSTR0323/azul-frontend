import React, { useState, useEffect, useContext } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';



export const InboxMenu = () => {
  const { userData, userMessages, setUnreadConversations, unreadCount, setUnreadCount } = useContext(UserContext)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  const fetchData = () => {
    
  }

  useEffect(() => {
    fetchData();
  }, [unreadCount, userMessages]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: "#ff2d55"
    },
  }));

  
  const handleClick = () => {
    navigate('/messages')
  };

  return (
    <>
      {window.localStorage.getItem("token") &&
        (
          <IconButton 
            style={{cursor:"pointer"}} 
            onClick={handleClick}
          >
            <StyledBadge badgeContent={unreadCount} color="secondary">
              <ChatIcon />
            </StyledBadge>
          </IconButton>
        ) 
      }
    </>
  )
}



