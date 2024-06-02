import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Error_page() {
  return (
    <div><h1>Page Not Found</h1>
    <NavLink to={"/"}><Button variant="contained">Go Back</Button></NavLink></div>
  )
}

export default Error_page