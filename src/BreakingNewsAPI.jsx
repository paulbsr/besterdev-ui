
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import BreakingNewsSearchPhrase from './QuickAddWebResource'

// export default function BreakingNewsAPI() {
//     const [newsapiSearchPhrase, setNewsapiSearchPhrase] = useState();
//     const [checkForRecords, setCheckForRecords] = useState(true);
//     const [newsapiData, setNewsapiData] = useState();

//     useEffect(() => 
//     {
//       axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
//       // axios('http://localhost:8000/api/v1/searchphrase')
//         .then((response) => 
//         {
//           const searchPhraseValue = response.data[0].searchphrase;
//           setNewsapiSearchPhrase(searchPhraseValue);
//           console.log('In <BreakingNewsAPI/> is jou API respose.data searchPhraseValue:', searchPhraseValue);
//         }
//         ).catch((e)=> console.error(e));
  
//     }, 
//         [checkForRecords]);
//         console.log('In <BreakingNewsAPI/> is jou newsapiSearchPhrase:', newsapiSearchPhrase);

//     useEffect(() => {
//         fetchDataAPI();
//     }, [newsapiSearchPhrase]); // Trigger fetchDataAPI when searchPhrase changes

//     const fetchDataAPI = async () => {
//         const today = new Date();
//         const onedays = new Date(today);
//         onedays.setDate(today.getDate());
//         const dayOne = onedays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
//         const twodays = new Date(today);
//         twodays.setDate(today.getDate() - 2);
//         const dayTwo = twodays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
//         console.log('In <BreakingNewsAPI /> is jou veranderlikes:', dayOne, dayTwo, newsapiSearchPhrase)

//         // try {
//             await new Promise(resolve => setTimeout(resolve, 1000)); // Introduce a delay of 1 seconds
//             // let apiUrl = `https://newsapi.org/v2/everything?q=cyber&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`;
//             // let apiUrl = `https://newsapi.org/v2/everything?q=${newsapiSearchPhrase}&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`;
//             // if (newsapiSearchPhrase) {
//                 // apiUrl = `https://newsapi.org/v2/everything?q=${newsapiSearchPhrase}&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`;
//             // }
            
//             // const response = await axios.get(apiUrl);
//             // const newsapiData = response.data.articles;

//         useEffect(() => {
//             axios('https://newsapi.org/v2/everything?q=${newsapiSearchPhrase}&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed')
//                 // axios('http://localhost:8000/api/v1/searchphrase')
//                 .then((response) => {
//                     const newsapiDataIB = response.data.articles;
//                     setNewsapiData(newsapiDataIB);
//                     // console.log('In <BannerLight/> is jou searchPhraseValue:', searchPhraseValue);
//                 }
//                 ).catch((e) => console.error(e));

//         },
//             [checkForRecords]);

//             console.log('In <BreakingNewsAPI /> is jou GET vanaf NewsAPI met newsapiSearchPhrase:', newsapiSearchPhrase, newsapiData);

//             const postData = newsapiData.map(news => ({
//                 news_source: news.source.name,
//                 news_title: news.title,
//                 news_url: news.url,
//                 news_date: news.publishedAt
//             }));

//             const serializedData = JSON.stringify(postData);

//             // await new Promise(resolve => setTimeout(resolve, 1000)); // Introduce a delay of 1 seconds
//             await axios.post('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news/create', serializedData,
//                 // await axios.post('http://localhost:8000/api/v1/news/create', serializedData, 
//                 {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//             console.log('In <BreakingyNewsAPI /> is jou POST na Heroku met searchPhrase:', newsapiSearchPhrase, serializedData);
//         // } catch (error) 
//         // {
//         //     console.error('Error fetching or posting breaking news data:', error);
//         // }
//     };


//     return (null)
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BreakingNewsAPI() {
    const [newsapiSearchPhrase, setNewsapiSearchPhrase] = useState();
    const [newsapiData, setNewsapiData] = useState();

    useEffect(() => {
        axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/searchphrase')
            .then((response) => {
                const searchPhraseValue = response.data[0].searchphrase;
                setNewsapiSearchPhrase(searchPhraseValue);
            })
            .catch((e) => console.error(e));
    }, []);

    useEffect(() => {
        if (newsapiSearchPhrase) {
            const fetchDataAPI = async () => {
                const today = new Date();
                const onedays = new Date(today);
                onedays.setDate(today.getDate());
                const dayOne = onedays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
                const twodays = new Date(today);
                twodays.setDate(today.getDate() - 2);
                const dayTwo = twodays.toISOString().split('T')[0]; // Convert to YYYY-MM-DD

                axios.get(`https://newsapi.org/v2/everything?q=${newsapiSearchPhrase}&from=${dayTwo}&to=${dayOne}&language=en&apiKey=b9451c67f79e404bb72c2a9460262fed`)
                    .then((response) => {
                        const newsapiDataIB = response.data.articles;
                        setNewsapiData(newsapiDataIB);

                        const postData = newsapiDataIB.map(news => ({
                            news_source: news.source.name,
                            news_title: news.title,
                            news_url: news.url,
                            news_date: news.publishedAt
                        }));console.log('In <BreakingNewsAPI /> is jou GET vanaf NewsAPI met newsapiSearchPhrase:', newsapiSearchPhrase, newsapiDataIB);

                        const serializedData = JSON.stringify(postData);

                        axios.post('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news/create', serializedData, {
                            headers: { 'Content-Type': 'application/json' }
                        })
                            .then(() => console.log('In <BreakingyNewsAPI /> is jou POST na Heroku met searchPhrase:', newsapiSearchPhrase, serializedData),)
                            .catch((error) => console.error('Error posting data:', error));
                    })
                    .catch((error) => console.error('Error fetching data:', error));
                    
            };

            fetchDataAPI();
        }
    }, [newsapiSearchPhrase]);

    return null; // You might want to return something meaningful here
}
