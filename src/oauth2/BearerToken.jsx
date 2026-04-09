import { VscCopy } from "react-icons/vsc";
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

function BearerToken() {
  const [vendorToken, setVendorToken] = useState(null);
  const [auth0Token, setAuth0Token] = useState(null);

  const handleVendorClick = async () => {
    try {
      const username = 'admin';
      const password = 'password';
      const credentials = btoa(`${username}:${password}`);

      const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/auth/token',
        {
          headers: { Authorization: `Basic ${credentials}`, },
        }
      );

      setVendorToken(response.data);
      console.log('Local Vendor BearerToken:', response.data);
    } catch (error) {
      console.error('Local Vendor BearerToken error:', error);
    }
  };

  const handleAuth0Click = async () => {
    try {
      const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/auth0/token');

      setAuth0Token({ BearerToken: response.data.access_token });
      console.log('Auth0 BearerToken:', response.data);
    } catch (error) {
      console.error('Auth0 Token error:', error);
    }
  };

  const copyToClipboard = (tokenObj) => {
    const token = tokenObj?.BearerToken;
    if (!token) {
      toast.error("No token to copy");
      return;
    }

    navigator.clipboard.writeText(token).then(() => {
      toast.success("Bearer Token copied");
    });
  };

  const boxStyle = {
    marginLeft: "10px",
    marginRight: "10px",
    display: "inline-block",
    borderRadius: "6px",
    padding: "4px 8px",
    backgroundColor: "#FFFFFF",
    fontFamily: "Segoe UI",
    fontSize: "12pt",
    color: "#336791",
    whiteSpace: "normal",
    overflowWrap: "break-word",
    boxSizing: "border-box",
    cursor: "pointer",
    marginBottom: "6px"
  };


  const tokenStyle = {
    fontFamily: "Segoe UI",
    fontSize: "8pt",
    color: "#D5441C",
    fontStyle: "italic",
    marginLeft: "4px",
    maxWidth: "100%",
    wordBreak: "break-all",
    whiteSpace: "normal"
  };

  return (
    <div>

      {/* Vendor Token */}
      <div onClick={handleVendorClick} style={boxStyle}>
        GET Bearer Token from local Vendor:
        <VscCopy
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(vendorToken);
          }}
          size={18}
          style={{ color: '#4D4D4D', cursor: 'pointer', marginLeft: "4px" }}
        />
        <span style={tokenStyle}>{vendorToken?.BearerToken}</span>
      </div>

      {/* Auth0 Token */}
      <div onClick={handleAuth0Click} style={boxStyle}>
        GET Bearer Token from Auth0:
        <VscCopy
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(auth0Token);
          }}
          size={18}
          style={{ color: '#4D4D4D', cursor: 'pointer', marginLeft: "4px" }}
        />
        <span style={tokenStyle}>{auth0Token?.BearerToken}</span>
      </div>
    </div>
  );
}

export default BearerToken;