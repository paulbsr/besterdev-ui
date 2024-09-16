// // CyclopediaApiContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const CyclopediaApiContext = createContext();

// export const CyclopediaAPIProvider = ({ children }) => {
//   const [cyclopediarootdata, setCyclopediarootdata] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia');
//         // const response = await axios.get('http://localhost:8000/api/v1/cyclopedia');
//         const sortedcyclopediadata = response.data.sort((b, a) => b.cyclopediaName.localeCompare(a.cyclopediaName));
//         setCyclopediarootdata(sortedcyclopediadata);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//         }
//     };
//     fetchData();
//   }, []);

//   return (
//     <CyclopediaApiContext.Provider value={{ cyclopediarootdata, loading, error }}>
//       {children}
//     </CyclopediaApiContext.Provider>
//   );
// };

// export const useCyclopediaApi = () => {
//   return useContext(CyclopediaApiContext);
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CyclopediaApiContext = createContext();

export const CyclopediaAPIProvider = ({ children }) => {
  const [cyclopediarootdata, setCyclopediarootdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading before the fetch
      try {
        const response = await axios.get('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia');
        // const response = await axios.get('http://localhost:8000/api/v1/cyclopedia');
        const sortedcyclopediadata = response.data.sort((b, a) => b.cyclopediaName.localeCompare(a.cyclopediaName));
        setCyclopediarootdata(sortedcyclopediadata);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); // Stop loading after the fetch is complete
      }
    };
    fetchData();
  }, [refresh]); // Refetch data when `refresh` state changes

  return (
    <CyclopediaApiContext.Provider value={{ cyclopediarootdata, loading, error, setRefresh }}>
      {children}
    </CyclopediaApiContext.Provider>
  );
};

export const useCyclopediaApi = () => {
  return useContext(CyclopediaApiContext);
};
