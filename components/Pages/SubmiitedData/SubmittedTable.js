import { Box, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow, Typography,Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {getUser,profileData} from '../../../Service/Apis';
import { useParams } from 'react-router-dom';
import './submiited.css';




function SubmittedTable() {
    useEffect(()=>{
        loadUserDetails();
    },[]);
    const loadUserDetails=async()=>{
        const response=await getUser(_id);
        setUser(response.data);
    }
    const {_id}=useParams();
  const {fname,lname,pmail,region,accfirm,accname,accphno,email,phno,purpose}=useParams();
    const [user,setUser]=useState({id:`${_id}`,
    fname:`${fname}`,
    lname:`${lname}`,
    pmail:`${pmail}`,
    region:`${region}`,
    accfirm:`${accfirm}`,
    accname:`${accname}`,
    accphno:`${accphno}`,
    email:`${email}`,
    phno:`${phno}`,
    purpose:`${purpose}`
  });
  
  return (
    <div> 
        <Typography variant='h4' align='center'>Submitted Details</Typography>
        <Grid Container xs={12} sm={12} md={12} lg={12} xl={12}>
            
            <Grid item>
            
            <table>
                <thead><Typography fontSize={20} fontWeight={400} color={"steelblue"} >Loan Details</Typography></thead>
                <tbody>
                    <Box m={2}display={'block'}>
                    <tr><th>Loan ID</th><td>{user._id}</td></tr>
                        <tr><th>Purpose of Loan</th><td>{user.purpose}</td></tr>
                    </Box>
                </tbody>
            </table>
            </Grid>
            
        </Grid>
        <hr></hr>
        <Grid container mt={3} justifyContent={'center'}>
            <Grid item xs={12} sm={6} border={1} borderColor={"InactiveCaptionText"}>
                <table>
                    <thead><Typography fontSize={20} fontWeight={400} color={"steelblue"} align='center'>Applicant Details</Typography></thead>
                    <tbody>
                        <Box mt={2} display={'block'} alignContent={'center'} >
                        <tr><th>First Name</th><td>{user.fname}</td></tr>
                        <tr><th>Last Name</th><td>{user.lname}</td></tr>
                        <tr><th>Mail ID</th><td>{user.pmail}</td></tr>
                        <tr><th>Phone Number</th><td>{user.phno}</td></tr>
                        <tr><th>Region</th><td>{user.region}</td></tr>
                        </Box>
                    </tbody>
                </table>
            </Grid>
            <Grid item xs={12}sm={6} border={1} borderColor={"InactiveCaptionText"} alignContent={"center"}>
            <table>
                    <thead><Typography fontSize={20} fontWeight={400} color={"steelblue"} align='center'>Accountant Details</Typography></thead>
                    <tbody>
                        <Box m={2}display={'block'} >
                        <tr><th>Accounting Firm</th><td>{user.accfirm}</td></tr>
                        <tr><th>Name</th><td>{user.accname}</td></tr>
                        <tr><th>Mail ID</th><td>{user.email}</td></tr>
                        <tr><th>Phone Number</th><td>{user.accphno}</td></tr>
                        </Box>
                    </tbody>
                </table>
            </Grid>
        </Grid>
    </div>
  )
}

export default SubmittedTable