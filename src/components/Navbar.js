import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';



function Navbar() {


  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            Weather App
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
              Main
            </Link>
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            <Link to="favorites" style={{ textDecoration: "none", color: "inherit" }} >
              Favorites
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

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