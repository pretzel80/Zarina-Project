import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { account, cart, like, logo } from './icons';
import style from './Header.module.scss';
import MobileMenu from './MobileMenu';
import DesctopMenu from './DesctopMenu';
import { openModal } from '../Modals/LoginModal/loginModalSlice';
import LoginModal from '../Modals/LoginModal/LoginModal';
import { setIsAuth } from '../../pages/ProductsPage';
import { setCartQty } from '../../pages/Cart/index';
import SearchWithImages from '../Search/SearchWithImages';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userData, setUserData] = useState(null);
  const isAuth = useSelector(state => state.productReducer.isAuth);
  const userCartQty = useSelector(state => state.cartReducer.cartQty);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST}/customers/customer`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(loggedInCustomer => {
        axios
          .get(`${process.env.REACT_APP_HOST}/cart`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
          .then(res => {
            if (res.data !== null) {
              let getTotalQty = res.data.products.reduce((acc, curr) => {
                return acc + curr.cartQuantity;
              }, 0);
              dispatch(setCartQty(getTotalQty));
            }
            return;
          });
        setUserData(loggedInCustomer.data);
        dispatch(setIsAuth(true));
      });
  }, [isAuth]);

  const history = useHistory();
  const dispatch = useDispatch();
  const modal = useSelector(state => state.loginModal.value);

  const favorites = useSelector(
    state => state.productReducer.favoritesProducts,
  );

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar color="inherit">
        <hr className={style.topLine} />
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Box sx={{ width: '20%', display: { xs: 'none', md: 'block' } }}>
              <SearchWithImages />
            </Box>
            <Box sx={{ flexGrow: { xs: 1, md: 0 }, order: { xs: 2, md: 0 }}}>
              <Link to="/">
                <img className={style.logo} src={logo} alt="logo" />
              </Link>
            </Box>

            {/* Navigation for mobile */}
            <MobileMenu />

            {/* Right menu */}
            <Box sx={{ display: 'flex', order: 3 }}>
              {/* Favorites */}
              <Box
                sx={{
                  mr: { xs: 1, sm: 2, md: 3 },
                }}>
                <button
                  className={style.button}
                  disabled={!isAuth}
                  onClick={() => history.push(`/favorites`)}>
                  <img
                    className={style.button__icon}
                    src={like}
                    alt="favorites"
                  />
                  <p style={{ minWidth: 15 }}>
                    {isAuth ? favorites.length : null}
                  </p>
                </button>
              </Box>

              {/* Cart */}
              <Box sx={{ mr: { xs: 1, sm: 2, md: 3 } }}>
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                  <button className={style.button}>
                    <img className={style.button__icon} src={cart} alt="cart" />
                    <p>{userCartQty}</p>
                  </button>
                </Link>
              </Box>

              {/* User menu */}
              <Box sx={{ flexGrow: 0, cursor: 'pointer' }}>
                <Box
                  onClick={
                    userData === null
                      ? () => {
                          dispatch(openModal());
                        }
                      : handleOpenUserMenu
                  }
                  sx={{ display: 'flex' }}>
                  <img
                    className={style.button__icon}
                    src={account}
                    alt="account"
                  />
                  <Typography sx={{ display: { xs: 'none', md: 'block' } }}>
                    {userData === null ? 'My Account' : userData.firstName}
                  </Typography>
                </Box>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem onClick={() => history.push('/profile')}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem('token');
                      dispatch(setIsAuth(false));
                      dispatch(setCartQty(null));
                      setUserData(null);
                      handleCloseUserMenu();
                    }}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
                {modal ? <LoginModal /> : null}
              </Box>
            </Box>
          </Toolbar>

          {/* Desctop navigation */}
          <DesctopMenu />
        </Container>
      </AppBar>
      <Toolbar />
      <Toolbar sx={{ display: { xs: 'none', md: 'block' } }} />
    </React.Fragment>
  );
};
export default Header;
