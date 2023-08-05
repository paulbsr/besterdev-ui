import React, { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import spacer from './graphix/besterdev_spacer_white.png'
import BannerLight from './BannerLight';
import Footer from './Footer';
import './Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
// import BannerWhite from './BannerWhite';
// import GradientLine from './GradientLine';
// import BannerLight from './BannerLight';
// import GradientLineThin from './GradientLineThin';
// import Quicklinks from './Quicklinks';
// import CandidateAPI from './CandidateAPI';
// import 'react-toastify/dist/ReactToastify.css';
// import { Flip, ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const PageLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUserEmail(user.email);
        // Handle successful login here
        console.log(loggedInUserEmail)
      })
      .catch((error) => {
        // Handle login error here
      });
  };


  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks user={loggedInUserEmail}/>
      <GradientLineThin />
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Username: <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Password: <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;<button style={{marginLeft: '10px', height: '37.5px', width: '100px', border: '1px solid #1994AD', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#1994AD', cursor: 'pointer'}} onClick={handleLogin}>Login</button>
      <Footer/>
    </div>
  );
};

export default PageLogin;
