import React, { useState } from 'react';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom'; 
import { Flip, toast, ToastContainer } from 'react-toastify';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import firebase from 'firebase/compat/app';
import Footer from './Footer';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import './Fonts.css';



const PageLogout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedInUserEmail } = useUserContext();
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout =() => {
    firebase.auth().signOut();
    }
  
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
      <Footer/>
    </div>
  );
};

export default PageLogout;
