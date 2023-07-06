import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';
import { authorizationConfig } from '../../security';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: "#ff2d55"
    },
}));

export default function MessageModal({ receiverUsername, receiverId }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //TODO: función onclick botón llamando al endpoint de crear message
    const handleSendMessage = async () => {
        try {
            const message = document.getElementById("text-area").value
            await axios.post('http://localhost:5000/sendmessage', {receiver: receiverId, message}, authorizationConfig.getHeaders())
            handleClose()
            toast.success(`Mensaje enviado a ${receiverUsername}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch(error) {
            console.log("Error al enviar un mensaje", error)
        }
    }

    return (
    <div>
        <IconButton 
        style={{cursor:"pointer"}} 
        onClick={handleOpen}
        // aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        >
        <StyledBadge color="secondary">
            <MailOutlineIcon />
        </StyledBadge>
        </IconButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Enviar mensaje a :  {receiverUsername}
            </Typography>
            <TextareaAutosize  id="text-area" className="text-area" aria-label="minimum height" minRows={3} placeholder="Escribe el mensaje..."/>
            <div className='button-box-message-modal'>
                <button className="modal-send-message-button" onClick={handleSendMessage}>
                    Enviar
                </button>
            </div>
            </Box>
        </Modal>
    </div>
  );
}