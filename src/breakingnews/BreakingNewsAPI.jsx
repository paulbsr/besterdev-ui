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
                        }));
                        console.log('In <BreakingNewsAPI /> is jou GET vanaf NewsAPI met newsapiSearchPhrase:', newsapiSearchPhrase, newsapiDataIB);

                        const serializedData = JSON.stringify(postData);

                        axios.post('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news/create', serializedData, {
                            // axios.post('http://localhost:8000/api/v1/news/create', serializedData, {
                            headers: { 'Content-Type': 'application/json' }
                        })
                            .then(
                                () => console.log('In <BreakingyNewsAPI /> is jou POST na Heroku met searchPhrase:', newsapiSearchPhrase, serializedData),
                            )
                            .catch((error) => console.error('In <BreakingyNewsAPI /> is jou POST na Heroku met searchPhrase gefok omdat:', error));
                    })
                    .catch((error) => console.error('Error fetching data:', error));
                    
            };

            fetchDataAPI();
        }
    }, [newsapiSearchPhrase]);

    return null; // You might want to return something meaningful here
}
