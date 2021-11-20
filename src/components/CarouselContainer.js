import react from 'react';

import Carousel from 'react-material-ui-carousel'

import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import DayForecast from './DayForecast';


function CarouselContainer({ days }) {

  const [mq, setMq] = react.useState()
  const theme = useTheme();
  const matches = {
    1: useMediaQuery(theme.breakpoints.up('sm')),
    2: useMediaQuery(theme.breakpoints.up('md')),
    3: useMediaQuery(theme.breakpoints.up('lg'))
  }

  // render on mq change !
  react.useEffect(() => {

    let counter = 0
    for (let key in matches) if (matches[key]) counter = parseInt(key)
    if (mq !== null) setMq(counter)

  }, [matches])


  const createArrayOfDaysForCarousel = () => {

    if (mq === 0) {
      return days.map((day, i) => {
        return <Stack
          direction="row"
          key={i}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <DayForecast day={day} />
        </Stack>
      })
    }

    // if (mq > 0 && mq < 3) 
    else {

      let arrayOfDays = []
      for (let i = 0; i < days.length - mq; i = i + mq) {

        let daysPerStack
        let n = 0
        while (mq + 1 > n) {
          daysPerStack = <> {daysPerStack} <DayForecast day={days[i + n]} /> </>
          n++
        }

        arrayOfDays.push(daysPerStack)
      }

      const finalArrayForCarousel = arrayOfDays.map((stackPerDay, i) => {
        return <Stack
          direction="row"
          key={i}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {arrayOfDays[i]}
        </Stack>
      })

      return finalArrayForCarousel
    }
  }


  return <>

    {!days
      ? null
      : mq === 3
        ? <Stack
          direction="row"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {
            days.map((d, i) => {
              return <DayForecast key={i} day={d} />
            })
          }
        </Stack>
        : <Carousel autoPlay={false} navButtonsAlwaysVisible={true} animation={'fade'} >
          {createArrayOfDaysForCarousel()}
        </Carousel>
    }
       
  </>
}


export default CarouselContainer;

