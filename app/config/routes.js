import React from "react";
import { Provider } from "react-redux";
import configureStore from "../store/configureStore";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ItemList from "../components/ItemList";
import TestComponent from "../components/ItemTest";
import Details from "../components/Details";
import Links from "../components/Links";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

var store = configureStore();

const routes = (
  <Provider store={ store }>
    <MuiThemeProvider>
      <BrowserRouter>
        <div>
          <Links />
          <Switch>
            <Route exact path="/" component={ ItemList } />
            <Route path="/item/:id" component={ Details } />
            <Route path="/item" component={ TestComponent } />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

export default routes;
