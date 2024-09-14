import React, { useState } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { toast } from 'react-toastify';
import CyclopediaTicker from "./CyclopediaTicker";
import BreakingNews from "./BreakingNews";
import { useWebsiteApi } from './WebSiteAPIProvider';

export default function CombinedCreateFP() {
  const [isExpandedCyclopedia, setExpandedCyclopedia] = useState(false);
  const [isExpandedWebsite, setExpandedWebsite] = useState(false);
  
  const [cyclopedia_name, setCyclopedia_name] = useState('');
  const [cyclopedia_desc, setCyclopedia_desc] = useState('');
  const [cyclopedia_url, setCyclopedia_url] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);
  
  const [website_name, setWebsite_name] = useState('');
  const [website_desc, setWebsite_desc] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [website_cat, setWebsite_cat] = useState('');
  
  const { websiterootdata } = useWebsiteApi();

  const handleSubmitCyclopedia = async (event) => {
    event.preventDefault();
    const newRecord = {
      cyclopedia_name,
      cyclopedia_desc,
      cyclopedia_url,
    };
    try {
      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`, newRecord);
      if (response.status === 200) {
        setCheckForRecords(!checkForRecords);
        toast.success(`${cyclopedia_name} memorialized.`);
        setCyclopedia_name('');
        setCyclopedia_desc('');
        setCyclopedia_url('');
      } else {
        toast.error('Nee');
      }
    } catch (error) {
      toast.error('Error submitting the form');
    }
  };

  const handleSubmitWebsite = async (event) => {
    event.preventDefault();
    const newRecord = {
      website_name,
      website_desc,
      website_url,
      website_cat,
    };
    try {
      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
      if (response.status === 200) {
        toast.success(`${website_name} added.`);
        setWebsite_name('');
        setWebsite_desc('');
        setWebsite_url('');
        setWebsite_cat('');
      } else {
        toast.error('Nee');
      }
    } catch (error) {
      toast.error('Error submitting the form');
    }
  };

  return (
    <div className='Font-Verdana-Small-Postgres'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <b onClick={() => setExpandedCyclopedia(!isExpandedCyclopedia)}>&nbsp;&nbsp;&nbsp;&nbsp;
          <GiHummingbird style={{ color: '#336791', fontSize: '25px' }} />Add to Cyclopedia</b>
        <b onClick={() => setExpandedWebsite(!isExpandedWebsite)}>&nbsp;&nbsp;&nbsp;&nbsp;
          <GiHummingbird style={{ color: '#336791', fontSize: '25px' }} />Add a Website</b>
      </div>

      {/* <CyclopediaTicker /> */}
      {/* <BreakingNews /> */}

      {isExpandedCyclopedia && (
        <form onSubmit={handleSubmitCyclopedia}>
            <div>&nbsp;</div>
          <img alt="spacer" src={spacer} />
          Cyclopedia:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '500px' }}
            placeholder="Required"
            type="text"
            value={cyclopedia_name}
            onChange={(e) => setCyclopedia_name(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />
          URL:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '865px' }}
            type="text"
            value={cyclopedia_url}
            onChange={(e) => setCyclopedia_url(e.target.value)}
          />

                  <button
                      className="Font-Verdana-Small-Postgres"
                      type="submit"
                      style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
                      Memorialize
                  </button>


          <div>&nbsp;</div>
          <img alt="spacer" src={spacer} />
          Description:&nbsp;&nbsp;
          <textarea
            style={{ fontFamily: 'Verdana', height: '26.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '1450px' }}
            placeholder="Required"
            value={cyclopedia_desc}
            onChange={(e) => setCyclopedia_desc(e.target.value)}
            required
          />
          {/* <button
            className="Font-Verdana-Small-Postgres"
            type="submit"
            style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
            Memorialize
          </button> */}
        </form>
      )}

      {isExpandedWebsite && (
        <form onSubmit={handleSubmitWebsite}>
        <div>&nbsp;</div>
          <img alt="spacer" src={spacer} />
          Website:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '500px' }}
            placeholder="Required"
            type="text"
            value={website_name}
            onChange={(e) => setWebsite_name(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />
          URL:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '650px' }}
            placeholder="Required"
            type="text"
            value={website_url}
            onChange={(e) => setWebsite_url(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />
          Category:&nbsp;&nbsp;
          {/* <select
            className='Font-Verdana-QuickAdd'
            onChange={(e) => setWebsite_cat(e.target.value)}
            style={{ height: '28.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '5px', width: '225px' }}
          >
            <option disabled selected value="">Select Category</option>
            {websiterootdata &&
              websiterootdata.map(option => (
                <option key={option.website_cat} value={option.website_cat}>
                  {option.website_cat}
                </option>
              ))
            }
          </select> */}

          {/* <select
            className='Font-Verdana-QuickAdd'
            onChange={(event) => {
              const selectedIndex = event.target.selectedIndex;
              const selectedOption = event.target.options[selectedIndex];
              const category = selectedOption.getAttribute("data-category");
              setWebsite_cat(category);
            }}
            id="dropdown"
            style={{
              height: '27.5px',
              border: '1.25px solid #336791',
              borderRadius: '4px',
              padding: 0,
              paddingLeft: '5px',
              width: '225px'
            }}
          >&nbsp;
            <option disabled selected value="">Category</option>
            {websiterootdata &&
              Array.from(new Set(websiterootdata.map(option => option.website_cat)))
                .sort()
                .map(category => (
                  <option key={category} value={category} data-category={category}>
                    {category}
                  </option>
                ))}
          </select> */}

<select
  className='Font-Verdana-QuickAdd'
  onChange={(event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const category = selectedOption.getAttribute("data-category");
    setWebsite_cat(category);
  }}
  id="dropdown"
  style={{
    height: '27.5px',
    border: '1.25px solid #336791',
    borderRadius: '4px',
    padding: 0,
    paddingLeft: '5px',
    width: '225px'
  }}
>&nbsp;
  <option disabled selected value="">Category</option>
  {websiterootdata &&
    Array.from(new Set(websiterootdata.map(option => option.website_cat)))
      .sort()
      .filter(category => !category.startsWith("HOWTO")) // Exclude "HOWTO"
      .map(category => (
        <option key={category} value={category} data-category={category}>
          {category}
        </option>
      ))}
</select>


          <button
            className="Font-Verdana-Small-Postgres"
            type="submit"
            style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
            Memorialize
          </button>
        </form>
      )}
    </div>
  );
}
