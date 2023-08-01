import React from 'react';
import ReactDOM from 'react-dom'; // Fixed import statement for ReactDOM
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FrontPage from './FrontPage';
import ManagePage from './ManagePage';
import Login from './FirebaseLogin';
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore'; // Import other Firebase services as needed
// import { Route, Navigate } from 'react-router-dom';


const firebaseConfig = {
  apiKey: "AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA",
  authDomain: "besterdev-432e9.firebaseapp.com",
  projectId: "besterdev-432e9",
  storageBucket: "besterdev-432e9.appspot.com",
  messagingSenderId: "352042484093",
  appId: "1:352042484093:web:3b62f25c3b000848720c14",
  measurementId: "G-FCGGY1NE36"
};

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/login" />}
    />
  );
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

reportWebVitals();

const App = () => {
  return (

//     <Router>
//       <Routes>
//         <PrivateRoute exact path="/search" element={<FrontPage />} />
//         <PrivateRoute exact path="/manage" element={<ManagePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };
    <Router>
      <Routes>
        <Route exact path="/search" element={<FrontPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>

  //   <Router>
  //   <Routes>
  //     <Route path="/login" element={<Login />} />
  //     <PrivateRoute path="/search" element={<FrontPage />} />
  //     <PrivateRoute path="/manage" element={<ManagePage />} />
  //   </Routes>
  // </Router>
  );
};

const isAuthenticated = () => {
  const user = firebase.auth().currentUser;
  return !!user;
};

ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render to render the App component

export default App;