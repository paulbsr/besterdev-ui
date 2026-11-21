// HowtoApiContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

const HowtoApiContext = createContext();

export const HowtoAPIProvider = ({ children }) => {
  const [howtorootdata, setHowtorootdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos');
      const sortedhowtodata = [...response.data].sort((b, a) => b.howto_name.localeCompare(a.howto_name));
      setHowtorootdata(sortedhowtodata);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <HowtoApiContext.Provider value={{ howtorootdata, loading, error, reload }}>
      {children}
    </HowtoApiContext.Provider>
  );
};

export const useHowtoApi = () => {
  return useContext(HowtoApiContext);
};
