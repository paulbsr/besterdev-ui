import React, { useState } from 'react';
import { useUserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom'; 
import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import Quicklinks from '../quicks/Quicklinks';
import firebase from 'firebase/compat/app';
import Footer from '../Footer';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'react-toastify/dist/ReactToastify.css';
import '../Fonts.css';



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
