import React, { useState } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css';
import { toast } from 'react-toastify';
import { useWebsiteApi } from './WebSiteAPIProvider';
import DatePicker from "react-datepicker";


export default function CombinedCreateFP() {
  const [isExpandedCyclopedia, setExpandedCyclopedia] = useState(false);
  const [isExpandedWebsite, setExpandedWebsite] = useState(false);
  const [isExpandedTask, setExpandedTask] = useState(false);

  const [cyclopediaName, setCyclopediaName] = useState('');
  const [cyclopediaDesc, setCyclopediaDesc] = useState('');
  const [cyclopediaUrl, setCyclopediaUrl] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);

  const [websiteName, setWebsiteName] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCat, setWebsiteCat] = useState('');
  const { websiterootdata } = useWebsiteApi();

  const current = new Date();
  const [taskname, setTaskname] = useState("");
  const [taskrequirement, setTaskrequirement] = useState("");
  const [taskowner, setTaskowner] = useState("Bester");
  const [tasktargetdate, setTasktargetdate] = useState(null);
  const [taskcreatedate, setTaskcreatedate] = useState(current);
  const [taskstatus, setTaskstatus] = useState("START");
  const [projecthandle, setProjecthandle] = useState("");
  const [asms, setAsms] = useState("");
  const [tasknextstep, setTasknextstep] = useState("");
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);

  const dropdownChange = (event) => {
    const selectedIndex = event.target.options.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    setAsms(event.target.value);
    setProjecthandle(selectedOption.getAttribute('data-value2') || "");
  }

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


  const handleSubmitTask = async (event) => {
    if (
      tasktargetdate !== null
    ) {
      event.preventDefault();
      var newtask = {
        taskname: taskname,
        taskrequirement: taskrequirement,
        taskowner: taskowner,
        tasktargetdate: tasktargetdate,
        taskcreatedate: taskcreatedate,
        taskstatus: taskstatus,
        asms: asms,
        projecthandle: projecthandle,
        tasknextstep: tasknextstep,
      };
      try {
        const response = await axios.post
          (`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/create`, newtask);
        if (response.status === 200) {
          { toast.success(`Task added.`) }
        }
        else { toast.error('Task not added'); }
      }
      catch (err) {
        console.log(err);
      }
    } else {
      event.preventDefault();

    }
  };

  return (
    <div className='Font-Verdana-Small-Postgres'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
        <b onClick={() => setExpandedCyclopedia(!isExpandedCyclopedia)}>&nbsp;&nbsp;&nbsp;&nbsp;
          <GiHummingbird style={{ color: '#336791', fontSize: '25px' }} />Add to Cyclopedia</b>
        <b onClick={() => setExpandedWebsite(!isExpandedWebsite)}>&nbsp;&nbsp;&nbsp;&nbsp;
          <GiHummingbird style={{ color: '#336791', fontSize: '25px' }} />Add a Website</b>
        <b onClick={() => setExpandedTask(!isExpandedTask)}>&nbsp;&nbsp;&nbsp;&nbsp;
          <GiHummingbird style={{ color: '#336791', fontSize: '25px' }} />Add a Task</b>
      </div>

      {isExpandedCyclopedia && (
        <form onSubmit={handleSubmitCyclopedia}>
          <div>&nbsp;</div>
          <img alt="spacer" src={spacer} />Cyclopedia:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '500px' }}
            placeholder="Required"
            type="text"
            value={cyclopediaName}
            onChange={(e) => setCyclopediaName(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />URL:&nbsp;&nbsp;
          
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
          <img alt="spacer" src={spacer} />Description:&nbsp;&nbsp;
          <textarea
            style={{ fontFamily: 'Verdana', height: '26.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '1450px' }}
            placeholder="Required"
            value={cyclopediaDesc}
            onChange={(e) => setCyclopediaDesc(e.target.value)}
            required
          />
        </form>
      )
      }

      {isExpandedWebsite && (
        <form onSubmit={handleSubmitWebsite}>
          <div>&nbsp;</div>
          <img alt="spacer" src={spacer} />Website:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '500px' }}
            placeholder="Required"
            type="text"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />URL:&nbsp;&nbsp;
          <input
            style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '10px', width: '650px' }}
            placeholder="Required"
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
          />
          <img alt="spacer" src={spacer} />Category:&nbsp;&nbsp;

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
            <option disabled selected value=""></option>
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
      )
      }

      {isExpandedTask && (
        <div>
          <div>&nbsp;</div>
          <div>
            <form onSubmit={handleSubmitTask}>
              <div>
                <div style={{ display: "flex" }}>

                  <img alt="spacer" src={spacer} />Module:&nbsp;&nbsp;
                  <select
                    style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '150px' }} placeholder="Domain" id="dropdown" onChange={dropdownChange} >
                    <option disabled selected value="Domain">Module</option>
                    <option value="113092" data-value2="NetworkSecurity">NetworkSecurity</option>
                    <option value="14718" data-value2="EnterpriseSecurity">EnterpriseSecurity</option>
                    <option value="181268" data-value2="ComputerCloudSecurity">ComputerCloudSecurity</option>
                    <option value="171593" data-value2="AppliedCryptography">AppliedCryptography</option>
                    <option value="168272" data-value2="Dissertation">Dissertation</option>
                  </select>

                  <div>
                    
                  <img alt="spacer" src={spacer} />Task Name:&nbsp;&nbsp;
                    <input style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '400px' }} placeholder="Required" type="text" onChange={(event) => setTaskname(event.target.value)} required />
                  </div>
                  <div>
                  <img alt="spacer" src={spacer} />Description:&nbsp;&nbsp;
                    <input style={{ height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '550px' }} type="text" onChange={(event) => setTaskrequirement(event.target.value)} />
                  </div>

                  <div>
                  <img alt="spacer" src={spacer} />Target:&nbsp;&nbsp;
                  </div>
                  <div>
                    <DatePicker
                      selected={tasktargetdate}
                      onChange={(date) => setTasktargetdate(date)}
                      dateFormat="yyyy.MM.dd"
                      minDate={new Date()}
                      placeholderText="Target Date"
                      style={{ height: '27.7px' }}
                    />
                  </div>

                  <div>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    {/* <button className="Font-Segoe-Small" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }} onClick={() => setTaskstatus("START")}>Commit new Task</button> */}
                    <button
            className="Font-Segoe-Small"
            type="submit"
            style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
            Memorialize
          </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
      }
    </div>
  );
}
