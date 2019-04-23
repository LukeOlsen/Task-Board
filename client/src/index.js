import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from "./store/index";
import './App.css';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={App} />
                </Switch>
            </BrowserRouter>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);
