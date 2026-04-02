// import React from 'react';
// import { Stack } from "@mui/material";
// import { useBreakingNewsApi } from './BreakingNewsAPIProvider';

// export default function BreakingNews() {
//     const { breakingnewsrootdata, loading, error } = useBreakingNewsApi(); //gebruik van die nuwe useContext :-)
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;


//     const shuffleArray = (array) => {
//         for (let i = array.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     };

//   shuffleArray(breakingnewsrootdata)

//     console.log('In <BreakingNews/> is jou GET vanaf Heroku:', breakingnewsrootdata)

//     return (
//         <>
//             {breakingnewsrootdata.length > 0 ? <marquee scrollamount="6">
//                 <Stack direction="row">
//                     {breakingnewsrootdata.map((news) => (
//                         <a className="ticker" key={news.news_url}>
//                             <a href={news.news_url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#336791', textDecoration: 'none' }}>{news.news_source}: <i style={{ fontFamily: 'Segoe UI', fontSize: 'medium', color: '#D5441C', textDecoration: 'none' }}>{news.news_title}</i></a>
//                         </a>
//                     )
//                     )
//                     }
//                 </Stack>
//             </marquee> : <div></div>}
//         </>
//     );
// }

// import React from 'react';
// import { Stack } from "@mui/material";
// import { useBreakingNewsApi } from './BreakingNewsAPIProvider';

// export default function BreakingNews() {
//   const { breakingnews, loading, error } = useBreakingNewsApi();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!breakingnews || breakingnews.length === 0) return <div>No news available</div>;

//   // optional shuffle
//   const shuffledNews = [...breakingnews];
//   for (let i = shuffledNews.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledNews[i], shuffledNews[j]] = [shuffledNews[j], shuffledNews[i]];
//   }

//   return (
//     <marquee scrollamount="6">
//       <Stack direction="row" spacing={2}>
//         {shuffledNews.map((news) => (
//           <a
//             key={news.news_url}
//             href={news.news_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{
//               fontFamily: 'Segoe UI',
//               fontSize: 'medium',
//               color: '#336791',
//               textDecoration: 'none'
//             }}
//           >
//             {news.news_source}:{" "}
//             <i style={{ color: '#D5441C' }}>{news.news_title}</i>
//           </a>
//         ))}
//       </Stack>
//     </marquee>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Stack } from "@mui/material";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function BreakingNews() {
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    OAuth2APIClient.get('/api/v1/breakingnews')
      .then((res) => setBreakingNews(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Shuffle news
  const shuffledNews = [...breakingNews].sort(() => Math.random() - 0.5);

  return (
    <>
      {shuffledNews.length > 0 ? (
        <marquee scrollamount="6">
          <Stack direction="row" spacing={2}>
            {shuffledNews.map((news) => (
              <a
                key={news.news_url}
                href={news.news_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Segoe UI',
                  fontSize: 'medium',
                  color: '#336791',
                  textDecoration: 'none'
                }}
              >
                {news.news_source}:{" "}
                <i style={{ color: '#D5441C' }}>{news.news_title}</i>
              </a>
            ))}
          </Stack>
        </marquee>
      ) : null}
    </>
  );
}