import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { createBrowserHistory } from 'history';

import HomePage from "./pages/homePage";
import ShipDetails from "./pages/shipDetails";
import NotFound from "./pages/404NotFound";

const history = createBrowserHistory();

export default class AppRouter extends React.Component {

    render() {

        return (
            <Router history={history}>
                <Switch>
                    <Route path={'/'} exact component={HomePage}/>
                    <Route path={'/details/:id'} component={ShipDetails}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )

    }

}