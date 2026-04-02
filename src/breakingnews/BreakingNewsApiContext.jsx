// BreakingNewsApiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const BreakingNewsApiContext = createContext();

export const BreakingNewsAPIProvider = ({ children }) => {
  const [breakingnews, setBreakingnews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await OAuth2APIClient.get(
          'https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/breakingnews'
        );
        setBreakingnews(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <BreakingNewsApiContext.Provider value={{ breakingnews, loading, error }}>
      {children}
    </BreakingNewsApiContext.Provider>
  );
};

export const useBreakingNewsApi = () => useContext(BreakingNewsApiContext);