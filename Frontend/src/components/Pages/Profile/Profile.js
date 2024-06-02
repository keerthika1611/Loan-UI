import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React,{useState,useEffect} from 'react';
import './Profile.css';
import { useForm } from 'react-hook-form';
import {useNavigate,useParams} from 'react-router-dom';
import {getUser,profileData} from '../../../Service/Apis';

function Profile() {
  const {register,handleSubmit,formState:{errors}}=useForm({mode:'all'});
  const navigate=useNavigate();
  const {_id}=useParams();

  const [user,setUser]=useState({
    fname:"",
    lname:"",
    pmail:"",
    region:""
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

  
  
 const onSubmit=async(e)=>{
  await profileData(user,_id);
  console.log(user);
  navigate(`/accinfo/${_id}`);
 }
const onCancelProfile=()=>{
  navigate('/');
}
  return (
    <div><h2>My Profile</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField 
    variant='standard' 
    fullWidth 
    margin="normal"
    label="FirstName"
    name="fname"
    value={user.fname} 
    type='text' 
    id='firstname' 
    inputProps={{readOnly:user.inputstate}}
    {...register("fname",{required:"FirstName is required.",
  minLength:{value:5, message:"Minimum 5 characters are required"},
  maxLength:{value:50, message:"only 50 characters are allowed"}})}
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
    inputProps={{readOnly:user.inputstate}}
    type='text' 
    id='lastname' 
    {...register("lname",{required:"LastName is required.",
    minLength:{value:5, message:"Minimum 5 characters are required"},
    maxLength:{value:50, message:"only 50 characters are allowed"}})}
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
    inputProps={{readOnly:user.inputstate}}
    id='e-mail' 
    {...register("pmail",{required:"email Id is required.",
  pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,message:"Please enter valid email Id"}})}
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
    inputProps={{readOnly:user.inputstate}}
    {...register("region",{required:"region is required."})}
        error={Boolean(errors.region)}
        helperText={errors.region?.message}
    onChange={inputChangeHandler}
    >
      
      <MenuItem value="select "><em>Select</em></MenuItem>
      <MenuItem value="coimbatore">Coimbatore</MenuItem>
      <MenuItem value="chennai">Chennai</MenuItem>
      <MenuItem value="madurai">Madurai</MenuItem>
      <MenuItem value="salem">Salem</MenuItem>

      
    </Select></Box>
    <Box m={2}
    padding={4}
    display='flex'
    justifyContent='space-between'>
      <Button size='medium' variant="contained"  className="cancelbutton" color="inherit" onClick={onCancelProfile}>Cancel</Button>
    <Button size='medium' variant="contained" type='submit' >Save and Proceed</Button>
    </Box>
   </form> 
    </div>
  )
}

export default Profile