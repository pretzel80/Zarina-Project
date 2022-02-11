import React from 'react';
import {Grid, Typography} from '@mui/material';

const NumberWithCommas = ({ number }) => {

  let parts = !number ? ['1'] : number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");

  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'Montserrat',
          fontSize: {
              xs: 21,
              sm: 21,
              md: 21
          },
          fontWeight: 700,
          alignSelf: 'self-end',
          marginRight: 1,
          color: '#002d50',
        }}>
        {parts.join('.')}
      </Typography>
      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'Montserrat',
          fontSize: {
              xs: 14,
              sm: 15,
              md: 16
          },
          alignSelf: 'center',
        }}>
        UAH
      </Typography>
    </Grid>
  );
};

export default NumberWithCommas;
