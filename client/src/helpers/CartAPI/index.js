import axios from 'axios';
export const fetchCart = (setCart, setUser, token) => dispatch => {
  axios
    .get(`${process.env.REACT_APP_HOST}/cart`, {
      headers: {
        Authorization: token,
      },
    })
    .then(res => {
      if (res.data !== null) {
        dispatch(setCart(res.data.products));
      }
      return;
    });
  if (setUser !== null) {
    axios
      .get(`${process.env.REACT_APP_HOST}/customers/customer`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(loggedInCustomer => {
        dispatch(setUser(loggedInCustomer.data));
      });
  }
};
export const delProdFromCart = (prodId, token, setCart) => dispatch => {
  if (prodId) {
    axios
      .delete(`${process.env.REACT_APP_HOST}/cart/${prodId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        if (res.data !== null) {
          dispatch(setCart(res.data.products));
        }
        return;
      });
  }
  return;
};
export const fetchCreateOrder = (order, setFetchedOrders) => dispatch => {
  axios.post(`${process.env.REACT_APP_HOST}/orders`, order).catch(res => {
    axios
      .get(`${process.env.REACT_APP_HOST}/orders`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        dispatch(setFetchedOrders(res.data));
      });
  });
};

export const decreaseProdQty = (prodId, token, setCart) => dispatch => {
  if (prodId) {
    axios
      .delete(`${process.env.REACT_APP_HOST}/cart/product/${prodId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        if (res.data !== null) {
          dispatch(setCart(res.data.products));
        }
        return;
      });
  }
  return;
};

export const increaseProdQty = (prodId, token, setCart) => dispatch => {
  if (prodId) {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${process.env.REACT_APP_HOST}/cart/${prodId}`, requestOptions)
      .then(response => response.json())
      .then(res => {
        if (res !== null && setCart) {
          dispatch(setCart(res.products));
        }
        return;
      });
  }
  return;
};
