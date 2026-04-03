import React, { createContext, useContext, useEffect, useState } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const BreakingNewsApiContext = createContext(null);

export const BreakingNewsAPIProvider = ({ children }) => {
  const [breakingnews, setBreakingnews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshBreakingNews = async () => {
    try {
      setLoading(true);
      const res = await OAuth2APIClient.get('/api/v1/breakingnews');
      setBreakingnews(res.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    refreshBreakingNews();
  }, []);

  return (
    <BreakingNewsApiContext.Provider
      value={{ breakingnews, loading, error, refreshBreakingNews }}
    >
      {children}
    </BreakingNewsApiContext.Provider>
  );
};

export const useBreakingNewsApi = () => {
  const ctx = useContext(BreakingNewsApiContext);
  if (!ctx) {
    throw new Error('useBreakingNewsApi must be used inside BreakingNewsAPIProvider');
  }
  return ctx;
};