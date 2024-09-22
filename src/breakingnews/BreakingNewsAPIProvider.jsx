// BreakingNewsApiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BreakingNewsApiContext = createContext();

export const BreakingNewsAPIProvider = ({ children }) => {
  const [breakingnewsrootdata, setBreakingnewsrootdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/news');
        // const sortedwebsitedata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        const newsDataDB = response.data;
        // shuffleArray(newsDataDB);
        setBreakingnewsrootdata(newsDataDB);
        // setWebsiterootdata(sortedwebsitedata);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BreakingNewsApiContext.Provider value={{ breakingnewsrootdata, loading, error }}>
      {children}
    </BreakingNewsApiContext.Provider>
  );
};

export const useBreakingNewsApi = () => {
  return useContext(BreakingNewsApiContext);
};
