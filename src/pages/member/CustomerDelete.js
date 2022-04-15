import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Typography,
    Grid,
    IconButton
  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomerDelete = (no) => {
    const [open, setOpen] = useState(false);
    var temp = new Date();
    var date = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes() + ':' + temp.getSeconds();
    const nDate = date;
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const memno = no.no;
    const deleteCustomer =(memno,e)=> {
        console.log(memno, e);
        const url = `http://localhost:8080/restapi/memberre/Active/`+memno;
        const formData = new FormData();
        formData.append("activeyn", 'N');
        formData.append("update", nDate);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };
        location.reload();
        return (axios.put(url, formData, config)
            .then(response => {
            console.log('response :', JSON.stringify(response, null, 2))
            }).catch(error => {
            console.log('failed', error)
            })
        )
    }
    return (
        <Grid>
            <IconButton variant="outlined" color="error" size="small" onClick={handleOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle onClose={handleClose}>
                    삭제 경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => {deleteCustomer(memno=memno)}}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )

}

export default CustomerDelete;