import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {useNavigate,useParams} from 'react-router-dom';
import {getUser,profileData} from '../../../Service/Apis';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import SuccessMessage from '../ConfirmDialog/SuccessMessage';
import Notification from '../ConfirmDialog/Notification';

function EditUser() {
  useEffect(()=>{
      loadUserDetails();
  },[]);
  const loadUserDetails=async()=>{
      const response=await getUser(_id);
      setUser(response.data);
  }
  const [confirmDialog,setConfirmDialog]=useState({isOpen:false});
  const [successMessage,setSuccessMessage]=useState({isOpen:false});
  const [notify, setNotify]=useState({isOpen:false, message:"", type:""});
  const {fname,lname,pmail,region,accfirm,accname,accphno,email,phno}=useParams();
  
  const [user,setUser]=useState({id:"",
    fname:`${fname}`,
    lname:`${lname}`,
    pmail:`${pmail}`,
    region:`${region}`,
    accfirm:`${accfirm}`,
    accname:`${accname}`,
    accphno:`${accphno}`,
    email:`${email}`,
    phno:`${phno}`
  });

  const navigate=useNavigate();
  const {_id}=useParams();

  const {register,handleSubmit,formState:{errors}}=useForm({mode:'all'});
  const inputChangeHandler=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }
  
  
//  const onSubmit=async(e)=>{
//   await profileData(user,_id);
//   console.log(user);
//   navigate(`/accinfo/${_id}`);
//  }
 
  return (
    <div>
        <h2>Edit Loan Details</h2>
    <form onSubmit={handleSubmit(()=>setConfirmDialog({
        isOpen:true,
        title:"Update",
        subTitle:"Are you sure to update this record?",
        color:"success",
        onConfirm:async()=>{
            await profileData(user,_id);
            setConfirmDialog({
              isOpen:false,
              OnSuccess:(setSuccessMessage({
                isOpen:true,
                title:"Data Updated Successfully",
                color:"success",
                onsuccess:()=>{
                  setSuccessMessage({isOpen:false});
                  navigate('/');
              }
                
            }))
            
          
          
            }); 
            
            
            // setNotify({
            //   isOpen:true,
            //   message:'Updated Successfully',
            //   type:"success"
            // });
            
          }
            
    }
    
    )
    
    )}>
    <div>
    <TextField 
    variant='standard' 
    fullWidth 
    margin="normal"
    label="LoanId"
    name="id"
    value={user._id}  
    InputLabelProps={{shrink:true}}
    inputProps={{readOnly:true}}
   ></TextField>

    <TextField 
    variant='standard' 
    fullWidth 
    margin="normal"
    label="Applicant Mobile Number"
    name="phno"
    value={user.phno} 
    InputLabelProps={{shrink:true}}
    inputProps={{readOnly:true}}
   ></TextField>
    </div>
    
    <div><h3>Profile Information</h3>
    
    <TextField 
    variant='standard' 
    fullWidth 
    margin="normal"
    label="FirstName"
    name="fname"
    value={user.fname} 
    type='text' 
    id='firstname' 
    InputLabelProps={{shrink:true}}
    {...register("fname",{required:"FirstName is required.",maxLength:{value:50,message:"Only 50 characters are allowed"}})}
    error={Boolean(errors.fname)}
    helperText={errors.fname?.message}
    onChange={inputChangeHandler}></TextField>
    
    <TextField 
    variant='standard' 
    fullWidth 
    margin="normal"
    label="LastName"
    name="lname"
    value={user.lname} 
    type='text' 
    id='lastname' 
    InputLabelProps={{shrink:true}}
    {...register("lname",{required:"LastName is required.",maxLength:{value:50,message:"Only 50 characters are allowed"}})}
        error={Boolean(errors.lname)}
        helperText={errors.lname?.message}
    onChange={inputChangeHandler}></TextField>
    
    <TextField 
    variant='standard' 
    fullWidth 
    margin="normal"
    label="email Address"
    name="pmail"
    value={user.pmail} 
    type='email' 
    id='e-mail' 
    InputLabelProps={{shrink:true}}
    {...register("pmail",{required:"email Id is required.",maxLength:{value:100,message:"Only 100 characters are allowed"}})}
        error={Boolean(errors.pmail)}
        helperText={errors.pmail?.message}
    onChange={inputChangeHandler}></TextField>

   <Box mt={2}>
    <InputLabel id='region-select'>Region</InputLabel>
    <Select 
    name="region"
    labelId='region-select'
    type='text'
    defaultValue="select"
    value={user.region}
    label="Region"
    fullWidth
    variant="standard"
    
    {...register("region",{required:"region is required."})}
        error={Boolean(errors.region)}
        helperText={errors.region?.message}
    onChange={inputChangeHandler}
    >
      
      <MenuItem value="Select"><em>Select</em></MenuItem>
      <MenuItem value="coimbatore">Coimbatore</MenuItem>
      <MenuItem value="chennai">Chennai</MenuItem>
      <MenuItem value="madurai">Madurai</MenuItem>
      <MenuItem value="salem">Salem</MenuItem>
    </Select></Box>
    </div>
    <div>
        <h3>Accountant Information</h3>
        <TextField 
        fullWidth
         id='accfirm'
        label="Accounting Firm"
        name="accfirm"
        value={user.accfirm}
        variant="standard"
        margin='normal'
        InputLabelProps={{shrink:true}}
        {...register("accfirm",{required:"Accounting firm is required.",
        maxLength:{value:50,message:"only 50 characters are allowed"}})}
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
        InputLabelProps={{shrink:true}}
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
        InputLabelProps={{shrink:true}}
        {...register("accphno",{required:"phone number is required."})}
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
        type='email'
        InputLabelProps={{shrink:true}}
    {...register("email",{required:"Accountant email is required.",
    maxLength:{value:50,message:"only 100 characters are allowed"}})}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        onChange={inputChangeHandler}
        ></TextField>
        
    </div>
    <Box m={2}
        display="flex"
        justifyContent="center"
        alignItems="center">
          <Button size="medium" type="submit" variant="contained">Update</Button></Box>
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

export default EditUser;