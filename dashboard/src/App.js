import * as React from "react";
import { createBrowserHistory as createHistory } from "history";
import { Admin, Resource } from "react-admin";
import TuneIcon from "@material-ui/icons/Tune";
import FilterListIcon from "@material-ui/icons/FilterList";
import StoreIcon from "@material-ui/icons/Store";
import dataProvider from "./components/dataProvider";
import Dashboard from "./components/Dashboard";
import authProvider from "./components/authProvider";
import { ProductList, ProductEdit, ProductCreate } from "./components/products";
import { FilterList, FilterEdit, FilterCreate } from "./components/filters";
import { SlideList, SlideEdit, SlideCreate } from "./components/slides";

const history = createHistory();

const App = () => (
  <Admin
    dashboard={Dashboard}
    history={history}
    authProvider={authProvider}
    dataProvider={dataProvider}
    color="inherit"
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      icon={StoreIcon}
    />
    <Resource
      name="filters"
      list={FilterList}
      edit={FilterEdit}
      create={FilterCreate}
      icon={FilterListIcon}
    />
    <Resource
      name="slides"
      list={SlideList}
      edit={SlideEdit}
      create={SlideCreate}
      icon={TuneIcon}
    />
  </Admin>
);

export default App;
