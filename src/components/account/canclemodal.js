import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import NextLink from 'next/link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 4,
};


export default function CancleModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };

    return (
    <div>
        <Button
        onClick={handleOpen}
        variant='outlined'
        startIcon={<DeleteIcon/>}
        >
        취소
        </Button>
        <Modal
        open={open}
        onClose={handleClose}
        >
        <Box sx={{ ...style}}>
            <h2>취소하시겠습니까?</h2>
            <NextLink href="/">
                <Button
                variant='contained'
                >
                yes  
                </Button>
            </NextLink>
            <Button
            variant='outlined'
            onClick={handleClose}
            >
            no
            </Button>
        </Box>
        </Modal>
    </div>
    );
}; 