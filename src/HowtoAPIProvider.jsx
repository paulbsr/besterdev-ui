// HowtoApiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const HowtoApiContext = createContext();

export const HowtoAPIProvider = ({ children }) => {
  const [howtorootdata, setHowtorootdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos');
        const sortedhowtodata = response.data.sort((b, a) => b.howto_name.localeCompare(a.howto_name));
        setHowtorootdata(sortedhowtodata);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <HowtoApiContext.Provider value={{ howtorootdata, loading, error }}>
      {children}
    </HowtoApiContext.Provider>
  );
};

export const useHowtoApi = () => {
  return useContext(HowtoApiContext);
};
