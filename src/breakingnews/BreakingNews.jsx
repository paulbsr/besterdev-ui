import React from 'react';
import { Stack } from "@mui/material";
import { useBreakingNewsApi } from './BreakingNewsAPIProvider';

export default function BreakingNews() {
    const { breakingnewsrootdata, loading, error } = useBreakingNewsApi(); //gebruik van die nuwe useContext :-)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

  shuffleArray(breakingnewsrootdata)

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