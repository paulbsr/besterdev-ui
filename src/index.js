//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/
//https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import PageSearch from './PageSearch';
import PageManage from './PageManage';
import PageLogin from './PageLogin';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'react-tooltip/dist/react-tooltip.css';


//THIS IS WORKING CODE:
const PrivateRoutes = () => {
  let auth = {'token':true}
return (
    auth.token ? <Outlet/> : <Navigate to='/login'/>
  )
}

// const PrivateRoutes = () => {
//   // let auth = {'token':false}
//   const user = firebase.auth().currentUser;
//   let auth = {user}
// return (
//     auth.user? <Outlet/> : <Navigate to='/login'/>
//   )
// }


// const PrivateRoutes = () => {
//   // Check if the user is authenticated
//   const isAuthenticated = () => {
//     const user = firebase.auth().currentUser;
//     console.log(user)
//     return !!user; // Returns true if the user is authenticated, false otherwise
    
//   };

//   return (
//     isAuthenticated() ? <Outlet /> : <Navigate to='/login' />
//   );
// };


// const isAuthenticated = () => {
//   const user = firebase.auth().currentUser;
//     return !!user.displayName;
// };

const firebaseConfig = {
  apiKey: "AIzaSyCwDLcoI45eQU61Y7GVXlBDAx-3Du_gQuA",
  authDomain: "besterdev-432e9.firebaseapp.com",
  projectId: "besterdev-432e9",
  storageBucket: "besterdev-432e9.appspot.com",
  messagingSenderId: "352042484093",
  appId: "1:352042484093:web:3b62f25c3b000848720c14",
  measurementId: "G-FCGGY1NE36"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);


const App = () => {

return (

  <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/screen' element={<PageSearch/>} />
              <Route path='/manage' element={<PageManage/>} />
          </Route>
          <Route path='/login' element={<PageLogin/>}/>
          <Route path='/' element={<PageLogin/>}/>
        </Routes>
    </Router>
  );
};
export const auth = getAuth(app);
ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render to render the App component
export default App;