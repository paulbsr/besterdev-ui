import React, { useState } from 'react';
import FrontPage from './FrontPage';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import RecordCandidate from './CandidateAPI';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import { Tooltip } from 'react-tooltip'


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the username and password are correct
    if (username === 'admin' && password === 'dr0l') {
      setIsLoggedIn(true);
    } else {
      alert('FO!');
    }
  };

  return (
    
    <div>
    <Tooltip id="edit" />
    <Tooltip id="commit" />
    <Tooltip id="revert" />
    <Tooltip id="purge" />
    
    <BannerWhite/> 
    <GradientLine/> 
    <BannerLight/> 
    <GradientLineThin/> 
    <Quicklinks/>
      {/* {isLoggedIn ? (<FrontPage/>)  */}
            {isLoggedIn ? (<RecordCandidate/>) 
      : 
      (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
        </form>
      )}
     </div>
  );
};

export default LoginForm;