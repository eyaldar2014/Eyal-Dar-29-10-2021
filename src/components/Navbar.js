import { connect } from 'react-redux'
import { changeDegreesToCelsius, changeDegreesToFahrenheit, changeThemeToLight, changeThemeToDark } from '../redux'

import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Icon, makeStyles } from "@material-ui/core";

import { ReactComponent as DegreesWhite } from "../fixtures/DegreesWhite.svg";
import { ReactComponent as DegreesBlack } from "../fixtures/DegreesBlack.svg";


function Navbar({ changeDegreesToCelsius, changeDegreesToFahrenheit, changeThemeToLight, changeThemeToDark, setup }) {


  const degreesAction = () => {
    if (setup.degrees.type === 'f') return changeDegreesToCelsius()
    else return changeDegreesToFahrenheit()
  }

  const themeAction = () => {
    if (setup.theme.type === 'light') return changeThemeToDark()
    else return changeThemeToLight()
  }


  const useStyles = makeStyles((theme) => ({
    navIconHide: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }));
  const classes = useStyles();


  return <>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: setup.theme.blue, color: setup.theme.textColor }}
      >
        <Toolbar>

          <Typography className={classes.navIconHide} variant="h6" component="div" sx={{ flexGrow: 1 }} >
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
            onClick={degreesAction}
          >
            <Icon>
              {setup.theme.type === 'light' ? < DegreesBlack /> : < DegreesWhite />}
            </Icon>
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={themeAction}
          >
            <DarkModeIcon />
          </IconButton> 
         
        </Toolbar>
      </AppBar>
    </Box>

  </>
}


const mapStateToProps = state => {
  return {
    setup: state.setup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeDegreesToCelsius: () => dispatch(changeDegreesToCelsius()),
    changeDegreesToFahrenheit: () => dispatch(changeDegreesToFahrenheit()),
    changeThemeToLight: () => dispatch(changeThemeToLight()),
    changeThemeToDark: () => dispatch(changeThemeToDark())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)