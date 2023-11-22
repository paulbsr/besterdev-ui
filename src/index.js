//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
//https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import PageSearch from './PageSearch';
import PageManage from './PageManage';
import PageLogin from './PageLogin';
import PageLogout from './PageLogout';
import PageHowtoDocs from './PageHowtoDocs';
import PageHowtoManage from './PageHowtoManage';
import PageResources from './PageResources';
import firebase from 'firebase/compat/app';
import 'react-tooltip/dist/react-tooltip.css';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { UserProvider } from './UserContext';
import { useUserContext } from './UserContext';
import ReactGA from 'react-ga';

// import CandidateSearchLinkedin from './CandidateSearchLinkedin';


const TRACKING_ID = "G-FCGGY1NE36"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const PrivateRoutes = () => {
  const { loggedInUserEmail } = useUserContext();
  console.log('Hy behoort leeg te wees?' + loggedInUserEmail);
  return (
    loggedInUserEmail ? <Outlet /> : <Navigate to='/login' />
  )
}

const firebaseConfig = {
  apiKey: "AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA",
  authDomain: "besterdev-432e9.firebaseapp.com",
  projectId: "besterdev-432e9",
  storageBucket: "besterdev-432e9.appspot.com",
  messagingSenderId: "352042484093",
  appId: "1:352042484093:web:3b62f25c3b000848720c14",
  measurementId: "G-FCGGY1NE36"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const App = () => {
  console.log('App() wat <UserProvider> bevat is nou geroep - dit beteken email gaan oorgeskryf word.');

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/search' element={<PageSearch />} />
            <Route path='/screen' element={<PageSearch />} />
            <Route path='/manage' element={<PageManage />} />
            <Route path='/logout' element={<PageLogout />} />
            <Route path='/howtomanage' element={<PageHowtoManage />} />
            <Route path='/howtodocs' element={<PageHowtoDocs />} />
            <Route path='/resources' element={<PageResources/>} />
          </Route>
          <Route path='/login' element={<PageLogin />} />
          <Route path='/' element={<PageLogin />} />
          <Route path='*' element={<PageLogin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
export const auth = getAuth(app);
ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render to render the App component
export default App;