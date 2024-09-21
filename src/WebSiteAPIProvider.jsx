import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WebsiteApiContext = createContext();

export const WebSiteAPIProvider = ({ children }) => {
  const [websiterootdata, setWebsiterootdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshwebsiterootdata, setRefreshWebsiterootdata] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading before the fetch
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

    fetchData();
  }, [refreshwebsiterootdata]); // Refetch data when `refresh` state changes

  return (
    <WebsiteApiContext.Provider value={{ websiterootdata, loading, error, setRefreshWebsiterootdata }}>
      {children}
    </WebsiteApiContext.Provider>
  );
};

export const useWebsiteApi = () => {
  return useContext(WebsiteApiContext);
};
