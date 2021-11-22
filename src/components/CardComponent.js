import { Link } from "react-router-dom";

import { connect } from 'react-redux'


import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';


function CardComponent({ data, btnName, btnFunc, link, linkFunc, setup }) {

  const useStyles = makeStyles({
    card: {
      backgroundColor: setup.theme.backgroundColor,
      color: setup.theme.textColor,
    },
    cardAction: {
      backgroundColor: setup.theme.backgroundColor,
      color: setup.theme.textColor,
      "&:hover": {
        opacity: '0.9'
      }
    },
    button: {
      color: setup.theme.textColor,
      background: setup.theme.blue,
      "&:hover": {
        backgroundColor: 'red'
      }
    }
  });
  const classes = useStyles();


  return <>

    <Card
      sx={{ width: 160, m: 1 }}

      className={
        !link && !linkFunc
          ? classes.card
          : classes.cardAction
      }
    >
      <Stack
        direction="column"
        sx={{ p: 1 }}
        justifyContent="space-between"
      >

        <Link to={link !== undefined ? link : '#'} onClick={linkFunc !== undefined ? linkFunc : null} style={{ textDecoration: "none" }}>

          {!data
            ? null
            : <>

              <CardContent>

                {!data.title
                  ? null
                  : <>
                    <Typography variant="h6" sx={{ color: setup.theme.textColor, height: 70 }} >
                      {data.title}
                    </Typography>
                  </>
                }

                {!data.body
                  ? null
                  : data.body.map((typo, i) => {
                    return <Stack key={i} direction="column"  >

                      <Typography variant="body3" sx={{ color: setup.theme.textColor }} >
                        {typo.name}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 1, color: setup.theme.textColor }} >
                        {typo.value}
                      </Typography >
                    </Stack>
                  })
                }

              </CardContent>
            </>
          }

        </Link>

        {
        !btnFunc || !btnName
          ? null
          : <>
            <Button
              variant="contained"
              onClick={btnFunc}
              className={classes.button}
            >
              {btnName}
            </Button>
          </>
        }

      </Stack>
    </Card>

  </>
}


const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    setup: state.setup
  }
}

export default connect(
  mapStateToProps,
  null
)(CardComponent)