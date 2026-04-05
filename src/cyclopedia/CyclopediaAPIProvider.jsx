// import React, { createContext, useContext, useState, useEffect } from 'react';
// import OAuth2APIClient from '../oauth2/OAuth2APIClient';

// const CyclopediaApiContext = createContext();

// export const CyclopediaAPIProvider = ({ children }) => {
//   const [cyclopediarootdata, setCyclopediarootdata] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshcyclopediarootdata, setRefreshCyclopediarootdata] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true); // Start loading before the fetch
//       try {
//         const response = await OAuth2APIClient.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia');
//         const sortedcyclopediadata = response.data.sort((b, a) => b.cyclopediaName.localeCompare(a.cyclopediaName));
//         setCyclopediarootdata(sortedcyclopediadata);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false); // Stop loading after the fetch is complete
//       }
//     };
    
//     fetchData();
//   }, [refreshcyclopediarootdata]); // Refetch data when `refresh` state changes

//   return (
//     <CyclopediaApiContext.Provider value={{ cyclopediarootdata, loading, error, setRefreshCyclopediarootdata }}>
//       {children}
//     </CyclopediaApiContext.Provider>
//   );
// };

// export const useCyclopediaApi = () => {
//   return useContext(CyclopediaApiContext);
// };

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
      const response = await OAuth2APIClient.get(
        '/api/v1/cyclopedia',
        { signal: controller.signal }
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
        cyclopedia: data,
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