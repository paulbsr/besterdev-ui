import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";

export default function BreakingNews(props) {
    const [breakingNewsDataDB, setBreakingNewsDataDB] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState(props.searchPhrase);

    useEffect(() => {
        const fetchDataDB = async () => {
            try {
                const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news`);
                const newsDataDB = response.data;
                shuffleArray(newsDataDB);
                setBreakingNewsDataDB(newsDataDB);
                console.log('In <BreakingNews/> is jou GET vanaf Heroku met searchPhrase:', searchPhrase, breakingNewsDataDB);
            } catch (error) {
                console.error('Error fetching breakingNewsData from Heroku:', error);
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
