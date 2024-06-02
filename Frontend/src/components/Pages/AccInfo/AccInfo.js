import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import {useForm} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, profileData } from '../../../Service/Apis';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import SuccessMessage from '../ConfirmDialog/SuccessMessage';
import Notification from '../ConfirmDialog/Notification';

function AccInfo(props) {
  const {register, handleSubmit, formState:{errors}}=useForm({mode:'all'})
  const navigate=useNavigate();
  
  const [confirmDialog,setConfirmDialog]=useState({isOpen:false});
  const [successMessage,setSuccessMessage]=useState({isOpen:false});
  const [notify, setNotify]=useState({isOpen:false, message:"", type:""});

  const {_id}=useParams();

  const [user,setUser]=useState({
   accfirm:"",
    accname:"",
    accphno:"",
    email:"",
    status:"Submitted"
  });

  const inputChangeHandler=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    loadUserDetails();
  },[]);

  const loadUserDetails=async()=>{
    const response=await getUser(_id);
    setUser(response.data);
  }


  // const onSubmit=async()=>{
  //   await profileData(user,_id);
  //   navigate('/');
  // }
  console.log(errors);
  return (
    <div>
      <h2>Accountant Information</h2>
      <form onSubmit={handleSubmit(()=>setConfirmDialog({
        isOpen:true,
        subTitle:"Are you sure to submit this data?",
        color:"success",
        onConfirm:async()=>{
          await profileData(user,_id);
          setConfirmDialog({isOpen:false,
            OnSuccess:(setSuccessMessage({
              isOpen:true,
              title:"Data Submitted Successfully",
              color:"success",
              onsuccess:()=>{
                setSuccessMessage({isOpen:false});
                navigate('/');
            }
              
          }))}
      );
      
}}))}>
        <TextField 
        fullWidth
         id='accfirm'
        label="Accounting Firm"
        name="accfirm"
        value={user.accfirm}
        variant="standard"
        margin='normal'
        inputProps={{readOnly:user.inputstate}}
        {...register("accfirm",{required:"Accounting firm is required.",maxLength:{value:50,message:"only 50 characters are allowed"}})}
        error={Boolean(errors.accfirm)}
        helperText={errors.accfirm?.message}
        onChange={inputChangeHandler}
        ></TextField>
        
        <TextField 
        fullWidth
         id='accname'
        label="Accountant Name"
        name="accname"
        value={user.accname}
        variant="standard"
        margin='normal'
        inputProps={{readOnly:user.inputstate}}
        {...register("accname",{required:"Accountant name is required.",
        maxLength:{value:50,message:"only 50 characters are allowed"}})}
        error={Boolean(errors.accname)}
        helperText={errors.accname?.message}
        onChange={inputChangeHandler}
        ></TextField>
        
        <TextField 
        fullWidth
         id='accphno'
        label="Accountant Phone Number"
        name="accphno"
        value={user.accphno}
        variant="standard"
        margin='normal'
        type="tel"
        inputProps={{readOnly:user.inputstate}}
        {...register("accphno",{required:"phone number is required.", 
        pattern:{value:/[0-9]{3}[0-9]{3}[0-9]{4}/,message:'Invalid phone number'},maxLength:{value:10,message:'Only 10 digits are allowed'}})}
        error={Boolean(errors.accphno)}
        helperText={errors.accphno?.message}
        onChange={inputChangeHandler}
        ></TextField>
        
        <TextField 
        fullWidth
        id='email'
        label="email Address"
        name='email'
        value={user.email}
        variant="standard"
        margin='normal'
        inputProps={{readOnly:user.inputstate}}
        {...register("email",{required:"Accountant email is required.",
         pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,message:"Please enter valid email Id"}})}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        onChange={inputChangeHandler}
        ></TextField>
        
        <Box m={2}
        display="flex"
        justifyContent="space-between">
          <Button size="medium" variant="outlined" onClick={()=>setUser({...user, status:"Submitted",
            inputstate:true, submitState:true
          })
        }>
            <Button onClick={()=>setNotify({
              isOpen:true,
              message:"saved successfully",
              type:'success'
            })}>Save</Button></Button>
          <Button size="medium" type="submit" variant="contained">Submit</Button></Box>
      </form>
      <ConfirmDialog confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}></ConfirmDialog>
      <SuccessMessage successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}></SuccessMessage>
      <Notification 
      notify={notify}
      setNotify={setNotify}
      ></Notification>
    </div>
  )
}

export default AccInfo