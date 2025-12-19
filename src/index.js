import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';

// Providers
import { BreakingNewsAPIProvider } from './breakingnews/BreakingNewsAPIProvider';
import { CyclopediaAPIProvider } from './cyclopedia/CyclopediaAPIProvider';
import { WebSiteAPIProvider } from './websites/WebSiteAPIProvider';
import { HowtoAPIProvider } from './howto/HowtoAPIProvider';

// Pages
import PagePeopleScorecard from './pages/PagePeopleScorecard';
import PageCyclopediaEdit from './pages/PageCyclopediaEdit';
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
import PageDutchLanguage from './pages/PageDutchLanguage';

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Styles
import 'react-tooltip/dist/react-tooltip.css';
import './index.css';
import './Fonts.css';

import { RefreshProvider } from "./dutchlanguage/RefreshContext";
import { Navigate } from "react-router-dom";
import PageDutchLanguageBook from './pages/PageDutchLanguageBook';

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
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(0); // 9-second countdown
  const username = 'besterdev-ui';
  const password = 'TZXWF498UR5PGQLH6E3CMBDNSYJAKV72';
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

  useEffect(() => {
    let mounted = true;
    let countdownTimer;

    const fetchData = async () => {
      try {
        const response = await axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase');
        const phrase = response.data?.[0]?.searchphrase || "";
        if (mounted) {
          setSearchPhrase(phrase);
          console.log('✅ Search phrase loaded:', phrase);
        }
      } catch (error) {
        console.error('❌ Error loading search phrase:', error);
      } finally {
        // Start countdown timer
        countdownTimer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownTimer);
              if (mounted) setLoading(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    fetchData();

    return () => {
      mounted = false;
      clearInterval(countdownTimer);
    };
  }, []);

  // --- Loading Screen ---
  if (loading || !searchPhrase) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          color: '#444',
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Pre-loading tons of useful data, doesn't take long …
        </div>
        <div
          style={{
            width: '60px',
            height: '60px',
            border: '5px solid #ddd',
            borderTop: '5px solid #333',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem',
          }}
        />
        <div style={{ fontSize: '1.1rem', color: '#666' }}>
          BesterDev will render in {countdown} second{countdown !== 1 ? 's' : ''}
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  console.log('BasicAuth:', basicAuth);
  console.log('searchPhrase:', searchPhrase);

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
