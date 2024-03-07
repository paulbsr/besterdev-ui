import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";

export default function CyclopediaTicker(props) {
  const [cyclopediadata, setCyclopediadata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia`);
        const cyclopediaDB = response.data;
        shuffleArray(cyclopediaDB);
        setCyclopediadata(cyclopediaDB);
      } catch (error) {
        console.error('Error fetching Cyclopedia Data:', error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };


  return (
    <>
      {cyclopediadata.length > 0 ? <marquee scrollamount="10">

        <Stack direction="row">

          {cyclopediadata.map((news) => (
            <div className="ticker">
               <a href={news.cyclopedia_ref} target="_blank" rel="noopener noreferrer" style={{ color: '#C0C0C0', textDecoration: 'none' }}><b>{news.cyclopedia_name}:</b> <i style={{ color: '#C0C0C0', textDecoration: 'none' }}>{news.cyclopedia_desc}</i></a>
            </div>
          )
          )
          }

        </Stack>

      </marquee> : <div style={{ paddingTop: 8 }}></div>}
    </>
  )
    ;
}
