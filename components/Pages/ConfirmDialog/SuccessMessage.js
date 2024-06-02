import React from "react";
import {Dialog,DialogActions,DialogTitle,DialogContent,Typography,Button, Avatar, Box} from "@mui/material";
import './dialog.css';
export default function SuccessMessage(props){
    const {color,title,subTitle,successMessage,setSuccessMessage,success}=props;
    return(
        <Dialog  className="Dialog_s" open={successMessage.isOpen}>
            <Box border={3} borderColor={"green"}>
            <DialogTitle>
            <Typography variant="h5">{successMessage.title}</Typography>
            </DialogTitle><DialogContent>
            <Box display='flex' justifyContent={"center"}><DialogActions>
                <Button  variant="contained" size="medium" color={successMessage.color}
                onClick={successMessage.onsuccess}>
                  OK
                </Button>
            </DialogActions></Box>
            </DialogContent>
            
            </Box>
        </Dialog>
    )
}