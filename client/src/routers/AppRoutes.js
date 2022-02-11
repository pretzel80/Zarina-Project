import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Cart from '../pages/Cart/Cart';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import OneProductPage from '../pages/OneProductPage/OneProductPage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import Err404 from '../pages/Err404/Err404';
import InfoPage from '../pages/InfoPage/InfoPage';
import ServicePage from '../pages/ServicePage/ServicePage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import SearchResultsPage from '../pages/SearchResultsPage/SearchResultsPage';

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>

      <Route exact path="/favorites/">
        <FavoritesPage />
      </Route>

      <Route exact path="/cart">
        <Cart />
      </Route>

      <Route exact path="/profile">
        <ProfilePage />
      </Route>

      <Route path="/products">
        <ProductsPage />
      </Route>

      <Route exact path="/contacts">
        <ContactPage />
      </Route>

      <Route exact path="/info">
        <InfoPage />
      </Route>

      <Route exact path="/service">
        <ServicePage />
      </Route>

      <Route exact path="/product/:id">
        <OneProductPage />
      </Route>

      <Route exact path="/search">
          <SearchResultsPage/>
      </Route>

      <Route path="*">
        <Err404 />
      </Route>
    </Switch>
  );
}

export default AppRoutes;
