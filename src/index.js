import React from 'react';
import ReactDOM from 'react-dom'; // Fixed import statement for ReactDOM
import './index.css';
import reportWebVitals from './reportWebVitals';
import FrontPage from './FrontPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManagePage from './ManagePage';

reportWebVitals();

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root')); // Use ReactDOM.render to render the App component

export default App;
