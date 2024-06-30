import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";
import { useBreakingNewsApi } from './BreakingNewsAPIProvider';

export default function BreakingNews() {
    const [breakingNewsDataDB, setBreakingNewsDataDB] = useState([]);
    const { breakingnewsrootdata, loading, error } = useBreakingNewsApi(); //gebruik van die nuwexuseContect :-)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // useEffect(() => {
    //     const fetchDataDB = async () => {
    //         try {
    //             // Introduce a delay of 2 seconds
    //             await new Promise(resolve => setTimeout(resolve, 2000));
    //             const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news`);
    //             const newsDataDB = response.data;
    //             shuffleArray(newsDataDB);
    //             setBreakingNewsDataDB(newsDataDB);
    //             } catch (error) {
    //             console.error('Error fetching breakingNewsData from Heroku:', error);
    //             }
    //     };

    //     fetchDataDB();
    // }, []); //Empty dependency Array resuts in only run once after the component mounts and not re-run again for any subsequent updates.

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    console.log('In <BreakingNews/> is jou GET vanaf Heroku:', breakingnewsrootdata)

    return (
        <>
            {breakingnewsrootdata.length > 0 ? <marquee scrollamount="6">
                <Stack direction="row">
                    {breakingnewsrootdata.map((news) => (
                        <a className="ticker" key={news.news_url}>
                            <a href={news.news_url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791', textDecoration: 'none' }}>{news.news_source}: <i style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#D5441C', textDecoration: 'none' }}>{news.news_title}</i></a>
                        </a>
                    )
                    )
                    }
                </Stack>
            </marquee> : <div></div>}
        </>
    );
}