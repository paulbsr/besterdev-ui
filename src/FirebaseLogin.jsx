import React, { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import 'firebase/auth'; // Import the specific service you need (in this case, authentication)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import spacer from './graphix/besterdev_spacer_white.png'


const firebaseConfig = {
  apiKey: 'AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA',
  authDomain: 'besterdev-432e9.firebaseapp.com',
  projectId: 'besterdev-432e9',
  // Add other Firebase configuration properties here...
};

firebase.initializeApp(firebaseConfig);


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Handle successful login here
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
      <Quicklinks />
      <GradientLineThin />
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>

      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Username: <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;Password: <input className='Font-Verdana-Medium' style={{ height: '37.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>&nbsp;</div>
      <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />&nbsp; &nbsp;<button style={{marginLeft: '10px', height: '37.5px', width: '100px', border: '1px solid #1994AD', borderRadius: '5px', backgroundColor: '#f7f4f3', color: '#1994AD', cursor: 'pointer'}} onClick={handleLogin}>Login</button>
                          
    </div>
  );
};

export default Login;
