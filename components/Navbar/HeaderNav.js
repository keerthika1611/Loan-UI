import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Avatar } from '@mui/material';

const HeaderNav = (props) => {
  return (
    <Box>
    <Toolbar>
    <IconButton
      color="black"
      aria-label="open drawer"
      edge="start"
      onClick={props.handleDrawerToggle}
      sx={{ mr: 2, display: { lg: 'none' } }}
    >
      <MenuIcon />
    </IconButton>
    <Avatar sx={{bgcolor:"#0b0b86"}} variant="rounded"><Typography fontSize={30} fontWeight={600}>L</Typography></Avatar>
    <Typography variant="h5" noWrap component="div" color="black" marginLeft={2} fontWeight={600}>
    Loan_UI
    </Typography>
  </Toolbar>
  </Box>
  )
}
export default HeaderNav;