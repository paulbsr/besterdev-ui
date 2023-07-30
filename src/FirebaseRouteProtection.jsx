import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!firebase.auth().currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = () => {
  return (
    <Router>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      {/* Add other routes here... */}
    </Router>
  );
};

export default App;
