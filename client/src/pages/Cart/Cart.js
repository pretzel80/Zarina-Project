import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import CartForm from '../../components/CartForm/CartForm';
import style from './Cart.module.scss';
import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
    fetchCart,
    delProdFromCart,
    decreaseProdQty,
    increaseProdQty,
} from '../../helpers/CartAPI';
import {setCart, setUser, setIsCreateOrder, setCartQty} from './index';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import img from '../../assets/icons/Diamond.png';
import {openModal} from '../../components/Modals/LoginModal/loginModalSlice';
import {useHistory} from "react-router-dom";

function Cart(props) {
    const isAuth = useSelector(state => state.productReducer.isAuth);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchCart(setCart, setUser, localStorage.getItem('token')));
    }, [isAuth]);
    let productsOnCart = useSelector(
        state => state.cartReducer.data,
        shallowEqual,
    );
    let allOrders = useSelector(
        state => state.cartReducer.fetchedOders,
        shallowEqual,
    );

  const deleteFromCart = event => {
    event.stopPropagation();
    const itemToDel = productsOnCart.find(
      elem => elem.product._id == event.target.id,
    );
    dispatch(
      delProdFromCart(event.target.id, localStorage.getItem('token'), setCart),
    );
    dispatch(setCartQty(props.cartQty - itemToDel.cartQuantity));
  };

  const decreaseQty = e => {
    if (e.detail === 1) {
      dispatch(
        decreaseProdQty(e.target.id, localStorage.getItem('token'), setCart),
      );
      dispatch(setCartQty(props.cartQty - 1));
    }
    return;
  };
  const increaseQty = e => {
    if (e.detail === 1) {
      dispatch(
        increaseProdQty(e.target.id, localStorage.getItem('token'), setCart),
      );
      dispatch(setCartQty(props.cartQty + 1));
    }
    return;
  };

  const sumTotals = () => {
    let getPrice = productsOnCart.reduce((acc, curr) => {
      let cur = curr.product.currentPrice * curr.cartQuantity;
      return acc + cur;
    }, 0);
    return (
      <div>
        {props.isCreateOrder && (
          <div style={{ overflow: 'scroll', maxHeight: '320px' }}>
            {productsOnCart.map(e => (
              <div className={style.totalImgs}>
                <div className={style.totalQuaCirc}>{e.cartQuantity}</div>
                <img
                  style={{ width: '100px', height: '100px' }}
                  src={e.product.imageUrls[0]}
                  alt={e.product.descriptions}
                />
                <p>{e.product.currentPrice} UAH</p>
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <h4>SUBTOTAL: </h4>
          <p>{getPrice} UAH</p>
        </div>

        {!props.isCreateOrder ? (
          <p>
            Discount and Shipping will be calculated at checkout, where
            applicable.
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <p>Shipping & Handling</p> <p>0 UAH</p>
          </div>
        )}

        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <h4>ESTIMATED TOTAL: </h4>
          <p>{getPrice} UAH</p>
        </div>
        {!props.isCreateOrder && (
          <Button
            className={style.checkoutBtn}
            variant="contained"
            onClick={() => dispatch(setIsCreateOrder(true))}
            style={{ width: '100%' }}>
            CHECKOUT
          </Button>
        )}
      </div>
    );
  };
  return (
    <div className={style.buyerCart}>
      {!props.isCreateOrder && !props.isCompleteOrder && <h2>SHOPPING BAG</h2>}
      {props.isCreateOrder && <h2>CHECKOUT</h2>}
      {props.isCompleteOrder && <h2>Your order is placed!</h2>}
      {props.isCompleteOrder && allOrders.length !== 0 ? (
        <div style={{ margin: '0 auto' }}>
          <p style={{ marginBottom: '10px', textAlign: 'center' }}>
            Order #{allOrders[allOrders.length - 1].orderNo}
          </p>
          <Button href="/" variant="contained" className={style.checkoutBtn}>
            GO BACK TO SHOPPING
          </Button>
        </div>
      ) : null}

      {(productsOnCart.length === 0 && !props.isCreateOrder) || !isAuth ? (
        <div className={style.emptyCart}>
          <img src={img} alt="diamond img" />
          {!isAuth ? (
            <p style={{ marginBottom: '10px' }}>
              Please{' '}
              <a
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: 'blue',
                }}
                onClick={() => {
                  dispatch(openModal());
                }}>
                Login
              </a>{' '}
              or{' '}
              <a
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: 'blue',
                }}
                onClick={() => {
                  dispatch(openModal());
                }}>
                Register
              </a>{' '}
              new account...
            </p>
          ) : (
            <p>Your Shopping Bag is currently empty.</p>
          )}

          <Button
            href="/"
            variant="contained"
            className={style.checkoutBtn}
            style={{ marginTop: '10px' }}>
            GO BACK TO SHOPPING
          </Button>
        </div>
      ) : null}
      <div
        className={
          !props.isCreateOrder ? style.cartWrapper : style.revercedCardWrapper
        }>
        {productsOnCart.length !== 0 &&
        !props.isCreateOrder &&
        !props.isCompleteOrder &&
        isAuth ? (
          <TableContainer className={style.cartItems}>
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
                {productsOnCart.map(prod => (
                  <TableRow
                    key={prod.product._id}
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
                        alt={prod.product.descriptions}
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
                        <div
                          onClick={deleteFromCart}
                          id={prod.product._id}
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            width: 'fit-content',
                          }}>
                          <p
                            id={prod.product._id}
                            style={{
                              fontSize: '22px',
                              textDecoration: 'none',
                              marginRight: '3px',
                            }}>
                            &#215;
                          </p>
                          <p
                            id={prod.product._id}
                            style={{ textDecoration: 'underline' }}>
                            {' '}
                            Remove
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {prod.product.currentPrice} UAH
                    </TableCell>
                    <TableCell align="center">
                      <button
                        id={prod.product._id}
                        onClick={increaseQty}
                        disabled={
                          prod.cartQuantity === prod.product.quantity ||
                          prod.cartQuantity > prod.product.quantity ||
                          prod.product.quantity === 0
                        }
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontSize: '18px',
                        }}>
                        &#708;
                      </button>
                      <p style={{ margin: '0' }}>{prod.cartQuantity}</p>
                      <button
                        id={prod.product._id}
                        onClick={decreaseQty}
                        disabled={
                          prod.cartQuantity === 1 || prod.cartQuantity === 0
                        }
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          fontSize: '18px',
                        }}>
                        &#709;
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      {prod.product.currentPrice * prod.cartQuantity} UAH
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}

        {productsOnCart.length !== 0 && !props.isCompleteOrder && isAuth ? (
          <div className={style.cartInfo}>
            <div style={{ width: '100%' }}>
              <h3>BAG TOTALS</h3>
              {sumTotals()}
            </div>
          </div>
        ) : null}
        {props.isCreateOrder && !props.isCompleteOrder ? <CartForm /> : null}
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    cartQty: state.cartReducer.cartQty,
    isCreateOrder: state.cartReducer.isCreateOrder,
    isCompleteOrder: state.cartReducer.isCompleteOrder,
    order: state.cartReducer.order,
    user: state.cartReducer.user,
    fetchedOrders: state.cartReducer.fetchedOders,
  };
};
export default connect(mapStateToProps, null)(Cart);
