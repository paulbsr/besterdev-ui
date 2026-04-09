import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageDutchLanguageBook from './pages/PageDutchLanguageBook';
import { RefreshProvider } from "./dutchlanguage/RefreshContext";
import OAuth2APIClient from './oauth2/OAuth2APIClient';
import { Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Buffer } from 'buffer';

// Providers
import { BreakingNewsAPIProvider } from './breakingnews/BreakingNewsApiContext';  // <--Nuwe een Mar'26
import { CyclopediaAPIProvider } from './cyclopedia/CyclopediaAPIProvider';
import { WebSiteAPIProvider } from './websites/WebSiteAPIProvider';
import { HowtoAPIProvider } from './howto/HowtoAPIProvider';

// Pages
import PagePeopleScorecard from './pages/PagePeopleScorecard';
import PageCyclopediaEdit from './pages/PageCyclopediaEdit';
import PageDutchLanguage from './pages/PageDutchLanguage';
import PageDHKeyExchange from './pages/PageDHKeyExchange';
import PageHowtoManage from './pages/PageHowtoManage';
import PageCyclopedia from './pages/PageCyclopedia';
import PageTaskManage from './pages/PageTaskManage';
import PageHowtoEdit from './pages/PageHowtoEdit';
import PageResources from './pages/PageResources';
import PageTaskEdit from './pages/PageTaskEdit';
import PageSwagger from './pages/PageSwagger';
import PageManage from './pages/PageManage';
import PageSearch from './pages/PageSearch';
import PageHome from './pages/PageHome';
import PageMyCV from './pages/PageMyCV';

// Firebase
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Styles
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import './Fonts.css';


// --- Firebase Configuration ---
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
export const auth = getAuth(app);

// --- Main App Component ---
const App = () => {
  const [searchPhrase, setSearchPhrase] = useState(null);
  const username = 'besterdev-ui';
  const password = 'TZXWF498UR5PGQLH6E3CMBDNSYJAKV72';
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

  useEffect(() => {
    let mounted = true;

    const fetcSearchphrase = async () => {
      try {
        const response = await OAuth2APIClient.get('/api/v1/searchphrase');
        const phrase = response.data?.[0]?.searchphrase || "";

        if (mounted) {
          setSearchPhrase(phrase);
          console.log('<Index.js> Search phrase:', phrase);
        }
      } catch (error) {
        console.error('<Index.js> Error loading search phrase:', error);
      } 
    };

    fetcSearchphrase();

    return () => {
      mounted = false;
    };
  }, []);

  console.log('✅ In <Index.js> is OAuth2.0 BearerToken from local mint:', basicAuth);
  console.log('✅ In <Index.js> is NewsAPI searchPhrase:', searchPhrase);

  // --- Routes ---
  return (
    <RefreshProvider>
      <Router>
        <Routes>
          {/* Default landing page */}
          <Route path="/" element={<Navigate to="/dutchlanguage" replace />} />

          {/* Dutch Language page */}
          <Route path="/dutchlanguage" element={<PageDutchLanguage />} />
          <Route path="/dutchlanguagebook" element={<PageDutchLanguageBook />} />

          {/* Real home page */}
          <Route path="/home" element={<PageHome searchPhrase={searchPhrase} />} />

          {/* Search pages */}
          <Route path="/search" element={<PageSearch />} />
          <Route path="/screen" element={<PageSearch />} />
          <Route path="/hunt" element={<PageSearch />} />

          {/* Management pages */}
          <Route path="/candidatemanage" element={<PageManage />} />
          <Route path="/howtomanage" element={<PageHowtoManage />} />
          <Route path="/cyclopediamanage" element={<PageCyclopedia />} />
          <Route path="/webresourcemanage" element={<PageResources />} />
          <Route path="/peoplescorecard" element={<PagePeopleScorecard />} />
          <Route path="/taskmanage" element={<PageTaskManage />} />

          {/* Editors */}
          <Route path="/taskedit/:task_id" element={<PageTaskEdit />} />
          <Route path="/cyclopediaedit/:cyclopediaId" element={<PageCyclopediaEdit />} />
          <Route path="/howtoedit/:howto_id" element={<PageHowtoEdit />} />

          {/* Misc pages */}
          <Route path="/mycv" element={<PageMyCV />} />
          <Route path="/dhkeyexchange" element={<PageDHKeyExchange />} />
          <Route path="/swagger" element={<PageSwagger />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/dutchlanguage" replace />} />
        </Routes>
      </Router>
    </RefreshProvider>
  );
};

// --- Render App ---
ReactDOM.render(
  <React.StrictMode>
    <HowtoAPIProvider>
      <CyclopediaAPIProvider>
        <WebSiteAPIProvider>
          <BreakingNewsAPIProvider>
            <App />
          </BreakingNewsAPIProvider>
        </WebSiteAPIProvider>
      </CyclopediaAPIProvider>
    </HowtoAPIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
