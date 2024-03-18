import React, { useState } from 'react';
import axios from 'axios';
import './Fonts.css';

const DBSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/search?keyword=${searchQuery}`);
      setSearchResults(response.data);
      console.log('Jou Soek Resultate:', searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input style={{ height: '27.5px', border: '2.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '944px' }} placeholder="Search BesterDev" type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} required />
      <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '29.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }} onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => {
            if (result.cyclopedia_name) {
              return (
                <li className="searchhover" key={result.id}>
                  In Cyclopedia:&nbsp;&nbsp;
                  <div><b>{result.cyclopedia_name}: </b>
                  {result.cyclopedia_desc}</div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </li>
              );
            } else if (result.website_name) {
              return (
                <li className="searchhover" key={result.id}>
                  In Web Resources:&nbsp;&nbsp;
                  <div>
                    <a href={result.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.website_desc}>{result.website_name}</a>
                    </div>
                    <div className='Font-Spacer-White'>Make this spacer white</div>
                </li>
              );
            } else if (result.howto_name) {
              return (
                <li className="searchhover" key={result.id}>
                  In HOWTOs:&nbsp;&nbsp;
                  <div><b>{result.howto_name}</b></div> 
                  {result.howto_desc} from {result.howto_name}
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </li>
              );
            } else if (result.step_name) {
              return (
                <li className="searchhover" key={result.id}>
                  In HOWTO Steps:&nbsp;&nbsp;
                  <div><b>{result.step_name}</b></div>
                  {result.step_obj}
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </li>
              );
            } else if (result.steprecord_id) {
              return (
                <li className="searchhover" key={result.id}>
                  In HOWTO Step Records:&nbsp;&nbsp;
                  <div>{result.steprecord}</div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </li>
              );
            } 
            return null; // Ignore other types of results
          })}
        </ul>
      )}
    </div>
  );
};

export default DBSearchComponent;
