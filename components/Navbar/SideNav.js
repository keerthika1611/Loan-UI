import React from 'react';
import Drawer from '@mui/material/Drawer';

function SideNav(props) {
  return (
    <> <Drawer
    container={props.container}
    variant="temporary"
    open={props.mobileOpen}
    onClose={props.handleDrawerToggle}
    ModalProps={{
      keepMounted: true, // Better open performance on mobile.
    }}
    sx={{
      display: { xs: 'block', sm:"block",md:'block',lg:'none' },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth, height:"320px", backgroundColor:"ButtonShadow" },
    }}
  >
    {props.drawer}
  </Drawer>
  <Drawer
    variant="permanent"
    sx={{
      display: { xs: 'none', sm: 'none',md:"none",lg:"block" },
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth, backgroundColor:"ButtonShadow" },
    }}
    open
  >
    {props.drawer}
  </Drawer></>
  )
}

export default SideNav