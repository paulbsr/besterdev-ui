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
import PageHowtoManage from './PageHowtoManage';
import PageResources from './PageResources';
import firebase from 'firebase/compat/app';
import PageHome from './PageHome';
import PageHowtoEdit from './PageHowtoEdit';
import PageCyclopedia from './PageCyclopedia';
import PageSwagger from './PageSwagger';
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
import PageMyCV from './PageMyCV';
// import BreakingNewsAPI from './BreakingNewsAPI';
import { useState } from 'react';

const TRACKING_ID = "G-FCGGY1NE36";
ReactGA.initialize(TRACKING_ID);

const PrivateRoutes = () => {
  const { loggedInUserEmail } = useUserContext();

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
  // const [searchPhrase, setSearchPhrase] = useState('ireland') //alles begin hier
  return (
    <>
      {/* <BreakingNewsAPI searchPhrase={searchPhrase}/>  */}
      <UserProvider>
        <Router>
          <Routes>

            <Route element={<PrivateRoutes />}>
              <Route path='/search' element={<PageSearch />} />
              <Route path='/screen' element={<PageSearch />} />
              <Route path='/candidatemanage' element={<PageManage />} />
              <Route path='/logout' element={<PageLogout />} />
              <Route path='/howtomanage' element={<PageHowtoManage />} />
              <Route path='/hunt' element={<PageSearch />} />
              <Route path='/cyclopediamanage' element={<PageCyclopedia />} />
              <Route path='/webresourcemanage' element={<PageResources />} />
              <Route path='/mycv' element={<PageMyCV />} />
            </Route>


            <Route path='/howtoedit/:howto_id' element={<PageHowtoEdit />} />
            {/* <Route path='/home' element={<PageHome searchPhrase={searchPhrase}/>} /> */}
            <Route path='/home' element={<PageHome/>} />
            <Route path='/login' element={<PageLogin />} />
            <Route path='/swagger' element={<PageSwagger />} />
            <Route path='/' element={<PageLogin />} />
            <Route path='*' element={<PageLogin />} />

          </Routes>
        </Router>
      </UserProvider></>

  );
};
export const auth = getAuth(app);
ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render to render the App component

export default App;