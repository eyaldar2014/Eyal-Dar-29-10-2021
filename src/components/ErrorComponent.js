import react from 'react'

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse';

function ErrorComponent() {

  const [open, setOpen] = react.useState(true)


  return <>

    <Box sx={{ width: '100%' }} >
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


export default ErrorComponent