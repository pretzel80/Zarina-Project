import { createSlice } from '@reduxjs/toolkit';
export const cartReducer = createSlice({
  name: 'cartReducer',
  initialState: {
    data: [],
    user: [],
    order: null,
    fetchedOders: [],
    isCreateOrder: false,
    isCompleteOrder: false,
    orderStage: null,
    cartQty: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.data = action.payload;
    },
    setCartQty: (state, action) => {
      state.cartQty = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setFetchedOrders: (state, action) => {
      state.fetchedOders = action.payload;
    },
    toggleCart: (state, action) => {
      const productInfo = action.payload;
      if (state.data.find(itm => itm.article === productInfo.article)) {
        const products = state.data.filter(
          product => product.article !== productInfo.article,
        );
        localStorage.setItem('cart', JSON.stringify([...products]));
        return { ...state, data: products };
      } else {
        const products = [...state.data, productInfo];
        localStorage.setItem('cart', JSON.stringify(products));
        return { ...state, data: products };
      }
    },
    setIsCreateOrder: (state, action) => {
      state.isCreateOrder = action.payload;
    },
    setIsCompleteOrder: (state, action) => {
      state.isCompleteOrder = action.payload;
    },
    createOrder: (state, action) => {
      const deliveryAddress = action => {
        if (action.payload.firstPickAddress === true) {
          return 'Kyiv, Tarasa Shevchenko Boulevard, 2, ZARINA Store ';
        } else if (action.payload.secondPickAddress === true) {
          return 'Kyiv, Maidan Nezalezhnosti, Globus, 1st Line, ZARINA Store ';
        } else if (action.payload.thirdPickAddress === true) {
          return 'Kyiv, Berkovetska Street, Lavina Mall, ZARINA Store ';
        }
        return action.payload.address;
      };
      const sumTotals = () => {
        let getPrice = state.data.reduce((acc, curr) => {
          let cur = curr.product.currentPrice * curr.cartQuantity;
          return acc + cur;
        }, 0);
        return getPrice;
      };

      let address = deliveryAddress(action);
      let createOrder = {
        orderNo: '',
        customerId: state.user._id,
        firstName: action.payload.name,
        lastName: action.payload.secondName,
        products: state.data,
        totalSum: sumTotals(),
        email: action.payload.email,
        mobile: action.payload.mobNumber,
        letterSubject: 'Thank you for order! You are welcome!',
        letterHtml: `<h2>Your order is placed.</h2>`,
      };

      return {
        ...state,
        order: createOrder,
      };
    },
  },
});

export const {
  setCart,
  setCartQty,
  setUser,
  toggleCart,
  setIsCreateOrder,
  createOrder,
  setIsCompleteOrder,
  setFetchedOrders,
} = cartReducer.actions;
//
export default cartReducer.reducer;
