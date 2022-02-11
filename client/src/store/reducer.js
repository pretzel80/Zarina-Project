import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../pages/Cart/index.js';
import profileReducer from '../pages/ProfilePage/index.js';
import loginModal from '../components/Modals/LoginModal/loginModalSlice';
import productReducer from '../pages/ProductsPage/index.js';

const rootReducer = combineReducers({
  productReducer: productReducer,
  cartReducer: cartReducer,
  loginModal: loginModal,
  profileReducer: profileReducer,
});

export default rootReducer;
