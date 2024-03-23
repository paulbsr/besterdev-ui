import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";

export default function BreakingNews() {
    const [breakingNewsDataDB, setBreakingNewsDataDB] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState('cyber');

    const fetchDataAPI = async () => {
        const today = new Date();
        const onedays = new Date(today);
        onedays.setDate(today.getDate());
        const dayOne = onedays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
        const twodays = new Date(today);
        twodays.setDate(today.getDate() - 2);
        const dayTwo = twodays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
        console.log(dayOne, dayTwo, searchPhrase)

        try {
            let apiUrl = `https://newsapi.org/v2/everything?q=cyber&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`;
            if (searchPhrase) {
                apiUrl = `https://newsapi.org/v2/everything?q=${searchPhrase}&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`;
            }
            const response = await axios.get(apiUrl);
            const newsapiData = response.data.articles;
            console.log('Jou GET vanaf NewsAPI met searchPhrase:', searchPhrase, newsapiData);

            const postData = newsapiData.map(news => ({
                news_source: news.source.name,
                news_title: news.title,
                news_url: news.url,
                news_date: news.publishedAt
            }));

            const serializedData = JSON.stringify(postData);

            await axios.post('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news/create', serializedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error fetching or posting breaking news data:', error);
        }
    };

    useEffect(() => {
        fetchDataAPI();
        // }, [searchPhrase]);
    }, []);

    useEffect(() => {
        const fetchDataDB = async () => {
            try {
                const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news`);
                const newsDataDB = response.data;
                shuffleArray(newsDataDB);
                setBreakingNewsDataDB(newsDataDB);
                console.log('Jou GET vanaf Heroku:', breakingNewsDataDB);
            } catch (error) {
                console.error('Error fetching breakingNewsData:', error);
            }
        };

        fetchDataDB();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    return (
        <>
            {/* <form onSubmit={(e) => {
                e.preventDefault();
                // Trigger API call when the form is submitted
                fetchDataAPI();
            }}>
                <input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '4px', width: '90px' }} placeholder="Search" type="text" value={searchPhrase} onChange={(event) => setSearchPhrase(event.target.value)} required />
                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '20.5px', border: '1px solid #c4c4c4', borderRadius: '5px', backgroundColor: '#ffffff', color: '#c4c4c4', cursor: 'pointer' }}>Go</button>
            </form> */}


            {breakingNewsDataDB.length > 0 ? <marquee scrollamount="6">

                <Stack direction="row">

                    {breakingNewsDataDB.map((news) => (
                        <a className="ticker" key={news.news_url}>
                            <a href={news.news_url} target="_blank" rel="noopener noreferrer" style={{ color: '#336791', textDecoration: 'none' }}>{news.news_source}: <i style={{ color: '#D5441C', textDecoration: 'none' }}>{news.news_title}</i></a>
                        </a>
                    )
                    )
                    }

                </Stack>

            </marquee> : <div></div>}
        </>
    );
}
