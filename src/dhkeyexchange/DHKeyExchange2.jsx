import React, { useState, useEffect } from 'react';
import { TbHttpGet } from "react-icons/tb"
import { Tooltip } from '@mui/material'
import { BsPatchQuestion } from "react-icons/bs"
import axios from 'axios'
import '../Fonts.css'
import GradientLineRusty from "../gradientlines/GradientLineRusty";
import DHStep1 from '../graphix/DH-PGLParameters.jpg'
import DHStep2 from '../graphix/DH-ParameterSpecObject.jpg'
import DHStep3 from '../graphix/DH-KeyPairServer.jpg'
import DHStep4 from '../graphix/DH-KeyPairClient.jpg'
import DHStep5 from '../graphix/DH-ServerSharedSecret.jpg'
import DHStep6 from '../graphix/DH-ClientSharedSecret.jpg'
import DHStep7 from '../graphix/DH-SHA256Digest.jpg'
import DHStep8 from '../graphix/DH-AESSecretKey.jpg'
import DHImage from '../graphix/dh2.jpg'


function DHKeyExchange2({ howto_ids }) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [howtodata, setHowtoData] = useState([]);
  const [error, setError] = useState(null);
  const [dhparameters, setDhparameters] = useState([]);
  const [dhparameterspecobject, setDhparameterspecobject] = useState([]);
  const [dhkeypairserver, setDhkeypairserver] = useState([]);
  const [dhkeypairclient, setDhkeypairclient] = useState([]);
  const [dhsharedsecretserver, setDhsharedsecretserver] = useState([]);
  const [dhsharedsecretclient, setDhsharedsecretclient] = useState([]);
  const [dhsharedsecrethash, setDhsharedsecrethash] = useState([]);
  const [aessecretkey, setAessecretkey] = useState([]);

  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/${howto_ids}`)
      .then((response) => {
        const howto = response.data;
        howto.howto_steps.sort((a, b) => a.step_number - b.step_number);
        setHowtoData(howto);
      }
      )
  }, [checkForRecords]);


  const generateDHParameters = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/parameters/generate`);
      setDhparameters(response.data);
    } catch (error) {
      console.error('Error in DHParameters:', error);

    }
  };

  const generateDHParameterSpecObject = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/dhparameterspecobject/generate`);
      setDhparameterspecobject(response.data);
    } catch (error) {
      console.error('Error in DH ParameterSpecObject:', error);

    }
  };

  const generateKeyPairServer = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/keypair/generate-server`);
      setDhkeypairserver(response.data);
    } catch (error) {
      console.error('Error in DH KeyPair Server:', error);

    }
  };

  const generateKeyPairClient = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/keypair/generate-client`);
      setDhkeypairclient(response.data);
    } catch (error) {
      console.error('Error in DH KeyPair Client:', error);

    }
  };

  const generateSharedSecretServer = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/sharedsecret/generate-server`);
      setDhsharedsecretserver(response.data);
    } catch (error) {
      console.error('Error in DH SharedSecret Server:', error);

    }
  };

  const generateSharedSecretClient = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/sharedsecret/generate-client`);
      setDhsharedsecretclient(response.data);
    } catch (error) {
      console.error('Error in DH SharedSecret Client:', error);

    }
  };

    const generateSharedSecretHash = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/sharedsecret/generate-hash`);
      setDhsharedsecrethash(response.data);
    } catch (error) {
      console.error('Error in DH SharedSecret Hash:', error);

    }
  };

  const generateAESSecretKey = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/aessecretkey/generate`);
      setAessecretkey(response.data);
    } catch (error) {
      console.error('Error in AES SecretKey:', error);

    }
  };


  if (error) return <p>An error in HowtoStepAccordion occurred</p>

  return (
    <div>
      <div>
        <table className="Table4" style={{ width: '1350px' }}>
          <thead>
            <tr >
              <th><BsPatchQuestion style={{ color: '#D5441C', fontSize: '32px' }} />&nbsp;
                Diffie-Hellman Key Exhange in Practice
                <div></div>
                <div><img src={DHImage} /></div>
                <div className='Font-Segoe-Medium-Howto-Desc'></div>
              </th>
            </tr>
          </thead>

          {howtodata.howto_steps && howtodata.howto_steps.map((step) =>

          (
            <tbody>&nbsp;
              <tr>
                <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                  <div><u>Step-1</u>: Generate the DH Parameters <b>P, G, L values</b></div>
                  <div>
                    <Tooltip title='Produce the Parameters P, G and L ' placement="top-end">
                      <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateDHParameters()}>
                        <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                      </button>
                    </Tooltip>
                  </div>

                  <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                    <b>P → Large Prime number used as a modulus:</b>  {dhparameters.primeModulus}
                  </div>
                  <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                    <b>G → Generator (base) used for exponentiation:</b>  {dhparameters.generatorBase}
                  </div>
                  <div style={{ fontFamily: 'Segoe UI', fontSize: '14px' }}>
                    <b>L → Length in Bits of the PrivateKey:</b>  {dhparameters.privateKeyBitLength}
                  </div>
                  <div>&nbsp;</div>
                  <img src={DHStep1} alt="Step 1" />
                </td>
              </tr>&nbsp;



              {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-2</u>: Generate object of type <b>DHParameterSpec</b></div>
                    <div>
                      <Tooltip title='Create object of type DHParameterSpec' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateDHParameterSpecObject()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                      <b>DHParameterSpec Object:</b> {dhparameterspecobject.dhSpecobject}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep2} alt="Step 2" />
                  </td>
                </tr>
              }&nbsp;

              {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-3</u>: Generate the <b>server-side DH KeyPair</b> using the DHParameterSpec Object</div>
                    <div>
                      <Tooltip title='Create a Public/Private KeyPair for the server' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateKeyPairServer()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Server PublicKey:</b> {dhkeypairserver.serverPublicKey}</div>
                    <div>&nbsp;</div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Server PrivateKey:</b> {dhkeypairserver.serverPrivateKey}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep3} alt="Step 3" />
                  </td>
                </tr>
              }&nbsp;


              {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-4</u>: Generate the <b>client-side DH KeyPair</b> using the DHParameterSpec Object</div>
                    <div>
                      <Tooltip title='Create a Public/Private KeyPair for the client' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateKeyPairClient()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Client PublicKey:</b> {dhkeypairclient.clientPublicKey}</div>
                    <div>&nbsp;</div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Client PrivateKey:</b> {dhkeypairclient.clientPrivateKey}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep4} alt="Step 4" />
                  </td>
                </tr>
              }&nbsp;


              {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-5</u>: Generate the <b>server-side SharedSecret</b> through KeyAgreement</div>
                    <div>
                      <Tooltip title='Create a server-side SharedSecret' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateSharedSecretServer()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Server's SharedSecret:</b> {dhsharedsecretserver.serverSharedSecret}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep5} alt="Step 5" />
                  </td>
                </tr>
              }&nbsp;


              {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-6</u>: Generate the <b>client-side SharedSecret</b> through KeyAgreement</div>
                    <div>
                      <Tooltip title='Create a client-side SharedSecret' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateSharedSecretClient()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Client's SharedSecret:</b> {dhsharedsecretclient.clientSharedSecret}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep6} alt="Step 6" />
                  </td>
                </tr>
              }&nbsp;


              {
                 <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-7</u>: Generate the <b>SHA-256 Digest</b> of the SharedSecret</div>
                    <div>
                      <Tooltip title='Create a Hash of the SharedSecret' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateSharedSecretHash()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>Hashed SharedSecret:</b> {dhsharedsecrethash.sha256Digest}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep7} alt="Step 7" />
                  </td>
                </tr>
              }&nbsp;

              {
                 <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-8</u>: Derive an <b>AES-128 SecretKey</b> from the hashed SharedSecret</div>
                    <div>
                      <Tooltip title='Create a Hash of the SharedSecret' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateAESSecretKey()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '14px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}><b>AES-128 SecretKey:</b> {aessecretkey.aesKey}</div>
                    <div>&nbsp;</div>
                    <img src={DHStep8} alt="Step 8" />
                  </td>
                </tr>
              }&nbsp;

            </tbody>
          )
          )
          }
        </table>
      </div>
      <div>&nbsp;</div>
      <GradientLineRusty />
    </div>
  );
}
export default DHKeyExchange2;