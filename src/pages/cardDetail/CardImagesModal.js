import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
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

export default function CardImagesModal({ cardImages }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if(cardImages.length === 2) {
        return (
            <div>
                <IconButton 
                style={{cursor:"pointer"}} 
                onClick={handleOpen}
                aria-haspopup="true"
                >
                <StyledBadge color="secondary">
                    <SearchIcon />
                </StyledBadge>
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div className='card-images-modal'>
                        <img className="card-images" src={cardImages[0]} alt="Primera imagen de la carta en venta" />
                        <img className="card-images" src={cardImages[1]} alt="Segunda imagen de la carta en venta" />
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
}