import React from 'react';
import ReactDOM from 'react-dom'; // Fixed import statement for ReactDOM
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FrontPage from './FrontPage';
import ManagePage from './ManagePage';
import Login from './FirebaseLogin';
// import firebase from 'firebase/app';
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'react-tooltip/dist/react-tooltip.css'

reportWebVitals();

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/search" element={<FrontPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render to render the App component

const firebaseConfig = {
  apiKey: 'AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA',
  authDomain: 'besterdev-432e9.firebaseapp.com',
  projectId: 'besterdev-432e9',
  // Add other Firebase configuration properties here...
};

firebase.initializeApp(firebaseConfig); 

export default App;
