import {Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import userApis from '../../../Service/Apis';


const NewLoan=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
        loanid:"",
        purpose:"",
        status:"InProgress",
        inputstate:false,
        accinputstate:false
    });
    
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]: e.target.value});
    }
    const onApply=async(e)=>{
        await userApis(user);
        navigate("/");
    }
    const onCancelApply=()=>{
        navigate("/");
    }
    const {register,handleSubmit,formState:{errors}}=useForm({mode:"all"});
    return(
        <div><h3>Apply New Loan</h3>
        <form onSubmit={handleSubmit(onApply)}>
            <TextField 
            name="phno"
            fullWidth
            variant="standard"
            label="Applicant Contact Number" 
            placeholder="Contact number"
            margin="normal"
            {...register("phno",{required:"Phone number is required.", pattern:{value:/[0-9]{3}[0-9]{3}[0-9]{4}/,message:'Invalid phone number'},maxLength:{value:10,message:"Invalid. Only 10 digits are allowed."}})}
            error={Boolean(errors.phno)}
            helperText={errors.phno?.message}
            onChange={onInputChange}
            ></TextField>

            <TextField 
            name="purpose"
            fullWidth 
            variant="standard" 
            label="purpose of Loan" 
            placeholder="Purpose of loan"
            margin="normal" 
            {...register("purpose",{required:"Purpose of applying loan is required",
            maxLength:{value:100,message:"only 100 characters are allowed"},
            minLength:{value:5,message:"Minimum 5 characters are required"}
        })}
        error={Boolean(errors.purpose)}
        helperText={errors.purpose?.message}
        onChange={onInputChange}  ></TextField>

    <Box m={2} display="flex" justifyContent="space-between">
    <Button variant="contained" type="submit">Apply</Button>
    <Button variant="outlined" onClick={onCancelApply}>Cancel</Button>
</Box>
            
        </form>
        </div>
        
    )
}
export default NewLoan;