import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from "@mui/material";

export default function BreakingNews() {
    const [breakingNewsDataDB, setBreakingNewsDataDB] = useState([]);

    useEffect(() => {
        const fetchDataDB = async () => {
            try {
                // Introduce a delay of 2 seconds
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news`);
                const newsDataDB = response.data;
                shuffleArray(newsDataDB);
                setBreakingNewsDataDB(newsDataDB);
                } catch (error) {
                console.error('Error fetching breakingNewsData from Heroku:', error);
                }
        };

        fetchDataDB();
    }, []); //Empty dependency Array resuts in only run once after the component mounts and not re-run again for any subsequent updates.

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    console.log('In <BreakingNews/> is jou GET vanaf Heroku:', breakingNewsDataDB)

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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Stack } from "@mui/material";
// import './BreakingNews.css'; // Import CSS file for styling

// export default function BreakingNews() {
//     const [breakingNewsDataDB, setBreakingNewsDataDB] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchDataDB = async () => {
//             try {
//                 // Introduce a delay of 2 seconds
//                 await new Promise(resolve => setTimeout(resolve, 2000));
//                 const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news`);
//                 const newsDataDB = response.data;
//                 shuffleArray(newsDataDB);
//                 setBreakingNewsDataDB(newsDataDB);
//                 setLoading(false);
//             } catch (error) {
//                 setError('Error fetching breakingNewsData from Heroku:', error);
//                 setLoading(false);
//             }
//         };

//         fetchDataDB();
//     }, []);

//     const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     };

//     return (
//         <div className="breaking-news-container">
//             {loading ? (
//                 <div>Loading...</div>
//             ) : error ? (
//                 <div>Error: {error}</div>
//             ) : breakingNewsDataDB.length > 0 ? (
//                 <Stack direction="row" spacing={2}>
//                     {breakingNewsDataDB.map((news) => (
//                         <a className="ticker" key={news.news_url} href={news.news_url} target="_blank" rel="noopener noreferrer">
//                             <span className="news-source">{news.news_source}:</span>
//                             <span className="news-title">{news.news_title}</span>
//                         </a>
//                     ))}
//                 </Stack>
//             ) : (
//                 <div>No breaking news available</div>
//             )}
//         </div>
//     );
// }
