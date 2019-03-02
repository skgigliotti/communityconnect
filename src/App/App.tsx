import React from 'react';

import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppContainer from './AppContainer'

import { Route, Switch } from 'react-router';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

library.add(fab, fas);
const App = () => (
    <Switch>
        <Route path='/' exact component={AppContainer} />
        <Route path='/admin' exact component={AppContainer} />
        <Route component={NotFoundPage} />
    </Switch>
)

export default App;
