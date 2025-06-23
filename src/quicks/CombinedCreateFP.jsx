import DBSearchComponentBanner from "../dbsearch/DBSearchComponentBanner";
import { useCyclopediaApi } from '../cyclopedia/CyclopediaAPIProvider';
import WebSocketComponent from "../websockets/WebSocketComponent";
import { useWebsiteApi } from '../websites/WebSiteAPIProvider';
import WebSocketTrigger from "../websockets/websockettrigger";
import { GiHummingbird, GiSpiderWeb } from "react-icons/gi";
import WebSocketEvent from '../websockets/WebSocketEvent';
import { GiGiftOfKnowledge } from "react-icons/gi";
import BearerToken from "../oauth2.0/BearerToken";
import { TbBrandSocketIo } from "react-icons/tb";
import 'react-tooltip/dist/react-tooltip.css';
import { TbBrandOauth } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { MdTask } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import '../Fonts.css';



export default function CombinedCreateFP() {

  const current = new Date();
  const [isExpandedBearerToken, setExpandedBearerToken] = useState(false);
  const { websiterootdata, setRefreshWebsiterootdata } = useWebsiteApi();
  const [isExpandedCyclopedia, setExpandedCyclopedia] = useState(false);
  const [isExpandedWebSocket, setExpandedWebSocket] = useState(false);
  const [isExpandedWebsite, setExpandedWebsite] = useState(false);
  const [isExpandedSearch, setExpandedSearch] = useState(false);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const { setRefreshCyclopediarootdata } = useCyclopediaApi();
  const [taskrequirement, setTaskrequirement] = useState("");
  const [tasktargetdate, setTasktargetdate] = useState(null);
  const [isExpandedTask, setExpandedTask] = useState(false);
  const [cyclopediaName, setCyclopediaName] = useState('');
  const [cyclopediaDesc, setCyclopediaDesc] = useState('');
  const [projecthandle, setProjecthandle] = useState("");
  const [cyclopediaUrl, setCyclopediaUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCat, setWebsiteCat] = useState('');
  const [taskname, setTaskname] = useState("");
  const [taskcreatedate] = useState(current);
  const [taskowner] = useState("Bester");
  const [taskstatus] = useState("START");
  const [asms, setAsms] = useState("");
  const [tasknextstep] = useState("");

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
        setRefreshCyclopediarootdata(prev => !prev);
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
        setRefreshWebsiterootdata(prev => !prev);
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

    <div className='Font-Segoe-Small'>
      <div>&nbsp;</div>
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <tbody>
          <tr style={{ height: '20px' }}>
            <td style={{ width: '20%' }}></td>
            <td style={{
              marginLeft: '3px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '2px 2px',
              backgroundColor: '#f7f4f3',
              width: '50%',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
              fontFamily: 'Verdana',
            }}>
              <div>&nbsp;</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>

                <span onClick={() => setExpandedCyclopedia(!isExpandedCyclopedia)}>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Add <GiHummingbird style={{ color: '#4D4D4D', fontSize: '25px' }} />
                  <GiGiftOfKnowledge style={{ color: '#4D4D4D', fontSize: '17px', cursor: 'pointer' }} /> to Cyclopedia</span>

                <span onClick={() => setExpandedWebsite(!isExpandedWebsite)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Add <GiHummingbird style={{ color: '#4D4D4D', fontSize: '25px' }} />
                  <GiSpiderWeb style={{ color: '#4D4D4D', fontSize: '17px', cursor: 'pointer' }} /> a Website</span>

                <span onClick={() => setExpandedTask(!isExpandedTask)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Add <GiHummingbird style={{ color: '#4D4D4D', fontSize: '25px' }} />
                  <MdTask style={{ color: '#4D4D4D', fontSize: '17px', cursor: 'pointer' }} /> a Task</span>

                <span onClick={() => setExpandedBearerToken(!isExpandedBearerToken)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TbBrandOauth style={{ color: '#4D4D4D', fontSize: '19px', cursor: 'pointer' }} /> OAuth2.0</span>

                <span onClick={() => setExpandedWebSocket(!isExpandedWebSocket)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TbBrandSocketIo style={{ color: '#4D4D4D', fontSize: '19px', cursor: 'pointer' }} /> WebSocket</span>

                <span onClick={() => setExpandedSearch(!isExpandedSearch)}>&nbsp;&nbsp;&nbsp;&nbsp;
                  <BsSearch style={{ color: '#4D4D4D', fontSize: '19px', cursor: 'pointer' }} /> Search</span>
              </div>

              <div>&nbsp;</div>

              {isExpandedCyclopedia && (
                <form onSubmit={handleSubmitCyclopedia}>
                  <div>&nbsp;</div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Cyclopedia:&nbsp;&nbsp;
                  <input
                    style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '4px', width: '300px' }}
                    placeholder="Required"
                    type="text"
                    value={cyclopediaName}
                    onChange={(e) => setCyclopediaName(e.target.value)}
                    required
                  />

                  {/* <div>&nbsp;</div> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  URL:&nbsp;&nbsp;

                  <input
                    style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '4px', width: '500px' }}
                    type="text"
                    value={cyclopediaUrl}
                    onChange={(e) => setCyclopediaUrl(e.target.value)}
                  />


                  <div>&nbsp;</div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Description:&nbsp;
                  <textarea
                    style={{ fontFamily: 'Verdana', height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '2px', width: '880px' }}
                    placeholder="Required"
                    value={cyclopediaDesc}
                    onChange={(e) => setCyclopediaDesc(e.target.value)}
                    required
                  />

                  <div>&nbsp;</div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ marginLeft: '10px', height: '22.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
                    Memorialize
                  </button>
                  <div>&nbsp;</div>
                </form>

              )
              }

              {isExpandedWebsite && (
                <form onSubmit={handleSubmitWebsite}>
                  <div>&nbsp;</div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Website:&nbsp;&nbsp;&nbsp;
                  <input
                    style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '4px', width: '343px' }}
                    placeholder="Required"
                    type="text"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    required
                  />

                  {/* <div>&nbsp;</div> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  URL:&nbsp;&nbsp;
                  <input
                    style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', paddingLeft: '4px', width: '500px' }}
                    placeholder="Required"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />

                  <div>&nbsp;</div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  Category:&nbsp;&nbsp;

                  <select
                    className='Font-Verdana-QuickAdd'
                    onChange={(event) => {
                      const selectedIndex = event.target.selectedIndex;
                      const selectedOption = event.target.options[selectedIndex];
                      const category = selectedOption.getAttribute("data-category");
                      setWebsiteCat(category);
                    }}
                    id="dropdown"
                    required
                    style={{
                      height: '27.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      padding: 0,
                      paddingLeft: '5px',
                      width: '295px',
                    }}
                  >
                    <option value="" disabled selected hidden>Required</option>
                    {websiterootdata &&
                      Array.from(new Set(websiterootdata.map(option => option.websiteCat)))
                        .sort()
                        .filter(category => !category.startsWith("HOWTO"))
                        .map(category => (
                          <option key={category} value={category} data-category={category}>
                            {category}
                          </option>
                        ))}
                  </select>

                  {/* <div>&nbsp;</div> */}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{ marginLeft: '10px', height: '24.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
                    Memorialize
                  </button>
                  <div>&nbsp;</div>
                </form>
              )
              }


              {isExpandedBearerToken && <BearerToken />}

              {isExpandedWebSocket && (<><WebSocketComponent /></>)}

              {isExpandedSearch && <DBSearchComponentBanner />}


              {isExpandedTask && (
                <div>
                  <div>
                    <form onSubmit={handleSubmitTask}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Module:&nbsp;&nbsp;
                      <select
                        style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '4px', width: '250px' }} placeholder="Domain" id="dropdown" onChange={dropdownChange} >
                        <option disabled selected value="Domain">Module</option>
                        <option value="113092" data-value2="NetworkSecurity">NetworkSecurity</option>
                        <option value="14718" data-value2="EnterpriseSecurity">EnterpriseSecurity</option>
                        <option value="181268" data-value2="ComputerCloudSecurity">ComputerCloudSecurity</option>
                        <option value="171593" data-value2="AppliedCryptography">AppliedCryptography</option>
                        <option value="168272" data-value2="Dissertation">Dissertation</option>
                        <option value="188118" data-value2="UserStory">UserStory</option>
                      </select>


                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Task Name:&nbsp;&nbsp;
                        <input style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '4px', width: '530px' }} placeholder="Required" type="text" onChange={(event) => setTaskname(event.target.value)} required />


                      <div>
                        <div>&nbsp;</div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Description:&nbsp;&nbsp;
                        <input style={{ height: '22.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '4px', width: '500px' }} type="text" onChange={(event) => setTaskrequirement(event.target.value)} />

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Target:&nbsp;&nbsp;

                        <DatePicker
                          selected={tasktargetdate}
                          onChange={(date) => setTasktargetdate(date)}
                          dateFormat="yyyy.MM.dd"
                          minDate={new Date()}
                          placeholderText="Target Date"
                          style={{ height: '27.7px' }}
                        />

                        &nbsp;&nbsp;&nbsp;
                        <button
                          className="Font-Segoe-Small"
                          type="submit"
                          style={{ marginLeft: '10px', height: '22.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>
                          Memorialize
                        </button>
                        <div>&nbsp;</div>
                      </div>
                    </form>
                  </div>
                </div>
              )
              }
            </td>
            <td style={{ width: '20%' }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
