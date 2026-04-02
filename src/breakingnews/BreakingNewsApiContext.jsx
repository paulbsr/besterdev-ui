import React, { createContext, useContext, useState, useCallback } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const BreakingNewsApiContext = createContext();

export const BreakingNewsAPIProvider = ({ children }) => {
  const [breakingnews, setBreakingnews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshBreakingNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await OAuth2APIClient.get('/api/v1/breakingnews');
      setBreakingnews(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <BreakingNewsApiContext.Provider
      value={{ breakingnews, loading, error, refreshBreakingNews }}
    >
      {children}
    </BreakingNewsApiContext.Provider>
  );
};

export const useBreakingNewsApi = () => useContext(BreakingNewsApiContext);