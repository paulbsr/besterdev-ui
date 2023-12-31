import React, { useState, useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "./Fonts.css";
import AlertContext from "./Generic/Alerts/AlertContext";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { GiHummingbird } from "react-icons/gi";
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import spacer from './graphix/besterdev_spacer_white.png';
import spacer2 from './graphix/besterdev_spacer_white_half.png';
dayjs.extend(utc);


const useStyles = styled((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: { width: "100%", marginTop: theme.spacing(3) },
  submit: { margin: theme.spacing(3, 0, 2) },
}));



export default function New_Task_Create(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const alertCtx = useContext(AlertContext);
  const classes = useStyles();
  const [howtos, setHowtos] = useState('');
  const [howto_id, setHowto_id] = useState('');
  const [howto_name, setHowto_name] = useState('');
  const current = new Date();
  const datum = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
  const [date, setdate] = useState(current);
  const [taskname, setTaskname] = useState("");
  const [taskrequirement, setTaskrequirement] = useState("");
  const [taskowner, setTaskowner] = useState(""); //This has become "TaskURL"
  const [tasktargetdatehold, setTasktargetdatehold] = useState(null);
  const [tasktargetdate, setTasktargetdate] = useState(null);
  const [taskcreatedate, setTaskcreatedate] = useState(current);
  const [taskstatus, setTaskstatus] = useState("Parent HOWTO");
  const [projecthandle, setProjecthandle] = useState(props.projecthandle); //This became "Step Number" as in Step-"19"
  const [asms, setAsms] = useState("asms"); //This will become the HOWTO's ID or Name
  
  const handleChange = (e, newVal) => setTaskowner(newVal);
  
  const handleDateChange = (newVal) => {
    setTasktargetdatehold(newVal.format("YYYY.M.D"));
    setTasktargetdate(newVal);
  };

  const handleSubmit = async (event) => {
    {
      event.preventDefault();
      
      var newtask =
      {
        taskname: taskname, //Step Name
        taskrequirement: taskrequirement, //Step Objective
        taskowner: taskowner, //Step URL
        tasktargetdate: tasktargetdate,
        taskcreatedate: taskcreatedate,
        taskstatus: taskstatus, //Parent Howto
        asms: asms,
        projecthandle: projecthandle, //Step Number
      };

        // const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/create`, newtask);
        const response = await axios.post(`http://localhost:8000/api/v1/tasks/create`, newtask);

        if (response.status === 200) 
        {
          props.setCheckForRecords(!props.checkForRecords);
          toast.success(`A new Step called ${taskname} has been added.`)
        } 
        else {alertCtx.error(`oops! Something went wrong#1!`); }
    } 
  };

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      .then((response) => {
        const howtos = response.data.sort((b, a) => b.howto_name.localeCompare(a.howto_name));
        console.log(howtos);
        setHowtos(howtos);
      })
  },
    []);

  return (


    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Insert additional Step"><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        <b>Create an additional Howto Step </b>
        <div>&nbsp;</div>
      </div>


      {isExpanded && (
        <div>
          <div>&nbsp;</div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className='Font-Verdana-Small-Postgres'>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Step Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '30px' }} placeholder="Req" type="text" value={projecthandle} onChange={(event) => setProjecthandle(event.target.value)} required />
                &nbsp; &nbsp; &nbsp; &nbsp;Step Name:&nbsp;
                <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} type="text" onChange={(event) => setTaskname(event.target.value)} required />

                &nbsp; &nbsp; &nbsp; &nbsp;Step Objective:&nbsp;
                <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '750px' }} type="text" onChange={(event) => setTaskrequirement(event.target.value)} />

                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} />Supporting URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '653px' }} placeholder="Optional" type="text" value={taskowner} onChange={(event) => setTaskowner(event.target.value)} />

                <img alt="1" src={spacer} /><label htmlFor="dropdown">Attach to Howto:&nbsp;&nbsp;</label>
                <select className='Font-Verdana-Small-Postgres'
                  onChange={(event) => {
                    const selectedIndex = event.target.selectedIndex;
                    const selectedOption = event.target.options[selectedIndex];
                    const howto_name = selectedOption.getAttribute("data-howto_name");
                    const howto_id = selectedOption.getAttribute("data-howto_id");
                    setTaskstatus(howto_name);
                  }}
                  id="dropdown"
                  style={{
                    height: '27.5px',
                    border: '1.25px solid #c4c4c4',
                    borderRadius: '4px',
                    padding: 0,
                    paddingLeft: '10px',
                    width: '300px'
                  }}
                >

                  <option disabled selected value="">Howto Name</option>

                  {howtos && howtos.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                      data-howto_name={option.howto_name} // Store company data as an attribute
                      data-howto_id={option.howto_id} // Store company data as an attribute
                    >{option.howto_name}
                    </option>
                  ))}
                </select>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }} >Add this Step</button>
              </div>
            </form>
            <div className='Font-Spacer-White'>Make this spacer white</div>
          </div>
        </div>
      )
      }
    </div>
  );
}
