import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Stack} from "@mui/material";

export default function BreakingNews() {
  const [breakingNewsDataDB, setBreakingNewsDataDB] = useState([]);
  const [breakingNewsDataAPI, setBreakingNewsDataAPI] = useState([]);

  useEffect(() => {
    const today = new Date();
    const onedays = new Date(today);
    onedays.setDate(today.getDate() - 1);
    const dayOne = onedays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
    const twodays = new Date(today);
    twodays.setDate(today.getDate() - 2);
    const dayTwo = twodays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD

    //sien https://newsapi.org/docs/endpoints/everything
     axios.get(`https://newsapi.org/v2/everything?q=cyber&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`)

    
      .then((response) => {
        const newsDataAPI = response.data.articles; // Accessing the articles data from the response
        setBreakingNewsDataAPI(newsDataAPI);
      })
      .catch((error) => {
        console.error('Error fetching breakingNewsData:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Hierdie is die GET vanaf NewsAPI:', breakingNewsDataAPI); // Now you can safely log it here
  }, [breakingNewsDataAPI]); // Log whenever breakingNewsDataAPI changes


  useEffect(() => {
    const postData = breakingNewsDataAPI.map(news => ({
        news_source: news.source.name,
        news_title: news.title,
        news_url: news.url
    }));

    const serializedData = JSON.stringify(postData);

    axios.post('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news/create', serializedData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Jou POST is goed:', response.data);
    })
    .catch(error => {
        console.error('Jou POST is gefok:', error);
    });
}, [breakingNewsDataAPI]); // Only run this effect when breakingNewsData changes


useEffect(() => {
   axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news`)
   .then((response) => {
    const newsDataDB = response.data; // Accessing the articles data from the response
    setBreakingNewsDataDB(newsDataDB);
  })
  .catch((error) => {
    console.error('Error fetching breakingNewsData:', error);
  });
}, []);

useEffect(() => {
  console.log('Hierdie kom vannaf Heroku', breakingNewsDataDB); // Now you can safely log it here
}, [breakingNewsDataAPI]); // Log whenever breakingNewsDataAPI changes


    return (
    <> 
        {breakingNewsDataDB.length > 0 ? <marquee>

            <Stack direction="row">

                {breakingNewsDataDB.map((news) => (
                    <div className="ticker">
                        {/* <a href={news.url} target="_blank" rel="noopener noreferrer" style={{color: '#336791', textDecoration: 'none'}}>{news.source.name}: <i style={{color: '#D5441C', textDecoration: 'none'}}>{news.title}</i></a> */}
                        <a href={news.news_url} target="_blank" rel="noopener noreferrer" style={{color: '#336791', textDecoration: 'none'}}>{news.news_source}: <i style={{color: '#D5441C', textDecoration: 'none'}}>{news.news_title}</i></a>
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
