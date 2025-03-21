import { useState, useEffect, React } from 'react'
import { Stack } from "@mui/material";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { useCyclopediaApi } from './CyclopediaAPIProvider';


export default function CyclopediaTicker(props) {
  const [ twentyRandomRecords, setTwentyRandomRecords] = useState([]);
  const navigate = useNavigate();
  // const { cyclopediarootdata, loading, error } = useCyclopediaApi(); // gebruik van die nuwe API Context :-)
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;


  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // };

    useEffect(() => {
      // axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks')
        axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/random40')
        // axios('http://localhost:8000/api/v1/cyclopedia/random20')
        .then((response) => {
          const twentyRandomRecordsAPI = response.data;
          setTwentyRandomRecords(twentyRandomRecordsAPI);
        })
        .catch((e) => console.error(e));
      }, [props.checkForRecords]);

  // Shuffle the data before filtering
  // shuffleArray(cyclopediarootdata);

  // const filteredCyclopediadata = cyclopediarootdata.filter(ticker => ticker.cyclopediaRef === "CVCP");
  // const filteredCyclopediadata = cyclopediarootdata;
  const filteredCyclopediadata = twentyRandomRecords;


  return (
    <>
      {filteredCyclopediadata.length > 0 ? (
        <marquee scrollamount="5">
          <Stack direction="row">
            {filteredCyclopediadata.map((ticker) => (
              <div className="ticker" key={ticker.cyclopediaName}>
                {/* <a href={ticker.cyclopediaRef} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#4D4D4D', textDecoration: 'none' }}> */}
                <a onClick={() => navigate(`/cyclopediaedit/${ticker.cyclopediaId}`)} style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791', textDecoration: 'none', cursor: 'pointer' }}>
                {/* <i>{ticker.cyclopediaName}</i> */}
                  {/* <a href={`/cyclopediaedit/${ticker.cyclopediaId}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791', textDecoration: 'none' }}> */}
                  <i>{ticker.cyclopediaName}</i>
                  </a>
                {/* </a> */}
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
