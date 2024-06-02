import React from "react";
import {Dialog,DialogActions,DialogTitle,DialogContent,Typography,Button, Box} from "@mui/material";

export default function ConfirmDialog(props){
    const {color,title,subTitle,confirmDialog,setConfirmDialog}=props;

    return(
        <Dialog open={confirmDialog.isOpen}>
            <Box border={3} borderColor={"ActiveBorder"} justifyContent={"center"}>
            <DialogTitle>
                <Typography variant="h6">{confirmDialog.subTitle}</Typography>
            </DialogTitle>
            <DialogContent>
            <Box display='flex' justifyContent={"center"}>
            <DialogActions>
                <Button variant="contained" size="small" color={confirmDialog.color} onClick={confirmDialog.onConfirm}>
                    Yes
                </Button>
                <Button variant="outlined" size="small" color={"inherit"} onClick={()=>setConfirmDialog({isOpen:false})}>
                    No
                </Button> 
            </DialogActions></Box>
            </DialogContent>
            
            </Box>
            
        </Dialog>
    )
}