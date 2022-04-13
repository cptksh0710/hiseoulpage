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

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
        <Button 
        onClick={handleOpen}
        variant="contained"
        >
        yes
        </Button>
        <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
        >
        <Box sx={{ ...style}}>
            <h2>탈퇴가 완료되었습니다.</h2>
            <NextLink
            href="/login"
            >
                <Button 
                onClick={handleClose}
                variant="outlined"
                >
                확인
                </Button>
            </NextLink>
        </Box>
        </Modal>
    </React.Fragment>
    );
}   

export default function WithdrawModal() {
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
        variant="contained"
        startIcon={<DeleteIcon/>}
        color="error"
        >
        탈퇴
        </Button>
        <Modal
        open={open}
        onClose={handleClose}
        >
        <Box sx={{ ...style}}>
            <h2>탈퇴하시겠습니까?</h2>
            <p>
            'yes'버튼을 누르시면 탈퇴가 완료됩니다.
            </p>
            <ChildModal />
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
}