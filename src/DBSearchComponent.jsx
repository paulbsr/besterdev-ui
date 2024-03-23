import React, { useState } from 'react';
import axios from 'axios';
import './Fonts.css';
import { PiArrowFatLinesDownLight } from "react-icons/pi";
import GradientLineRusty from './GradientLineRusty';
import { GoLog } from "react-icons/go";


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

  const highlightKeyword = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={{ height: '27.5px', border: '0.75px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '900px' }}
          placeholder="Search BesterDev"
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
                  A Cyclopedia Entry:&nbsp;&nbsp;
                  <div classname="Font-Verdana-Medium-Bold">
                    <GoLog style={{ color: '#D5441C', fontSize: '17px', cursor: 'pointer' }}/>&nbsp;
                    <b>{highlightKeyword(result.cyclopedia_name, searchQuery)}: </b>
                    {result.cyclopedia_desc}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.website_name) {
              return (
                <div className="fphover" key={result.id}>
                  A Web Resource Record:&nbsp;&nbsp;
                  <div>
                    <GoLog style={{ color: '#D5441C', fontSize: '17px', cursor: 'pointer' }}/>&nbsp;
                    <a href={result.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.website_desc}>
                      {highlightKeyword(result.website_name, searchQuery)}
                    </a>
                    -&nbsp;{result.website_desc}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.news_title) {
              return (
                <div className="fphover" key={result.id}>
                  A Breaking News Article:&nbsp;&nbsp;
                  <div>
                    <GoLog style={{ color: '#D5441C', fontSize: '17px', cursor: 'pointer' }}/>&nbsp;
                    <a href={result.news_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.news_source}>
                      {highlightKeyword(result.news_title, searchQuery)}
                    </a>
                    -&nbsp;{result.website_desc}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.howto_name) {
              return (
                <div className="fphover" key={result.id}>
                  This is a HOWTO document:&nbsp;&nbsp;
                  <div>
                    <GoLog style={{ color: '#D5441C', fontSize: '17px', cursor: 'pointer' }}/>&nbsp;
                    <a href={`/howtoedit/${result.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.howto_summary}>
                      <b>{highlightKeyword(result.howto_name, searchQuery)}</b>
                    </a>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.step_name) {
              return (
                <div className="fphover" key={result.id}>
                  This is a Step Name in a HOWTO document:
                  <div>
                    <GoLog style={{ color: '#D5441C', fontSize: '17px', cursor: 'pointer' }}/>&nbsp;
                    <b>{highlightKeyword(result.step_name, searchQuery)}</b> which has a Step Objective to: <i>" {result.step_obj} " </i>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            } else if (result.steprecord_id) {
              return (
                <div className="fphover" key={result.id}>
                  In HOWTO Step Records:&nbsp;&nbsp;
                  <div>
                    <GoLog style={{ color: '#D5441C', fontSize: '17px', cursor: 'pointer' }}/>&nbsp;
                    {highlightKeyword(result.steprecord, searchQuery)}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }
            return null; // Ignore other types of results
          })}
        </div>
      )}
      <div className='Font-Spacer-White'>Make this spacer white</div>
      <GradientLineRusty />
    </form>
  );
};

export default DBSearchComponent;
