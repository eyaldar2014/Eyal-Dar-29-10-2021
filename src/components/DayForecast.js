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


      <Card sx={{ maxWidth: 345 }}>
        {!data ? null : <>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.dayOfTheWeek}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              temprature will bebetween {data.Temperature.Minimum.Value} to {data.Temperature.Maximum.Value} F degrees
            </Typography>
            <Typography variant="body2" color="text.secondary">
              day gonna be {day.Day.IconPhrase}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              night gonna be {day.Night.IconPhrase}
            </Typography>
          </CardContent>
        </>}
      </Card>


</>
}

export default DayForecast;
// const dailyForecasts =
//   {
//       "Date": "2021-11-03T07:00:00+02:00",

//       "Temperature": {
//           "Minimum": {
//               "Value": 67,
//               "Unit": "F",
//               "UnitType": 18
//           },
//           "Maximum": {
//               "Value": 80,
//               "Unit": "F",
//               "UnitType": 18
//           }
//       },
//       "Day": {
//           "Icon": 2,
//           "IconPhrase": "Mostly sunny",
//           "HasPrecipitation": false
//       },
//       "Night": {
//           "Icon": 34,
//           "IconPhrase": "Mostly clear",
//           "HasPrecipitation": false
//       }
//   }