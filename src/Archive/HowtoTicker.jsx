import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";

export default function HowtoTicker(props) {
  const [howtodata, setHowtodata] = useState(props.howtodataticker);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //       const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos`);
  //       const howtos = response.data;
  //       shuffleArray(howtos);
  //       setHowtodata(howtos);
  //     } catch (error) {
  //       console.error('Error fetching Cyclopedia Data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


  return (
    <>
      {howtodata.length > 0 ? 
      <marquee scrollamount="6" >

        {/* <Stack direction="row"> */}

          {howtodata.map((howto) => (
            // <div className="ticker">
               <a href={`/howtoedit/${howto.howto_id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#336791', textDecoration: 'none' }}><>{howto.howto_name}:</> 
               {/* <i style={{ color: '#336791', textDecoration: 'none' }}>{howto.howto_desc}</i> */}
               </a>
            // </div>
          )
          )
          }

        {/* </Stack> */}

      </marquee> 
      : 
      <div style={{ paddingTop: 8 }}></div>}
    </>
  )
    ;
}
