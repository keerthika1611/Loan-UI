import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import {Button, IconButton, Input, TextField} from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box } from '@mui/system';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUsers,profileData,deleteUser } from '../../../Service/Apis';
import { Grid, GridApi } from 'ag-grid-community';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//import SuccessMessage from '../ConfirmDialog/SuccessMessage';
import Notification from '../ConfirmDialog/Notification';
import './dashboard.css';

function DataTable() {
    const navigate=useNavigate();
    const {_id}=useParams();
    const [gridapi,setGridApi]=useState("");
    const [users, setUsers]=useState([]);
    
    const [confirmDialog,setConfirmDialog]=useState({isOpen:false});
    //const [successMessage,setSuccessMessage]=useState({isOpen:false});
    const [notify, setNotify]=useState({isOpen:false, message:"", type:""});
    
    const column=[
        {
            headerName:"Loan ID",
             field:"loanid",editable:false, cellRendererFramework:(users)=><Button onClick={()=>onLoanidClick(users.data._id)} disabled={users.data.inputstate}>{users.data._id}</Button>},
        {
        headerName:"Purpose of Loan", field:"purpose",editable:false,
        },
        {
            headerName:"Status", field:"status" ,editable:false, 
        },
        {
            headerName:"Options", field:"Options", editable:false, cellRendererFramework:(users)=><div>
              <Box sx={{display:{xs:'none',sm:'block'} }}>
              <Button onClick={()=>viewHandler(users.data._id)} disabled={!(users.data.inputstate)}>
              {users.data.inputstate?<VisibilityIcon color={'success'}></VisibilityIcon>:<VisibilityOffIcon color={"disabled"}></VisibilityOffIcon>}
              </Button>
              <Button onClick={()=>editHandler(users.data._id)} disabled={!(users.data.inputstate)}>
                <ModeEditIcon></ModeEditIcon>
              </Button>
              <Button onClick={()=>setConfirmDialog({
                isOpen:true,
                subTitle:"Are you sure to delete this record?",
                color:"error",
                onConfirm:()=>{deleteUserDetails(users.data._id);
                  setNotify({
                    isOpen:true,
                    message:'Deleted Successfully',
                    type:"error"
                  });
                ;}
              })}><DeleteForeverIcon color="error"></DeleteForeverIcon></Button>
              </Box>
              <Box display='flex'spacing={2} justifyContent={'space-between'} sx={{display:{xs:'block',sm:'none'}}}>
              {/* <button size='20px'  > */}
                <IconButton size='small'  onClick={()=>viewHandler(users.data._id)} disabled={!(users.data.inputstate)}>{users.data.inputstate?<VisibilityIcon fontSize='20' color='success'></VisibilityIcon>:<VisibilityOffIcon fontSize='20' color="disabled" disabled></VisibilityOffIcon>}</IconButton>
                <IconButton size='small' onClick={()=>editHandler(users.data._id)} disabled={!(users.data.inputstate)}>{users.data.inputstate?<ModeEditIcon fontSize="20" color='primary'></ModeEditIcon>:<ModeEditIcon fontSize='20' disabled></ModeEditIcon>}
              {/* /</button> */}
              {/* <button onClick={()=>setConfirmDialog({
                isOpen:true,
                title:"Are you sure to delete this record?",
                subTitle:"Deleted record could not be restored.",
                color:"error",
                onConfirm:()=>{deleteUserDetails(users.data._id);
                  setNotify({
                    isOpen:true,
                    message:'Deleted Successfully',
                    type:"error"
                  });
                // setSuccessMessage({
                //     isOpen:true,
                //     title:"Record Deleted Successfully",
                //     color:"error",
                //     onSuccess:async()=>{
                //       setSuccessMessage({isOpen:false});
          
                //     }
                //   })
                ;} */}
              {/* })}> */}</IconButton>
              
              <IconButton size='small' onClick={()=>setConfirmDialog({
                isOpen:true,
                subTitle:"Are you sure to delete this record?",
                color:"error",
                onConfirm:()=>{
                  deleteUserDetails(users.data._id);
                  setNotify({
                    isOpen:true,
                    message:'Deleted Successfully',
                    type:"error"
                  });}
              })}>
              <DeleteForeverIcon color="error" fontSize='20' 
                  ></DeleteForeverIcon></IconButton>
              </Box></div>
        }
]
const gridHandler=(users)=>{
  console.log("grid is ready");
  setGridApi(users.api);
  //users.api.sizeColumnsToFit(); 
};


const onNewapplication=()=>{
    console.log("clicked");
    navigate('/newloan');
};

const onLoanidClick=(_id)=>{
  navigate (`/profile/${_id}`)
}
const viewHandler=(_id)=>{
  navigate(`/submitted/${_id}`)
}
const editHandler=(_id)=>{
  navigate(`/edituser/${_id}`)
}

const deleteUserDetails=async(_id)=>{
  setConfirmDialog({isOpen:false});
  await deleteUser(_id);
  getAllUsers();
}
useEffect(()=>{
  getAllUsers();
},[]);

const getAllUsers=async()=>{
  let response=await getUsers();
  console.log(response.data);
  setUsers(response.data);
};

const onFilterChange=(e)=>{
  gridapi.setQuickFilter(e.target.value);
}

  return (
    <div className='ag-theme-alpine'
    id='myGrid'
    style={{
        height:'400px'
    }}>
        <Box m={2} display="flex" justifyContent="space-between" marginBottom={2}>
        <Button  variant="outlined" sx={{display:{xs:'block',sm:'none'}}}size='small' onClick={onNewapplication}><strong>+</strong></Button>
        <Button variant="outlined" sx={{display:{xs:'none',sm:'block'}}}size='small' onClick={onNewapplication}>New Loan</Button>
        <TextField type="search" sx={{display:{xs:'none',sm:'block'}}} size='small' placeholder="search..." label="Search" onChange={onFilterChange}></TextField>
        <TextField type="search" sx={{display:{xs:'block',sm:'none'}}} size='small' placeholder="search"label="Search" onChange={onFilterChange}></TextField>
        </Box>
        <AgGridReact 

        columnDefs={column}
        rowData={users}
        onGridReady={gridHandler}
        defaultColDef={{flex:1,editable:true,}}
        pagination={true}
        
        paginationPageSize={7}></AgGridReact>
        <ConfirmDialog 
        seccolor={"black"}
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        ></ConfirmDialog>
        {/* <SuccessMessage successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}></SuccessMessage> */}
      <Notification 
      notify={notify}
      setNotify={setNotify}
      ></Notification>
    </div>
  )
}

export default DataTable;
