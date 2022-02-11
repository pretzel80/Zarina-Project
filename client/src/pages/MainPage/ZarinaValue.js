import React from 'react';
import { Typography, Box } from '@mui/material';

export const ZarinaValue = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginBottom: { xs: 1, sm: 3, md: 20 },
          flexDirection: {
            xs: 'column-reverse',
            sm: 'column-reverse',
            md: 'row',
          },
          position: 'relative',
        }}>
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '900px' },
            height: { xs: '500px', sm: '600px', md: '700px' },
            position: { xs: 'static', sm: 'static', md: 'absolute' },
            right: 0,
            backgroundSize: 'cover',
          }}
          style={{
            backgroundImage: `url(https://res.cloudinary.com/teamhands/image/upload/v1635863302/Jewelry%20shop/mp/promo/1_gus0ke.png)`,
          }}></Box>
        <Box
          sx={{
            marginTop: { xs: 1, sx: 2, md: 10 },
            fontSize: '14px',
            color: 'white',
            background: '#002D50',
            opacity: 0.9,
            fontFamily: 'Montserrat',
            width: { xs: 'auto', sm: 'auto', md: '584px' },
            height: { xs: 'auto', sm: 'auto', md: '418px' },
            alignItems: 'left',
            padding: '50px 115px 50px 85px ',
          }}>
          <Typography
            style={{
              fontWeight: '400',
              fontSize: '21px',
              lineHeight: '30px',
              fontFamily: 'Montserrat',
              fontStyle: 'normal',
            }}
            gutterBottom>
            ZARINA Jewelry House gives you unforgettable emotions in the form of
            jewelry.
          </Typography>
          <Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Typography
                style={{
                  fontSize: '100px',
                  fontFamily: 'playfairDisplay , serif',
                  marginRight: '20px',
                }}>
                {' '}
                Z{' '}
              </Typography>
              <Typography
                variant="body1"
                style={{
                  width: '500px',
                  fontFamily: 'Montserrat',
                  fontWeight: '400',
                  fontSize: '15px',
                }}>
                ZARINA Jewelry House is not just a jewelry brand. It is a
                powerful platform for uniting active women, ZARINA jewelry is a
                source of strength and a tool to unlock the value of every
                woman.
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: '400',
                  fontSize: '15px',
                }}>
                A spectacular design that does not violate classic elegance and
                sophistication, the aristocratic nobility of diamonds,
                avant-garde combinations and solo colored stones in a rich
                palette of colors and shades - this is how a fashionable thing
                is born at all times, which emphasizes and enhances the sense of
                style inherent in a confident woman.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ZarinaValue;
