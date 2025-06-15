import spacer from '../graphix/besterdev_spacer_white.png';
import { SiJsonwebtokens } from 'react-icons/si';
import React, { useState } from 'react';
import axios from 'axios';

function BearerToken() {
  const [bearertoken, setBearertoken] = useState(null);

  const handleClick = async () => {
    try {
      const username = 'admin';
      const password = 'password';
      const credentials = btoa(`${username}:${password}`); // base64 encode

      const response = await axios.get(
        'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/auth/token',
        // 'http://localhost:8000/api/v1/auth/token',
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      setBearertoken(response.data);
      console.log('Bearer Token received:', response.data);
    } catch (error) {
      console.error('Bearer Token error:', error);
    }
  };

  return (
    <td onClick={handleClick}>
      <div>&nbsp;</div>
      <img alt="spacer" src={spacer} />
      <SiJsonwebtokens title="Fetch a Bearer Token" style={{ color: '#4D4D4D', fontSize: '18px', cursor: 'pointer' }} />&nbsp;
      GET a Bearer Token: &nbsp;
      <span style={{ fontFamily: "Verdana", fontSize: "10pt", color: "#D5441C", fontStyle: "italic" }}>{bearertoken?.BearerToken}</span>
    </td>
  );
}

export default BearerToken;

