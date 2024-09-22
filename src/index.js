import React, { useState, useEffect } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import './Fonts.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import PageSearch from './PageSearch';
import PageManage from './PageManage';
import PageLogin from './PageLogin';
import PageLogout from './PageLogout';
import PageHowtoManage from './PageHowtoManage';
import PagePeopleScorecard from './PagePeopleScorecard';
import PageResources from './PageResources';
import firebase from 'firebase/compat/app';
import PageHome from './PageHome';
import PageHowtoEdit from './PageHowtoEdit';
import PageTaskEdit from './PageTaskEdit';
import PageCyclopedia from './PageCyclopedia';
import PageTaskManage from './PageTaskManage';
import PageSwagger from './PageSwagger';
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
import { WebSiteAPIProvider } from './websites/WebSiteAPIProvider';
import { CyclopediaAPIProvider } from './CyclopediaAPIProvider';
import { HowtoAPIProvider } from './HowtoAPIProvider';
import { BreakingNewsAPIProvider } from './BreakingNewsAPIProvider';
import PageCyclopediaEdit from './PageCyclopediaEdit';

const TRACKING_ID = "G-FCGGY1NE36";
ReactGA.initialize(TRACKING_ID);

const PrivateRoutes = () => {
  const { loggedInUserEmail } = useUserContext();

  return (
    loggedInUserEmail ? <Outlet /> : <Navigate to='/login' />
  );
};

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
  const [searchPhrase, setSearchPhrase] = useState();
  const [checkForRecords, setCheckForRecords] = useState(true);

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
      .then((response) => {
        const searchPhraseValue = response.data[0].searchphrase;
        setSearchPhrase(searchPhraseValue);
        console.log('In <index.js> is jou searchPhraseValue:', searchPhraseValue);
      }).catch((e) => console.error(e));
  }, [checkForRecords]);

  console.log('In <index.js> is jou searchPhrase:', searchPhrase);

  return (
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
            <Route path='/peoplescorecard' element={<PagePeopleScorecard />} />
            <Route path='/taskmanage' element={<PageTaskManage />} />
            <Route path='/mycv' element={<PageMyCV />} />
          </Route>
          <Route path='/taskedit/:task_id' element={<PageTaskEdit />} />
          <Route path='/cyclopediaedit/:cyclopediaId' element={<PageCyclopediaEdit />} />
          <Route path='/howtoedit/:howto_id' element={<PageHowtoEdit />} />
          {searchPhrase && <Route path='/home' element={<PageHome searchPhrase={searchPhrase} />} />}
          {searchPhrase && <Route path='/login' element={<PageLogin searchPhrase={searchPhrase} />} />}
          <Route path='/swagger' element={<PageSwagger />} />
          {searchPhrase && <Route path='/' element={<PageLogin searchPhrase={searchPhrase} />} />}
          {searchPhrase && <Route path='*' element={<PageLogin searchPhrase={searchPhrase} />} />}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export const auth = getAuth(app);

ReactDOM.render(
  <React.StrictMode>
    <BreakingNewsAPIProvider>
      <HowtoAPIProvider>
        <CyclopediaAPIProvider>
          <WebSiteAPIProvider>
            <App />
          </WebSiteAPIProvider>
        </CyclopediaAPIProvider>
      </HowtoAPIProvider>
    </BreakingNewsAPIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;

