// import React from 'react'
import {Link} from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import './NavBar.css';
import {UserContext} from '../../Context/context'

// const NavBar = () => {

  
//   return (

//     <div className="nav">
//       <input type="checkbox" id="nav-check" />
//       <div className="nav-header">
//         <div className="nav-title">
//           YML WebGl
//         </div>
//       </div>
//       <div className="nav-btn">
//         <label htmlFor="nav-check">
//           <span />
//           <span />
//           <span />
//         </label>
//       </div>
//       <div className="nav-links">
//       {user && <Link to="/">Dashboard</Link>}
//       {user===null && <Link to="/signup">SignUp</Link>}
//       {user && <a href='#'>{user.displayName}</a>}
//       {user===null && <Link to="/signin">SignIn</Link>}
//       {user && <a href='#' onClick={handleClick}>Logout</a>}
//       {user && <Link to="/add">Add Project</Link>}
//       </div>
//     </div>
//   );
// }

// export default NavBar

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../../Assets/logo.png'


const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {user, setUser} = React.useContext(UserContext)


  
  let auth = getAuth()

  const handleClick = async ()=>{
      await auth.signOut()
      auth = getAuth()
      setUser(null)
  }

  let adminPage = []
  if(user && user.email==='dishu5570@gmail.com'){
    adminPage = ['Add Projects']
  }

  const pages = [...adminPage, 'Dashboard'];
  let settings  = []
  if(user){
    settings = [user.displayName];
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor:'#000', borderBottom: '1px solid #fff'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} style={{width: '100px', transform: 'scale(1.8)'}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
              <Link to="/"><Typography textAlign="center">Dashboard</Typography></Link>
                </MenuItem>
                {user.email==='dishu5570@gmail.com' && <MenuItem>
                <Link to="/add"><Typography textAlign="center">Add Project</Typography></Link>
                </MenuItem>}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={logo} style={{width: '100px', transform: 'scale(1.8)'}}/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to="/"><Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dashboard
              </Button></Link>
              {user.email==='dishu5570@gmail.com' &&  <Link to="/add"><Button
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Add Project
              </Button></Link>}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit">
              <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleClick}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
