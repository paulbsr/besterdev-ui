import { useState, useEffect, React } from 'react'
import { Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function CyclopediaTicker(props) {
  const [ fourtyRandomRecords, setFourtyRandomRecords] = useState([]);
  const navigate = useNavigate();


    useEffect(() => {
        OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/random40',
          {
            caller: 'CyclopediaTicker'
          }
        )
        .then((response) => {
          const fourtyRandomRecordsAPI = response.data;
          setFourtyRandomRecords(fourtyRandomRecordsAPI);
        })
        .catch((e) => console.error(e));
    }, []);



  return (
    <>
      {fourtyRandomRecords.length > 0 ? (
        <marquee scrollamount="5">
          <Stack direction="row">
            {fourtyRandomRecords.map((ticker) => (
              <div className="ticker" key={ticker.cyclopediaId}>
                <a onClick={() => navigate(`/cyclopediaedit/${ticker.cyclopediaId}`)} style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791', textDecoration: 'none', cursor: 'pointer' }}>
                  <i>{ticker.cyclopediaName}</i>
                  </a>
              </div>
            ))}
          </Stack>
        </marquee>
      ) 
      : 
      (
        <div style={{ paddingTop: 8 }}></div>
      )
      }
    </>
  );
}
