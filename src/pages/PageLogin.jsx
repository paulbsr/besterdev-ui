import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import firebase from 'firebase/compat/app';
import spacer from '../graphix/besterdev_spacer_white.png';
import { Flip, ToastContainer, toast, Zoom } from 'react-toastify';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import '../Fonts.css';
import Footer from '../Footer';
import ToastComponent from '../ToastComponent';
import axios from 'axios';
import LinearDeterminate from '../LinearProgressBar';
import { LinearProgress } from '@mui/material';

const PageLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedInUserEmail } = useUserContext();
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [searchPhrase, setSearchPhrase] = useState(props.searchPhrase);
  const [newSearchPhrase, setNewSearchPhrase] = useState(props.searchPhrase);
  const [showLoginButton, setShowLoginButton] = useState(false); // New state for button visibility
  const navigate = useNavigate();

  useEffect(() => {
    setSearchPhrase(props.searchPhrase);
  }, [props.searchPhrase]);

  // Set a 5-second delay before showing the login button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginButton(true);
    }, 5); // 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUserEmail(user.email);
        setLoginSuccessMessage('Login successful!');
        handleSearchPhraseUpdate();
        navigate('/home');
      })
      .catch((error) => {
        setLoginSuccessMessage('Auth failed.');
        toast.error('Unsuccessful Auth attempt');
        navigate('/login');
      });
  };

  const handleSearchPhraseUpdate = async () => {
    const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase/update?newValue=${newSearchPhrase}`);
  };

  return (
    <>
      <BannerWhite />
      <GradientLine />
      {/* <LinearDeterminate /> */}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Username:
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp;
      <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Password:
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp;
      <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Breaking News:
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp;
      <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="text" value={newSearchPhrase} onChange={(e) => setNewSearchPhrase(e.target.value)} />
      <div>&nbsp;</div>
      {/* <LinearDeterminate /> */}
      <div>&nbsp;</div>
      {showLoginButton && (
        <><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><button style={{ marginLeft: '10px', height: '37.5px', width: '100px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#336791', cursor: 'pointer' }} onClick={handleLogin}>
          <b>Login</b>
        </button></>
      )}
      {loginSuccessMessage && <ToastComponent />}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <Footer />
    </>
  );
};

export default PageLogin;
