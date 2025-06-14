import { SiJsonwebtokens } from 'react-icons/si';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function BearerToken() {
  const [bearertoken, setBearertoken] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/auth/token?username=admin&password=password`);
      setBearertoken(response.data);
      console.log("Bearer Token received:", bearertoken);
    } catch (error) {
      console.error('Bearer Token error:', error);

    }
  };


  return (
    <td className='Font-Verdana-Small-Postgres' onClick={handleClick}>
      &nbsp;&nbsp;
      <SiJsonwebtokens
        title="Fetch a Bearer Token"
        style={{ color: '#4D4D4D', fontSize: '18px', cursor: 'pointer' }}
      />  Bearer Token <div>{bearertoken.BearerToken}</div>
    </td>
  );
}

export default BearerToken;

