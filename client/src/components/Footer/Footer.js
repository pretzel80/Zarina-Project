import React from 'react';
import {
  AppBar,
  Container,
  Box,
  Grid,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from './Footer.module.scss';
// import Contacts from '../../pages/Contacts/Contacts'

export default function Footer() {
  return (
      <AppBar
        className="btm"
        position="static"
        color="inherit"
        sx={{ top: 'auto', bottom: 0 }}>
        <hr className={style.btm__topLine} />
        <Box maxWidth="xl" px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }}>
          <Container sx={{ display: { xs: 'block', md: 'none' } }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography
                  style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                  Contact Us
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="/contacts">
                    Contact page
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    href="tel:+380937720060"
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}>
                    +38 (093) 772-0060
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    href="tel:+380987477795"
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}>
                    +38 (098) 747-7795
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    href="mailto:mmmmokhov@gmail.com"
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}>
                    mmmmokhov@gmail.com
                  </Link>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header">
                <Typography
                  fs="50px"
                  style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                  Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Brand history
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    News
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Supply Chain Acts
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Website Policies
                  </Link>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header">
                <Typography
                  className={style.btm__acc}
                  style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
                  Customer Service
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Payments & Shipping
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Returns & Replacements
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Loyalty Program
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Product Care
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Gift Cards
                  </Link>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Container>
          <Container sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Box style={{ marginBottom: '20px' }}>
                  <Link
                    underline="none"
                    style={{
                      fontFamily: 'Montserrat',
                      color: '#000',
                      fontWeight: 600,
                    }}
                    href="/contacts">
                    Contact Us
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="tel:+380937720060">
                    +38 (093) 772-0060
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="tel:+380987477795">
                    +38 (098) 747-7795
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="mailto:mmmmokhov@gmail.com">
                    mmmmokhov@gmail.com
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box style={{ marginBottom: '20px' }}>
                  <Link
                    underline="none"
                    style={{
                      fontFamily: 'Montserrat',
                      color: '#000',
                      fontWeight: 600,
                    }}
                    href="/info">
                    Information
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Brand history
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    News
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Supply Chain Acts
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Website Policies
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box style={{ marginBottom: '20px' }}>
                  <Link
                    underline="none"
                    style={{
                      fontFamily: 'Montserrat',
                      color: '#000',
                      fontWeight: 600,
                    }}
                    href="/service">
                    Customer Service
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Payments & Shipping
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Returns & Replacements
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Loyalty Program
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Product Care
                  </Link>
                </Box>
                <Box style={{ marginBottom: '15px' }}>
                  <Link
                    underline="none"
                    style={{ fontFamily: 'Montserrat', color: '#000' }}
                    href="#">
                    Gift Cards
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          bgcolor="#002D50"
          textAlign="center"
          pt={{ xs: 2, sm: 3 }}
          pb={{ xs: 2, sm: 3 }}
          color="#FFF">
          © 13 hands team 2022
        </Box>
      </AppBar>
  );
}
