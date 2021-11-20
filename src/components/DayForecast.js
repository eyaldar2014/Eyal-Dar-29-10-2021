import react from 'react';
import { connect } from 'react-redux'

import weekDays from '../fixtures/weekDays'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";


function DayForecast({ day, setup }) {

  const [data, setData] = react.useState()

  react.useEffect(() => {

    let temp = { ...day }
    const date = new Date(day.date);
    temp.dayOfTheWeek = weekDays[date.getDay()]

    setData(temp)
  }, [])


  const useStyles = makeStyles({
    card: {
      backgroundColor: setup.theme.backgroundColor,
      color: setup.theme.textColor
    }
  });
  const classes = useStyles();


  return <>

    {/* , backgroundColor: setup.theme.backgroundColor, color: setup.theme.textColor */}
    <Card sx={{ width: 160, m: 1 }}
    className={classes.card}
    >
      {!data ? null : <>
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
            {data.dayOfTheWeek}
          </Typography>
          <Typography variant="body3" >
            Temprature :
          </Typography>
          <Typography variant="body2" >
            {data[setup.degrees.type].min} - {data[setup.degrees.type].max} {setup.degrees.symbol}
          </Typography>

          <br />

          <Typography variant="body3" >
            Day :
          </Typography>
          <Typography variant="body2" >
            {data.day}
          </Typography>

          <br />

          <Typography variant="body3" >
            Night :
          </Typography>
          <Typography variant="body2" >
            {data.night}
          </Typography>

        </CardContent>
      </>}
    </Card>

  </>
}


const mapStateToProps = state => {
  return {
    setup: state.setup
  }
}

export default connect(
  mapStateToProps,
  null
)(DayForecast)