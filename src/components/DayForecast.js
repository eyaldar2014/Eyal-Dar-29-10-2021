import react from 'react';
import weekDays from '../fixtures/weekDays'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function DayForecast({ day }) {

  const [data, setData] = react.useState()

  react.useEffect(() => {

    let temp = { ...day }
    const date = new Date(day.Date);
    temp.dayOfTheWeek = weekDays[date.getDay()]

    setData(temp)
  }, [])


  return <>

    <Card sx={{ width: 160, m: 1 }}>
      {!data ? null : <>
        <CardContent>

          <Typography gutterBottom variant="h5" component="div">
            {data.dayOfTheWeek}
          </Typography>
          <Typography variant="body3" color="text.secondary" >
            Temprature :
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.Temperature.Minimum.Value} - {data.Temperature.Maximum.Value} FFF
          </Typography>

        <br/>

        <Typography variant="body3" color="text.secondary">
          Day :
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {day.Day.IconPhrase}
        </Typography>

        <br/>

        <Typography variant="body3" color="text.secondary">
          Night :
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {day.Night.IconPhrase}
        </Typography>

      </CardContent>
      </>}
  </Card>

  </>
}


export default DayForecast;