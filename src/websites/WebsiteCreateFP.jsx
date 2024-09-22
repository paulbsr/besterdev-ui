import React, { useState } from "react";
import axios from 'axios';
import '../Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { useWebsiteApi } from './WebSiteAPIProvider';
import BreakingNews from "../BreakingNews";

export default function WebSiteCreateFP(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const [website_name, setWebsite_name] = useState('');
  const [website_desc, setWebsite_desc] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [website_cat, setWebsite_cat] = useState('');
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContect :-)


  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   {
  //     var newRecord =
  //     {
  //       'website_name': website_name,
  //       'website_desc': website_desc,
  //       'website_url': website_url,
  //       'website_cat': website_cat,
  //     }

  //     {
  //       const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
  //       if (response.status === 200) {
  //         //   props.setCheckForRecords(!props.checkForRecords);
  //         toast.success(`${website_name} added.`)
  //       }
  //       else {
  //         toast.error('Nee')
  //       }
  //     }
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    var newRecord = {
      'websiteName': website_name,
      'websiteDesc': website_desc,
      'websiteUrl': website_url,
      'websiteCat': website_cat,
    };
  
    try {
      const response = await axios.post(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
  
      if (response.status === 200) {
        toast.success(`${website_name} added.`);
  
        // Clear input fields after successful submission
        setWebsite_name('');
        setWebsite_desc('');
        setWebsite_url('');
        setWebsite_cat('');
      } else {
        toast.error('Nee');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error submitting the form');
    }
  };
  

  return (
    <div className='Font-Verdana-Small-Postgres'>&nbsp;&nbsp;&nbsp;
      <b style={{ cursor: 'pointer' }} onClick={toggleAccordion}>
        <GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} />Add a Website:</b>
      <BreakingNews />

      {isExpanded && (

        <form onSubmit={handleSubmit}>
          <div className='Font-Verdana-Small-Postgres'>
            <img alt="1" src={spacer} />
            <img alt="1" src={spacer} />Website:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} placeholder="Required" type="text" value={website_name} onChange={(event) => setWebsite_name(event.target.value)} required />
            <img alt="1" src={spacer} />
            <img alt="1" src={spacer} />URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} placeholder="Required" type="text" value={website_url} onChange={(event) => setWebsite_url(event.target.value)} required />
            <img alt="1" src={spacer} />
            <img alt="1" src={spacer} />
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
                height: '28.5px',
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
                    <option key={category} value={category} data-category={category}>{category}</option>
                  ))}
            </select>
            <img alt="1" src={spacer} /><button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid  #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>Memorialize</button>
            <div>&nbsp;</div>
          </div>
        </form>
      )
      }
    </div>
  );
}
