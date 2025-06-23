import { SiJsonwebtokens } from 'react-icons/si';
import { VscCopy } from "react-icons/vsc";
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

function BearerToken() {
  const [bearertoken, setBearertoken] = useState(null);

  const handleClick = async () => {
    try {
      const username = 'admin';
      const password = 'password';
      const credentials = btoa(`${username}:${password}`); // base64 encode

      const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/auth/token',
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


  const copyToClipboard = (bearertoken) => {
    const token = bearertoken?.BearerToken;
    if (!token) {
      toast.error("No token to copy");
      return;
    }

    navigator.clipboard.writeText(token).then(() => {
      toast.success("Bearer Token copied");
    }, (err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <td onClick={handleClick}>
      {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <div
        style={{
          marginLeft: '20px',
          display: 'inline-block',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '2px 2px',
          backgroundColor: '#f9f9f9',
          width: '990px',
          boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
          fontFamily: 'Segoe UI',
        }}
      >
      <SiJsonwebtokens title="Fetch a Bearer Token" style={{ color: '#4D4D4D', fontSize: '18px', cursor: 'pointer' }} />&nbsp;
      GET a Bearer Token:&nbsp;
      <span style={{ fontFamily: "Segoe UI", fontSize: "8pt", color: "#D5441C", fontStyle: "italic" }}>{bearertoken?.BearerToken} &nbsp;
        <VscCopy
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the td onClick
            copyToClipboard(bearertoken);
          }}
          size={18}
          style={{ color: '#4D4D4D', cursor: 'pointer' }}
        />
      </span>
      </div>
      <div>&nbsp;</div>
    </td>
  );
}

export default BearerToken;

