import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import history from './history';
// These components which will be created later will serve the various routes below

// Routes are declared here and also exported for use in other components.
export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        {/* '/' route*/}
        <Route path="/" render={(props) => <App {...props} />} />
      </div>
    </Router>
  );
}