import React, { useState, useEffect } from 'react';
import axios from 'axios'
import HowtoStep from '../howto/HowtoStep';
import GradientLineRusty from "../gradientlines/GradientLineRusty";
// import HowtoStepCreate from './HowtoStepCreate';
import '../Fonts.css'
// import HowtoUrlCreate from './HowtoUrlCreate';
import { BsPatchQuestion } from "react-icons/bs";


function DHKeyExchange2({ howto_ids }) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [howtodata, setHowtoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/${howto_ids}`)
      .then((response) => {
        const howto = response.data;
        howto.howto_steps.sort((a, b) => a.step_number - b.step_number);
        setHowtoData(howto);
      }
      )
  }, [checkForRecords]);


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
                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-1: Generate the P, G, L DH Parameters
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                    </td>
                    </tr>
                  }&nbsp;

                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-2: Generate the DHParameterSpec object using the P, G, L DH Parameters
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                    </td>
                    </tr>
                  }&nbsp;


                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-3: Generate the server-side DH KeyPair using the DHParameterSpec Object
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
                    </td>
                    </tr>
                  }&nbsp;


                  {
                    <tr>
                    <td style={{ fontFamily: 'Segoe UI', fontSize: '18px', fontStyle: 'italic' }}>Step-4: Generate the client-side DH KeyPair using the DHParameterSpec Object
                    {/* {<HowtoStep key={step.step_id} howto_id={step.howto_id} step_id={step.step_id} step_number={step.step_number} step_name={step.step_name} step_url={step.step_url} step_obj={step.step_obj} step_image={step.step_image?.image_data} howtodata={howtodata} checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />} */}
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