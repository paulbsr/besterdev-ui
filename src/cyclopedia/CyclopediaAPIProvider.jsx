import React, { createContext, useContext, useState, useCallback } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const CyclopediaApiContext = createContext(null);

export const CyclopediaAPIProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCyclopedia = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const response = await OAuth2APIClient.get('/api/v1/cyclopedia',
        { signal: controller.signal, caller: 'CyclopediaAPIProvider' }
      );

      setData(
        [...response.data].sort((a, b) =>
          a.cyclopediaName.localeCompare(b.cyclopediaName)
        )
      );
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  return (
    <CyclopediaApiContext.Provider
      value={{
        cyclopediaData: data,
        loading,
        error,
        reload: loadCyclopedia
      }}
    >
      {children}
    </CyclopediaApiContext.Provider>
  );
};

export const useCyclopediaApi = () => {
  const ctx = useContext(CyclopediaApiContext);
  if (!ctx) {
    throw new Error('useCyclopediaApi must be used inside CyclopediaAPIProvider');
  }
  return ctx;
};