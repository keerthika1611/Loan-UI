import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import HeaderNav from '../Navbar/HeaderNav';
import SideNav from '../Navbar/SideNav';
import { Link, Outlet,useLocation,useParams } from 'react-router-dom';
import styled  from '@emotion/styled';
import './maincontent.css';

const drawerWidth = 240;
const Header=styled(AppBar)`
background:#ffffff;`


export default function MainContent(props) {
  const location=useLocation();
  const path=location.pathname;

  const { window } = props;
  const [mobileOpen, setMobileOpen] =React.useState(false);

const {_id}=useParams();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const Menuitems=[
  {title:'Dashboard',path:'/'},
  {title:'New Loan', path:'/newloan'}, 
  {title:'Profile', path:`/profile/${_id}`},
  {title:'Account Information',path:`/accinfo/${_id}`},
  {title:'Edit User Details', path:`/edituser/${_id}`},
  {title:'Proccessed Details', path:`/submitted/${_id}`}
  
]
  const drawer = (
    <div>
      <Toolbar />
      <nav>
        {Menuitems.map((item, index) => (
          <ListItem key={item.title} disablePadding
          component={Link}
          to={item.path}
          button
          selected={item.path===path}
          className='ListItem'>
            <ListItemButton className='ListItemButton'>
              <ListItemText primary={item.title} className='ListItemText' />
            </ListItemButton>
          </ListItem>
        ))}
      </nav>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header
        position="fixed"
        sx={{
          zIndex:(theme)=>theme.zIndex.drawer+1
        }}
      >
       <HeaderNav handleDrawerToggle={handleDrawerToggle}></HeaderNav>
      </Header>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <SideNav container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawer={drawer} drawerWidth={drawerWidth}></SideNav>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}
