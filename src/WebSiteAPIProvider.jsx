// WebsiteApiContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WebsiteApiContext = createContext();

export const WebSiteAPIProvider = ({ children }) => {
  const [websiterootdata, setWebsiterootdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites');
        const sortedwebsitedata = response.data.sort((b, a) => b.websiteName.localeCompare(a.websiteName));
        setWebsiterootdata(sortedwebsitedata);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();console.log('in <WebSiteAPIProvider> is jou websiterootdata:', websiterootdata)
  }, [refresh]);

  return (
    <WebsiteApiContext.Provider value={{ websiterootdata, loading, error, setRefresh }}>
      {children}
    </WebsiteApiContext.Provider>
  );
};

export const useWebsiteApi = () => {
  return useContext(WebsiteApiContext);
};
