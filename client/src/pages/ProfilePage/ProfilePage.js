import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchUserData, cancelOrder } from '../../helpers/ProfileAPI';
import { setUser, setOrders } from '../ProfilePage/index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import Paper from '@mui/material/Paper';
import style from './Profile.module.scss';
import { openModal } from '../../components/Modals/LoginModal/loginModalSlice';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function ProfilePage(props) {
  const userData = useSelector(
    state => state.profileReducer.user,
    shallowEqual,
  );
  const ordersData = useSelector(
    state => state.profileReducer.orders,
    shallowEqual,
  );
  const isAuth = useSelector(state => state.productReducer.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserData(localStorage.getItem('token'), setUser, setOrders));
  }, [isAuth]);
  return (
    <div>
      <Paper
        elevation={3}
        sx={{ maxWidth: 800, minWidth: 320, p: 2, m: 'auto', mb: 5, mt: 5 }}>
        {userData !== null && (
          <div>
            <Stack direction="column" spacing={2} sx={{ mb: 4 }}>
              <Avatar
                alt={userData.firstName}
                src={`${process.env.REACT_APP_HOST}/${userData.avatarUrl}`}
                sx={{ width: 96, height: 96, margin: '0 auto' }}
              />

              <Typography>Name: {userData.firstName}</Typography>
              <Typography>Second name: {userData.lastName}</Typography>
              <Typography>Email: {userData.email}</Typography>
            </Stack>
          </div>
        )}
        {ordersData.length !== 0 ? (
          <div>
            <Typography
              sx={{ width: 96, margin: '0 auto', mb: 3, textAlign: 'center' }}
              variant="h6">
              Oders
            </Typography>
            {ordersData.length === 1 ? (
              <TableContainer>
                <Typography
                  sx={{
                    width: 196,
                    margin: '0 auto',
                    mb: 3,
                    textAlign: 'center',
                  }}>
                  Order # {ordersData[0].orderNo}
                </Typography>
                <Typography
                  sx={{
                    width: 196,
                    margin: '0 auto',
                    mb: 3,
                    textAlign: 'center',
                  }}>
                  Total: {ordersData[0].totalSum} UAH
                </Typography>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersData[0].products.map(prod => (
                      <TableRow
                        key={prod._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}>
                        <TableCell
                          component="th"
                          scope="prod"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                          }}>
                          <img
                            style={{ width: '100px', height: '100px' }}
                            src={prod.product.imageUrls[0]}
                            alt={prod.product.description}
                          />
                          <div style={{ width: '140px', color: '#A1A5AD' }}>
                            <p
                              style={{
                                textTransform: 'uppercase',
                                color: 'black',
                                marginBottom: '5px',
                              }}>
                              {prod.product.description}
                            </p>
                            Article no.: {prod.product.itemNo}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {prod.product.currentPrice} UAH
                        </TableCell>
                        <TableCell align="center">
                          {prod.cartQuantity}
                        </TableCell>

                        <TableCell align="center">
                          {prod.product.currentPrice * prod.cartQuantity} UAH
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              ordersData.map(order => (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    {/* <CancelIcon
                      className={style.cancelIcon}
                      sx={{ mr: 2, cursor: 'pointer' }}
                      onClick={event => {
                        event.stopPropagation();
                        dispatch(
                          cancelOrder(
                            localStorage.getItem('token'),
                            order._id,
                            `Order # ${order.orderNo} was canceled`,
                            userData.email,
                          ),
                        );
                      }}
                    /> */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}>
                      <Typography>{`Order# ${order.orderNo}`}</Typography>
                      <Typography
                        sx={{
                          mr: 2,
                          ml: 1,
                          textAlign: 'left',
                          width: 150,
                        }}>{`Total: ${order.totalSum} UAH`}</Typography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.products.map(prod => (
                            <TableRow
                              key={prod.product._id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}>
                              <TableCell
                                component="th"
                                scope="prod"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                }}>
                                <img
                                  style={{ width: '100px', height: '100px' }}
                                  src={prod.product.imageUrls[0]}
                                  alt={prod.product.descriptions}
                                />
                                <div
                                  style={{ width: '140px', color: '#A1A5AD' }}>
                                  <p
                                    style={{
                                      textTransform: 'uppercase',
                                      color: 'black',
                                      marginBottom: '5px',
                                    }}>
                                    {prod.product.description}
                                  </p>
                                  Article no.: {prod.product.itemNo}
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                {prod.product.currentPrice} UAH
                              </TableCell>
                              <TableCell align="center">
                                {prod.cartQuantity}
                              </TableCell>

                              <TableCell align="center">
                                {prod.product.currentPrice * prod.cartQuantity}{' '}
                                UAH
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))
            )}
          </div>
        ) : (
          <Typography
            sx={{ width: 96, margin: '0 auto', mb: 3, textAlign: 'center' }}
            variant="h6">
            Your orders list is empty.
          </Typography>
        )}
      </Paper>
    </div>
  );
}

export default ProfilePage;
