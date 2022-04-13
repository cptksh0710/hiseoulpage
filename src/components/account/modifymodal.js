import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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


export default function ModifyModal() {
    var temp = new Date();
    var date = temp.getFullYear() + '-' + (temp.getMonth()+1) + '-' + temp.getDate() +' '+ temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
    const nDate = date;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const accountInput = () => {
        console.log(formik.values.pass)
        console.log(formik.values.name)
        const url = 'http://localhost:8080/restapi/memberre/Account/1';
        const formData = new FormData();
        formData.append("pass", formik.values.pass);
        formData.append("name", formik.values.name);
        formData.append("update", nDate);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        return (axios.post(url, formData, config)
            .then(response => {
                console.log('response :', JSON.stringify(response, null, 2))
            }).catch(error => {
                console.log('failed', error)
            }))
    }



    const formik = useFormik({
        initialValues: {
            name: '',
            pass: '',
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required(
                    'Last name is required'),
            pass: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: () => {
            router.push('/login');
        }
    });
    return (
        <div>
            <Button
                onClick={handleOpen}
                variant='outlined'
                startIcon={<SendIcon />}
            >
                수정
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ ...style }}>
                    <h2>수정하시겠습니까?</h2>
                    <NextLink href="/">
                        <Button
                            variant='contained'
                            onClick={accountInput}
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