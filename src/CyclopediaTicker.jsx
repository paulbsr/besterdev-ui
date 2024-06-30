import React from 'react';
import { Stack } from "@mui/material";
import { useCyclopediaApi } from './CyclopediaAPIProvider';

export default function CyclopediaTicker(props) {
  const { cyclopediarootdata, loading, error } = useCyclopediaApi(); // gebruik van die nuwe API Context :-)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Shuffle the data before filtering
  shuffleArray(cyclopediarootdata);

  const filteredCyclopediadata = cyclopediarootdata.filter(news => news.cyclopedia_ref === "CVCP");

  return (
    <>
      {filteredCyclopediadata.length > 0 ? (
        <marquee scrollamount="5">
          <Stack direction="row">
            {filteredCyclopediadata.map((news) => (
              <div className="ticker" key={news.cyclopedia_name}>
                <a href={news.cyclopedia_ref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#4D4D4D', textDecoration: 'none' }}>
                  <b>{news.cyclopedia_name}:</b> <i style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#4D4D4D', textDecoration: 'none' }}>{news.cyclopedia_desc}</i>
                </a>
              </div>
            ))}
          </Stack>
        </marquee>
      ) : (
        <div style={{ paddingTop: 8 }}></div>
      )}
    </>
  );
}
