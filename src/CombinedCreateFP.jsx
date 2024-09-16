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
  
  const [cyclopediaName, setCyclopediaName] = useState('');
  const [cyclopediaDesc, setCyclopediaDesc] = useState('');
  const [cyclopediaUrl, setCyclopediaUrl] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);
  
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCat, setWebsiteCat] = useState('');
  
  const { websiterootdata } = useWebsiteApi();

  const handleSubmitCyclopedia = async (event) => {
    event.preventDefault();
    const newRecord = 
    {
      cyclopediaName,
      cyclopediaDesc,
      cyclopediaUrl,
    };
    try {
      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`, newRecord);
      if (response.status === 200) {
        setCheckForRecords(!checkForRecords);
        toast.success(`${cyclopediaName} memorialized.`);
        setCyclopediaName('');
        setCyclopediaDesc('');
        setCyclopediaUrl('');
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
      websiteName,
      websiteDesc,
      websiteUrl,
      websiteCat,
    };
    try {
      const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
      if (response.status === 200) {
        toast.success(`${websiteName} added.`);
        setWebsiteName('');
        setWebsiteDesc('');
        setWebsiteUrl('');
        setWebsiteCat('');
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
            value={cyclopediaName}
            onChange={(e) => setCyclopediaName(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />
          URL:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '865px' }}
            type="text"
            value={cyclopediaUrl}
            onChange={(e) => setCyclopediaUrl(e.target.value)}
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
            value={cyclopediaDesc}
            onChange={(e) => setCyclopediaDesc(e.target.value)}
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
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />
          URL:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '650px' }}
            placeholder="Required"
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />
          Category:&nbsp;&nbsp;
          {/* <select
            className='Font-Verdana-QuickAdd'
            onChange={(e) => setWebsiteCat(e.target.value)}
            style={{ height: '28.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '5px', width: '225px' }}
          >
            <option disabled selected value="">Select Category</option>
            {websiterootdata &&
              websiterootdata.map(option => (
                <option key={option.websiteCat} value={option.websiteCat}>
                  {option.websiteCat}
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
              setWebsiteCat(category);
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
              Array.from(new Set(websiterootdata.map(option => option.websiteCat)))
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
    setWebsiteCat(category);
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
    Array.from(new Set(websiterootdata.map(option => option.websiteCat)))
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
