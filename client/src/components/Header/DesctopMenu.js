import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterAndSortValues } from '../../pages/ProductsPage';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

function MobileMenu() {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCloseNavMenu = () => {
    setExpanded(null);
  };

  const dispatch = useDispatch();

  const filterAndSortValues = useSelector(
    state => state.productReducer.filterAndSortValues,
  );

  const viewMoreItem = event => {
    dispatch(
      setFilterAndSortValues({
        ...filterAndSortValues,
        ...{ categories: [event] },
      }),
    );
  };

  const viewMoreItem2 = event => {
    dispatch(
      setFilterAndSortValues({
        ...filterAndSortValues,
        ...{ collections: [event] },
      }),
    );
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
      }}>
      <Accordion
        sx={{ width: '17%', boxShadow: 0, '::before': { height: 0 } }}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
            Jewelry
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}
              to={{ pathname: '/products/filter?categories=rings' }}
              onClick={() => {
                viewMoreItem('rings');
                handleCloseNavMenu();
              }}>
              Rings
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=earrings' }}
              onClick={() => {
                viewMoreItem('earrings');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Earrings
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=pendants' }}
              onClick={() => {
                viewMoreItem('pendants');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Pendants
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=chains' }}
              onClick={() => {
                viewMoreItem('chains');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Chains
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}
              to={{ pathname: '/products/filter?categories=necklaces' }}
              onClick={() => {
                viewMoreItem('necklaces');
                handleCloseNavMenu();
              }}>
              Necklaces
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=bracelets' }}
              onClick={() => {
                viewMoreItem('bracelets');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Bracelets
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=brooches' }}
              onClick={() => {
                viewMoreItem('brooches');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Brooches
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=cufflinks' }}
              onClick={() => {
                viewMoreItem('cufflinks');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Cufflinks
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=accessories' }}
              onClick={() => {
                viewMoreItem('accessories');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Accessories
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?categories=charms' }}
              onClick={() => {
                viewMoreItem('charms');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Charms
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          width: '17%',
          boxShadow: 0,
          backgroundColor: '#fff',
          '::before': { height: 0 },
        }}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
            Collections
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}
              to={{ pathname: '/products/filter?collections=Story' }}
              onClick={() => {
                viewMoreItem2('Story');
                handleCloseNavMenu();
              }}>
              Story
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?collections=Jewel' }}
              onClick={() => {
                viewMoreItem2('Jewel');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Jewel
            </Link>
          </Box>
          <Box style={{ marginBottom: '15px' }}>
            <Link
              to={{ pathname: '/products/filter?collections=Fine' }}
              onClick={() => {
                viewMoreItem2('Fine');
                handleCloseNavMenu();
              }}
              underline="none"
              style={{ fontFamily: 'Montserrat', color: '#000' }}>
              Fine
            </Link>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: '17%', boxShadow: 0, '::before': { height: 0 } }}
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3a-content" id="panel3a-header">
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
            Engagement
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The section is in the process of filling ...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: '17%', boxShadow: 0, '::before': { height: 0 } }}
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4a-content" id="panel4a-header">
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
            Souvenirs
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The section is in the process of filling ...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ width: '17%', boxShadow: 0, '::before': { height: 0 } }}
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5a-content" id="panel5a-header">
          <Typography
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 600,
              whiteSpace: 'pre',
            }}>
            Gift Cards
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The section is in the process of filling ...</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ boxShadow: 0, '::before': { height: 0 } }}
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel6a-content" id="panel6a-header">
          <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
            Sale
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>The section is in the process of filling ...</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default MobileMenu;
