import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterAndSortValues } from '../../pages/ProductsPage';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchWithImages from '../Search/SearchWithImages';

function MobileMenu(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
        flexGrow: 1,
        display: { xs: 'flex', md: 'none' },
      }}>
      <IconButton
        size="large"
        aria-label="products"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}>
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            width: { xs: '250px', sm: '300px' },
            pb: 2,
            ml: 2
          }}>
          <SearchWithImages />
        </Box>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
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
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
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
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
              Engagement
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The section is in the process of filling ...
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header">
            <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
              Souvenirs
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The section is in the process of filling ...
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel5'}
          onChange={handleChange('panel5')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header">
            <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
              Gift Cards
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The section is in the process of filling ...
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel6'}
          onChange={handleChange('panel6')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header">
            <Typography style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>
              Sale
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The section is in the process of filling ...
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Menu>
    </Box>
  );
}

export default MobileMenu;
