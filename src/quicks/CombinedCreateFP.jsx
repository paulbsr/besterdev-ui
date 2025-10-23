import DBSearchComponentBanner from "../dbsearch/DBSearchComponentBanner";
import { useCyclopediaApi } from '../cyclopedia/CyclopediaAPIProvider';
import WebSocketComponent from "../websockets/WebSocketComponent";
import { useWebsiteApi } from '../websites/WebSiteAPIProvider';
import { GiHummingbird, GiSpiderWeb } from "react-icons/gi";
import { GiGiftOfKnowledge } from "react-icons/gi";
import BearerToken from "../oauth2.0/BearerToken";
import { TbBrandSocketIo } from "react-icons/tb";
import 'react-tooltip/dist/react-tooltip.css';
import { TbBrandOauth } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { MdTask } from "react-icons/md";
import { toast } from 'react-toastify';
import { useState } from "react";
import axios from 'axios';
import '../Fonts.css';

export default function CombinedCreateFP() {

  const current = new Date();
  const [isExpandedBearerToken, setExpandedBearerToken] = useState(false);
  const [isExpandedCyclopedia, setExpandedCyclopedia] = useState(false);
  const { websiterootdata, setRefreshWebsiterootdata } = useWebsiteApi();
  const [isExpandedWebSocket, setExpandedWebSocket] = useState(false);
  const [isExpandedWebsite, setExpandedWebsite] = useState(false);
  const [isExpandedSearch, setExpandedSearch] = useState(false);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [taskrequirement, setTaskrequirement] = useState("");
  const [tasktargetdate, setTasktargetdate] = useState(null);
  const [isExpandedTask, setExpandedTask] = useState(false);
  const { setRefreshCyclopediarootdata } = useCyclopediaApi();
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
        if (response.status === 200) { toast.success(`Task added.`) }
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
      <table>
        <tbody>
          <tr style={{ height: '20px' }}>
            <td style={{ width: '21%' }}></td>
            <td style={{
              marginLeft: '3px',
              border: '1px solid #e0dedeff',
              borderRadius: '8px',
              padding: '2px 2px',
              backgroundColor: '#f7f4f3',
              width: '50%',
              boxShadow: '10px 10px 10px rgba(0,0,0,0.2)',
              fontFamily: 'Segoe UI',
              fontSize: '16px'
            }}>
              <div>&nbsp;</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>

                <span onClick={() => setExpandedCyclopedia(!isExpandedCyclopedia)}>
                  <GiGiftOfKnowledge
                    style={{
                      color: '#4D4D4D',
                      fontSize: '17px',
                      cursor: 'pointer',
                      marginLeft: '50px',
                      marginRight: '4px'
                    }} />
                  Add to Cyclopedia
                </span>

                <span onClick={() => setExpandedWebsite(!isExpandedWebsite)}>
                  <GiSpiderWeb
                    style={{
                      color: '#4D4D4D',
                      fontSize: '17px',
                      cursor: 'pointer',
                      marginLeft: '50px',
                      marginRight: '4px'
                    }} />
                  Add a Website
                </span>

                <span onClick={() => setExpandedTask(!isExpandedTask)}>
                  <MdTask
                    style={{
                      color: '#4D4D4D',
                      fontSize: '17px',
                      cursor: 'pointer',
                      marginLeft: '50px',
                      marginRight: '4px'
                    }} />
                  Add a Task
                </span>


                <span onClick={() => setExpandedBearerToken(!isExpandedBearerToken)}>
                  <TbBrandOauth style={{ color: '#4D4D4D', fontSize: '19px', cursor: 'pointer', marginLeft: '50px', marginRight: '4px' }} />OAuth2.0</span>

                <span onClick={() => setExpandedWebSocket(!isExpandedWebSocket)}>
                  <TbBrandSocketIo style={{ color: '#4D4D4D', fontSize: '19px', cursor: 'pointer', marginLeft: '50px', marginRight: '4px' }} />WebSocket</span>

                <span onClick={() => setExpandedSearch(!isExpandedSearch)}>
                  <BsSearch style={{ color: '#4D4D4D', fontSize: '19px', cursor: 'pointer', marginLeft: '50px', marginRight: '4px' }} />Search</span>
              </div>

              <div>&nbsp;</div>

              {isExpandedCyclopedia && (
                <form onSubmit={handleSubmitCyclopedia}>
                  <input
                    style={{
                      fontFamily: 'Segoe UI',
                      height: '28.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      paddingLeft: '4px',
                      width: '300px',
                      marginLeft: '50px',
                    }}
                    placeholder="Cyclopedia Name (required)"
                    type="text"
                    value={cyclopediaName}
                    onChange={(e) => setCyclopediaName(e.target.value)}
                    required
                  />

                  <input
                    style={{
                      fontFamily: 'Segoe UI',
                      height: '28.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      paddingLeft: '4px',
                      width: '459px',
                      marginLeft: '20px'
                    }}
                    placeholder="Cyclopedia URL (optional)"
                    type="text"
                    value={cyclopediaUrl}
                    onChange={(e) => setCyclopediaUrl(e.target.value)}
                  />

                  <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{
                      marginLeft: '10px',
                      height: '28.5px',
                      border: '1px solid #336791',
                      borderRadius: '4px',
                      backgroundColor: '#ffffff',
                      color: '#336791',
                      cursor: 'pointer',
                      marginLeft: '20px'
                    }}>
                    Memorialize
                  </button>

                  <div>&nbsp;</div>

                  <textarea
                    style={{
                      fontFamily: 'Segoe UI',
                      height: '28.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      paddingLeft: '4px',
                      width: '900px',
                      marginLeft: '50px',
                      marginBottom: '20px'
                    }}
                    placeholder="Cyclopedia Description (required)"
                    type="text"
                    value={cyclopediaDesc}
                    onChange={(e) => setCyclopediaDesc(e.target.value)}
                    required
                  />
                </form>
              )
              }

              {isExpandedWebsite && (
                <form onSubmit={handleSubmitWebsite}>
                  <input
                    style={{
                      fontFamily: 'Segoe UI',
                      height: '28.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      paddingLeft: '4px',
                      width: '300px',
                      marginLeft: '50px',
                    }}
                    placeholder="Website (required)"
                    type="text"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    required
                  />

                  <input
                    style={{
                      fontFamily: 'Segoe UI',
                      height: '28.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      paddingLeft: '4px',
                      width: '459px',
                      marginLeft: '20px'
                    }}
                    placeholder="Website URL (optional)"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                  />

                  <button
                    className="Font-Verdana-Small-Postgres"
                    type="submit"
                    style={{
                      marginLeft: '10px',
                      height: '28.5px',
                      border: '1px solid #336791',
                      borderRadius: '4px',
                      backgroundColor: '#ffffff',
                      color: '#336791',
                      cursor: 'pointer',
                      marginLeft: '20px'
                    }}>
                    Memorialize
                  </button>

                  <select
                    className='Font-Segoe-QuickAdd'
                    onChange={(event) => {
                      const selectedIndex = event.target.selectedIndex;
                      const selectedOption = event.target.options[selectedIndex];
                      const category = selectedOption.getAttribute("data-category");
                      setWebsiteCat(category);
                    }}
                    id="dropdown"
                    required
                    style={{
                      height: '32.5px',
                      border: '1.25px solid #336791',
                      borderRadius: '4px',
                      padding: 0,
                      paddingLeft: '4px',
                      width: '310px',
                      marginLeft: '50px',
                      marginTop: '20px',
                      marginBottom: '20px',
                      font: 'Segoe UI',
                    }}
                  >
                    <option value="" disabled selected hidden>Category</option>
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

                      <select
                        className='Font-Segoe-QuickAdd'
                        style={{
                          height: '32.5px',
                          border: '1.25px solid #336791',
                          borderRadius: '4px',
                          padding: 0,
                          paddingLeft: '4px',
                          width: '310px',
                          marginLeft: '50px',
                          marginBottom: '20px',
                          font: 'Segoe UI',
                        }}
                        placeholder="Domain"
                        id="dropdown"
                        onChange={dropdownChange}>

                        <option value="Domain" disabled selected>Task Module</option>
                        <option value="188118" data-value2="UserStory">BesterDev User Story</option>
                        <option value="171593" data-value2="Dutch Language">Dutch Language Staatsexamen NT2</option>
                        {/* <option value="113092" data-value2="NetworkSecurity">NetworkSecurity</option>
                        <option value="14718" data-value2="EnterpriseSecurity">EnterpriseSecurity</option>
                        <option value="181268" data-value2="ComputerCloudSecurity">ComputerCloudSecurity</option> */}

                        <option value="168272" data-value2="Dissertation">Dissertation</option>

                      </select>

                      <input
                        style={{
                          fontFamily: 'Segoe UI',
                          height: '28.5px',
                          border: '1.25px solid #336791',
                          borderRadius: '4px',
                          paddingLeft: '4px',
                          width: '459px',
                          marginLeft: '20px',
                        }}
                        placeholder="Task Name"
                        type="text"
                        value={taskname}
                        onChange={(event) => setTaskname(event.target.value)}
                        required
                      />

                      <button
                        className="Font-Verdana-Small-Postgres"
                        type="submit"
                        style={{
                          marginLeft: '10px',
                          height: '28.5px',
                          border: '1px solid #336791',
                          borderRadius: '4px',
                          backgroundColor: '#ffffff',
                          color: '#336791',
                          cursor: 'pointer',
                          marginLeft: '20px'
                        }}>
                        Memorialize
                      </button>

                      <div>
                        <input style={{
                          fontFamily: 'Segoe UI',
                          height: '28.5px',
                          border: '1.25px solid #336791',
                          borderRadius: '4px',
                          paddingLeft: '4px',
                          width: '459px',
                          marginLeft: '50px',
                          marginBottom: '20px'
                        }}
                          placeholder="Task Description"
                          type="text"
                          onChange={(event) => setTaskrequirement(event.target.value)}
                        />

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <DatePicker
                          selected={tasktargetdate}
                          onChange={(date) => setTasktargetdate(date)}
                          dateFormat="yyyy.MM.dd"
                          minDate={new Date()}
                          placeholderText="Target Date"
                        />
                      </div>

                    </form>
                  </div>
                </div>
              )
              }
            </td>
            <td style={{ width: '21%' }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
