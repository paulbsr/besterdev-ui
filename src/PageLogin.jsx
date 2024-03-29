import React, { useState } from 'react';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; 
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import firebase from 'firebase/compat/app';
import spacer from './graphix/besterdev_spacer_white.png';
import { Flip, ToastContainer, toast, Zoom } from 'react-toastify';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import './Fonts.css';
import Footer from './Footer';
import ToastComponent from './ToastComponent';
import BreakingNewsAPI from './BreakingNewsAPI';
import Quicklinks3 from './Quicklinks3';



const PageLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedInUserEmail } = useUserContext();
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [searchPhrase, setSearchPhrase] = useState(props.searchPhrase);
  const navigate = useNavigate();
  

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUserEmail(user.email);
        setLoginSuccessMessage('Login successful!');
        navigate('/home'); 
      })
      .catch((error) => {
        setLoginSuccessMessage('Auth failed.');
        toast.error('Unsuccessful Auth attempt');
        navigate('/login');
      });
  };
  


  return (
    <>
      {/* <BreakingNewsAPI searchPhrase={searchPhrase} /> */}
      {/* <BreakingNewsAPI searchPhrase={searchPhrase}/>  */}
      <BannerWhite />
      <GradientLine />
      {/* <Quicklinks3 searchPhrase={searchPhrase}/> */}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Username:&nbsp;<input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Password:&nbsp;  <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>&nbsp;</div>
      {/* <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Breaking News:&nbsp;  <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="text" value={searchPhrase} onChange={(e) => setSearchPhrase(e.target.value)} />
      <div>&nbsp;</div> */}
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;<button style={{marginLeft: '10px', height: '37.5px', width: '100px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#336791', cursor: 'pointer'}} onClick={handleLogin}><b>Login</b></button>
      {loginSuccessMessage && <ToastComponent />}
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <Footer/>
    </>
  );
};

export default PageLogin;
