import React from 'react';

import { Link } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';



function Navbar(props) {
  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
          <Link to="/" className="navItem">main</Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => console.log('if needs  - redirect to self route')}>
          <Link to="/favorites" className="navItem">favorites</Link>
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DarkModeIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>

  </>
}

export default Navbar;