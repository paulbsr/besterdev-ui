// import React, { useState, useEffect } from 'react';
// import { Stack } from "@mui/material";
// import OAuth2APIClient from '../oauth2/OAuth2APIClient';

// export default function BreakingNews() {
//   const [breakingNews, setBreakingNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     OAuth2APIClient.get('/api/v1/breakingnews')
//       .then((res) => setBreakingNews(res.data))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Shuffle news
//   const shuffledNews = [...breakingNews].sort(() => Math.random() - 0.5);

//   return (
//     <>
//       {shuffledNews.length > 0 ? (
//         <marquee scrollamount="6">
//           <Stack direction="row" spacing={2}>
//             {shuffledNews.map((news) => (
//               <a
//                 key={news.news_url}
//                 href={news.news_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{
//                   fontFamily: 'Segoe UI',
//                   fontSize: 'medium',
//                   color: '#336791',
//                   textDecoration: 'none'
//                 }}
//               >
//                 {news.news_source}:{" "}
//                 <i style={{ color: '#D5441C' }}>{news.news_title}</i>
//               </a>
//             ))}
//           </Stack>
//         </marquee>
//       ) : null}
//     </>
//   );
// }

import { Stack } from '@mui/material';
import { useBreakingNewsApi } from './BreakingNewsApiContext';

export default function BreakingNews() {
  const { breakingnews, loading, error } = useBreakingNewsApi();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const shuffledNews = [...breakingnews].sort(() => Math.random() - 0.5);

  return (
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
              textDecoration: 'none',
            }}
          >
            {news.news_source}:{' '}
            <i style={{ color: '#D5441C' }}>{news.news_title}</i>
          </a>
        ))}
      </Stack>
    </marquee>
  );
}