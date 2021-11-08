import react from 'react';

import { connect } from 'react-redux'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FavoriteCard from './FavoriteCard';


function Favorites({ favorites }) {

  react.useEffect(() => {

  }, [favorites])


  return <>

    {/* <Box
      sx={{
        m: 4,
        p: 4,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.9, 0.9]
        },
      }}
    >

      <Typography variant="h2" color="text.secondary" sx={{ mb: 4 }} >
        Favorites
      </Typography>

      <Stack
        direction="row"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: 200,
          justifyContent: 'space-between',
        }}
      >
        {
          !favorites.favorites.length > 0
            ? null
            : favorites.favorites.map((fav, i) => {
              return <FavoriteCard key={i} favorite={fav} />
            })
        }

      </Stack>
    </Box> */}













    <Box
      sx={{
        m: 4,
        p: 4,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.9, 0.9]
        },
      }}
    >

      <Typography variant="h2" color="text.secondary" sx={{ mb: 4 }} >
        Favorites
      </Typography>

      <Stack
        direction="row"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: 200,
          justifyContent: 'space-between',
        }}
      >
        {
          !laFavorites.length > 0
            ? null
            : laFavorites.map((fav, i) => {
              return <FavoriteCard key={i} favorite={fav} />
            })
        }

      </Stack>
    </Box>


  </>
}


const mapStateToProps = state => {
  return {
    favorites: state.favorites
  }
}

export default connect(
  mapStateToProps
)(Favorites)


const laFavorites = [
  {
    name: "aikgasd",
    weather: 55
  },
  {
    name: "aikgasd",
    weather: 55
  },
  {
    name: "aikgasd",
    weather: 55
  },
  {
    name: "aikgasd",
    weather: 55
  }
]