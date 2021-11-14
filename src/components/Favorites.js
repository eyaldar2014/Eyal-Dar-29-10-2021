import react from 'react';

import { connect } from 'react-redux'

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FavoriteCard from './FavoriteCard';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';


function Favorites({ favorites, setup }) {

  const [error, setError] = react.useState(false)
  const [open, setOpen] = react.useState(true)

  react.useEffect(() => {

    if (favorites.error) {
      setError(true)
      setOpen(true)
    }
  }, [favorites])


  return <>
    <Box
      sx={{
        pt: 4,
        pb: 4,
        backgroundColor: setup.theme.backgroundColor
      }}
    >

      {
        error === false ? null : <>
          <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                error fetching data !
              </Alert>
            </Collapse>
          </Box>
        </>
      }

      <Box
        sx={{
          m: 4,
          backgroundColor: setup.theme.blue
        }}
      >

        <Typography variant="h2" sx={{ mt: 4, p: 4, color: setup.theme.textColor }} >
          Favorites
        </Typography>

        <Stack
          direction="row"
          sx={{
            p: 4,
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: 200,
            justifyContent: 'space-between'
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
      </Box>

    </Box>
  </>
}


const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    setup: state.setup
  }
}

export default connect(
  mapStateToProps
)(Favorites)
