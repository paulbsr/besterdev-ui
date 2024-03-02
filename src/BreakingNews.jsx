import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticker from 'react-ticker';
import {Stack} from "@mui/material";

export default function BreakingNews() {
  const [breakingNewsData, setBreakingNewsData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formattedDate = yesterday.toISOString().split('T')[0]; // Convert to YYYY-MM-DD

    axios
    //sien https://newsapi.org/docs/endpoints/everything
    //   .get(`https://newsapi.org/v2/everything?domains=wired.com,siliconrepublic.com&from=${formattedDate}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`)
      .get(`https://newsapi.org/v2/everything?q=cyber&from=${formattedDate}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`)
      .then((response) => {
        const newsData = response.data.articles; // Accessing the articles data from the response
        console.log(newsData);
        setBreakingNewsData(newsData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


    return (
    <>
        {breakingNewsData.length > 0 ? <marquee>

            <Stack direction="row">

                {breakingNewsData.map((news) => (
                    <div className="ticker">
                        <a href={news.url} target="_blank" rel="noopener noreferrer" style={{color: '#336791', textDecoration: 'none'}}>{news.source.name}: <i style={{color: '#D5441C', textDecoration: 'none'}}>{news.title}</i></a>
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
