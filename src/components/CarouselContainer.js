import react from 'react';

import { connect } from 'react-redux'

import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel'
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import CardComponent from './CardComponent'

function CarouselContainer({ fiveDaysWeatherForecast, setup }) {

  // mq stands for media-query
  const [mq, setMq] = react.useState(0)
  const theme = useTheme();

  const matches = {
    1: useMediaQuery(theme.breakpoints.up('sm')),
    2: useMediaQuery(theme.breakpoints.up('md')),
    3: useMediaQuery(theme.breakpoints.up('lg'))
  }

  // to do later :
  // "Warning: Can't perform a React state update on an unmounted component" :
  // warning is shown if responsiveness changes too quickly (twice or more). at 'Carousel' component.
  // can solve using setTimeout for setMq 
  react.useEffect(() => {

    let counter = 0
    for (let key in matches) if (matches[key]) counter = parseInt(key)
    setMq(counter)

  }, [matches, fiveDaysWeatherForecast])


  const createArrayOfSingleDay = () => {
    return fiveDaysWeatherForecast.fiveDaysWeatherForecast.map((d, i) => {
      return <Box
        key={i}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <CardComponent
          data={{
            title: d.dayOfTheWeek,
            body: [
              {
                name: 'Temprature',
                value: d[setup.degrees.type].min + ' - ' + d[setup.degrees.type].max + ' ' + setup.degrees.symbol
              },
              {
                name: 'Day',
                value: d.day
              },
              {
                name: 'Night',
                value: d.night
              },
            ]
          }}

        />

      </Box>
    })
  }

  const createArrayOfFewDays = () => {

    if (mq === 0) return createArrayOfSingleDay()

    // if (mq > 0 && mq < 3) 
    else {

      let arrayOfDays = []
      for (let i = 0; i < fiveDaysWeatherForecast.fiveDaysWeatherForecast.length - mq; i = i + mq) {

        let daysPerStack
        let n = 0
        while (mq + 1 > n) {
          daysPerStack = <>
            {daysPerStack}
            <CardComponent
              key={i}

              data={{
                title: fiveDaysWeatherForecast.fiveDaysWeatherForecast[i + n].dayOfTheWeek,
                body: [
                  {
                    name: 'Temprature',
                    value: fiveDaysWeatherForecast.fiveDaysWeatherForecast[i + n][setup.degrees.type].min + ' - ' + fiveDaysWeatherForecast.fiveDaysWeatherForecast[i + n][setup.degrees.type].max + ' ' + setup.degrees.symbol
                  },
                  {
                    name: 'Day',
                    value: fiveDaysWeatherForecast.fiveDaysWeatherForecast[i + n].day
                  },
                  {
                    name: 'Night',
                    value: fiveDaysWeatherForecast.fiveDaysWeatherForecast[i + n].night
                  },
                ]
              }}
            />

          </>
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

    {fiveDaysWeatherForecast.fiveDaysWeatherForecast.length === 0
      ? null
      : mq === 3

        ? <Stack
          direction="row"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        > {createArrayOfSingleDay()}
        </Stack>

        : <Carousel autoPlay={false} navButtonsAlwaysVisible={true} animation={'slide'} >
          {createArrayOfFewDays()}
        </Carousel>
    }

  </>
}


const mapStateToProps = state => {
  return {
    fiveDaysWeatherForecast: state.fiveDaysWeatherForecast,
    setup: state.setup
  }
}

export default connect(
  mapStateToProps,
  null
)(CarouselContainer)