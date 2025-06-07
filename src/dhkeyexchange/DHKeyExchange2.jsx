import React, { useState, useEffect } from 'react';
import axios from 'axios'
import HowtoStep from '../howto/HowtoStep';
import GradientLineRusty from "../gradientlines/GradientLineRusty";
// import HowtoStepCreate from './HowtoStepCreate';
import '../Fonts.css'
// import HowtoUrlCreate from './HowtoUrlCreate';
import { BsPatchQuestion } from "react-icons/bs";
import DHStep1 from '../graphix/DH-PGLParameters.jpg'
import DHStep2 from '../graphix/DH-ParameterSpecObject.jpg'
import DHStep3 from '../graphix/DH-KeyPairServer.jpg'
import DHStep4 from '../graphix/DH-KeyPairClient.jpg'
import { TbHttpGet } from "react-icons/tb";
import { Tooltip } from '@mui/material';


function DHKeyExchange2({ howto_ids }) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [howtodata, setHowtoData] = useState([]);
  const [error, setError] = useState(null);
  const [dhparameters, setDhparameters] = useState([]);
  const [dhparameterspecobject, setDhparameterspecobject] = useState([]);
  const [dhkeypairserver, setDhkeypairserver] = useState([]);
  const [dhkeypairclient, setDhkeypairclient] = useState([]);

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
      console.log('In <DHKeyExchange2.jsx> is jou dhparameters:', dhparameters);
    } catch (error) {
            console.error('Error in DHParameters:', error);

    }
  };


    const generateDHParameterSpecObject = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/dhparameterspecobject/generate`);
      setDhparameterspecobject(response.data);
      console.log('In <DHKeyExchange2.jsx> is jou dhparameterspecobject:', dhparameterspecobject);
    } catch (error) {
      console.error('Error in DHParameterSpecObject:', error);

    }
  };


      const generateKeyPairServer = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/keypair/generate-server`);
      setDhkeypairserver(response.data);
      console.log('In <DHKeyExchange2.jsx> is jou dhkeypairserver:', dhkeypairserver);
    } catch (error) {
      console.error('Error in DHKeyPairServer:', error);

    }
  };

        const generateKeyPairClient = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/dh/keypair/generate-client`);
      setDhkeypairclient(response.data);
      console.log('In <DHKeyExchange2.jsx> is jou dhkeypairclient:', dhkeypairclient);
    } catch (error) {
      console.error('Error in DHKeyPairClient:', error);

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
                <div className='Font-Segoe-Medium-Howto-Desc'></div>
              </th>
            </tr>
          </thead>

          {howtodata.howto_steps && howtodata.howto_steps.map((step) => 

            (
            <tbody>&nbsp;
              {/* <tr>
                <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                  <div><u>Step-1</u>: Generate the DH Parameters P, G, L</div>
                  <div>
                    <Tooltip title='GET the P, G and L DHParameters' placement="top-end">
                      <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateDHParameters()}>
                        <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                      </button>
                    </Tooltip>
                  </div>
                  <img src={DHStep1} alt="Step 1" />
                  <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>P → Large Prime number used as a modulus: {dhparameters.primeModulus}</div>
                  <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>G → Generator (base) used for exponentiation: {dhparameters.generatorBase}</div>
                  <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>L → Length in Bits of the PrivateKey: {dhparameters.privateKeyBitLength}</div>
                </td>
              </tr>&nbsp; */}

              <tr>
                <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                  <div><u>Step-1</u>: Generate the DH Parameters <b>P, G, L</b></div>
                  <div>
                    <Tooltip title='GET the P, G and L DHParameters' placement="top-end">
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
                    <b>L → Length in Bits of the PrivateKey:</b>
                    <div>  {dhparameters.privateKeyBitLength}</div>
                  </div>
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
                    <img src={DHStep2} alt="Step 2" />
                  </td>
                </tr>
              }&nbsp;

              {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u>Step-3</u>: Generate the server-side DH KeyPair using the DHParameterSpec Object</div>
                    <div>
                      <Tooltip title='Create a Public/Private KeyPair for the server' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateKeyPairServer()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <img src={DHStep3} alt="Step 3" />
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>Server PublicKey: {dhkeypairserver.serverPublicKey}</div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>Server PrivateKey: {dhkeypairserver.serverPrivateKey}</div>
                  </td>
                </tr>
              }&nbsp;


                  {
                <tr>
                  <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>
                    <div><u><b>Step-4</b></u>: Generate the client-side DH KeyPair using the DHParameterSpec Object</div>
                    <div>
                      <Tooltip title='Create a Public/Private KeyPair for the client' placement="top-end">
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => generateKeyPairClient()}>
                          <TbHttpGet style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '40px' }} />
                        </button>
                      </Tooltip>
                    </div>
                    <img src={DHStep4} alt="Step 3" />
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>Client PublicKey: {dhkeypairclient.clientPublicKey}</div>
                    <div style={{ fontFamily: 'Segoe UI', fontSize: '9px' }}>Client PrivateKey: {dhkeypairclient.clientPrivateKey}</div>
                  </td>
                </tr>
                  }&nbsp;


                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-5: Generate the server-side SharedSecret through DH KeyAgreement
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                    </td>
                    </tr>
                  }&nbsp;


                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-6: Generate the client-side SharedSecret through DH KeyAgreement
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                    </td>
                    </tr>
                  }&nbsp;


                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-7: Generate the SHA-256 Digest of the SharedSecret
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                    </td>
                    </tr>
                  }&nbsp;


                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-8: Derive AES-128 Key from hashed SharedSecret
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
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