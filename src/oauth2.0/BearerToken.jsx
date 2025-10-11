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
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <div
        style={{
          marginLeft: "50px",
          minHeight: "28.5px",
          display: "inline-block",
          border: "1px solid #336791",
          borderRadius: "4px",
          padding: "4px 8px",
          backgroundColor: "#FFFFFF",
          width: "900px",
          fontFamily: "Segoe UI",
          color: "#336791",
          whiteSpace: "normal",        // allows text to wrap to a new line
          overflowWrap: "break-word",  // breaks long words if necessary
          boxSizing: "border-box",     // includes padding in width calc
        }}
      >

        {/* <SiJsonwebtokens title="Fetch a Bearer Token" style={{ color: '#4D4D4D', fontSize: '18px', cursor: 'pointer' }} />&nbsp; */}
        GET Bearer Token:  
                  <VscCopy
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering the td onClick
              copyToClipboard(bearertoken);
            }}
            size={18}
            style={{ color: '#4D4D4D', cursor: 'pointer', marginLeft: "3px" }}
          />
        <div>
        <span style={{ fontFamily: "Segoe UI", fontSize: "12pt", color: "#D5441C", fontStyle: "italic", marginLeft: "1px" }}>{bearertoken?.BearerToken} &nbsp;

        </span>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
  );
}

export default BearerToken;

