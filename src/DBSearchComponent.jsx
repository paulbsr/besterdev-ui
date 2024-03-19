import React, { useState } from 'react';
import axios from 'axios';
import './Fonts.css';
import { PiArrowFatLinesDownLight } from "react-icons/pi";
import GradientLineRusty from './GradientLineRusty';
import GradientLine from './GradientLine';


const DBSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/search?keyword=${searchQuery}`);
      setSearchResults(response.data);
      console.log('Jou Soek Resultate:', searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleCancel = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <form onSubmit={handleSearch}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={{ height: '27.5px', border: '2.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '900px' }}
          placeholder="Search BesterDev and hit Enter"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          required
        />
        <button
          type="submit"
          style={{ marginLeft: '10px', height: '29.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: '10px', height: '29.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}
        >
          Clear
        </button>
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((result) => {
            if (result.cyclopedia_name) {
              return (
                <div className="fphover" key={result.id}>
                  In Cyclopedia:&nbsp;&nbsp;
                  <div>
                    <PiArrowFatLinesDownLight style={{ color: '#000000', fontSize: '23px', cursor: 'pointer' }}/>&nbsp;
                    <b>{result.cyclopedia_name}: </b>
                    {result.cyclopedia_desc}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.website_name) {
              return (
                <div className="fphover" key={result.id}>
                  In Web Resources:&nbsp;&nbsp;
                  <div>
                    <PiArrowFatLinesDownLight style={{ color: '#000000', fontSize: '23px', cursor: 'pointer' }}/>&nbsp;
                    <a href={result.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.website_desc}>{result.website_name}</a>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.howto_name) {
              return (
                <div className="fphover" key={result.id}>
                  In HOWTOs:&nbsp;&nbsp;
                  <div>
                    <PiArrowFatLinesDownLight style={{ color: '#000000', fontSize: '23px', cursor: 'pointer' }}/>&nbsp;
                    <b>{result.howto_name}</b>
                  </div>
                  {/* {result.howto_desc} from {result.howto_name} */}
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.step_name) {
              return (
                <div className="fphover" key={result.id}>
                  <PiArrowFatLinesDownLight style={{ color: '#000000', fontSize: '23px', cursor: 'pointer' }}/>&nbsp;
                  In HOWTO Steps:&nbsp;&nbsp;
                  <div><b>{result.step_name}</b></div>
                  {result.step_obj}
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.steprecord_id) {
              return (
                <div className="fphover" key={result.id}>
                  <PiArrowFatLinesDownLight style={{ color: '#000000', fontSize: '23px', cursor: 'pointer' }}/>&nbsp;
                  In HOWTO Step Records:&nbsp;&nbsp;
                  <div>{result.steprecord}</div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }
            return null; // Ignore other types of results
          })}
        </div>
      )}
      <GradientLine />
    </form>
  );
};

export default DBSearchComponent;
