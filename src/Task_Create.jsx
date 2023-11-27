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



export default function Task_Create(props) {
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const alertCtx = useContext(AlertContext);
  const classes = useStyles();
  const [howtos, setHowtos] = useState('');
  const [howto_id, setHowto_id] = useState('');
  const [howto_name, setHowto_name] = useState('');

  const handleSubmit = async (event) => {
    if (
      tasktargetdate != null &&
      tasktargetdatehold != "Invalid Date" &&
      tasktargetdate.isAfter(dayjs.utc())
    ) {
      event.preventDefault();
      var newtask =
      {
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
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks/create`, newtask);

        if (response.status === 200) {
          props.setCheckForRecords(!props.checkForRecords);
          toast.success(`A new Step called ${taskname} has been added.`)
        } else {
          alertCtx.error(`oops! Something went wrong#1!`);
        }
      } catch (err) {
        alertCtx.error(`oops! Something went wrong!#2`);
        console.log(err);
      }
    } else {
      event.preventDefault();
      alertCtx.warning("Valid due date required");
    }



  };

  const current = new Date();
  const datum = `${current.getFullYear()}.${current.getMonth() + 1}.${current.getDate()}`;
  const [date, setdate] = useState(current);
  const [taskname, setTaskname] = useState("");
  const [step_number, setStep_number] = useState('');
  const [taskrequirement, setTaskrequirement] = useState("");
  const [taskowner, setTaskowner] = useState("");
  const [tasktargetdatehold, setTasktargetdatehold] = useState(null);
  const [tasktargetdate, setTasktargetdate] = useState(null);
  const [taskcreatedate, setTaskcreatedate] = useState(current);
  const [taskstatus, setTaskstatus] = useState("START");
  const [projecthandle, setProjecthandle] = useState(props.project_handle);
  // const [asms, setAsms] = useState(props.asms_number);
  const [asms, setAsms] = useState("asms");
  const [tasknextstep, setTasknextstep] = useState("");
  const handleChange = (e, newVal) => setTaskowner(newVal);
  const handleDateChange = (newVal) => {
    setTasktargetdatehold(newVal.format("YYYY.M.D"));
    setTasktargetdate(newVal);
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

    // <div className='Font-Verdana-Small-Postgres'>&nbsp;







    <div className='Font-Verdana-Small-Postgres'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content=".."><img alt="1" src={spacer} /><img alt="1" src={spacer} /><GiHummingbird style={{ color: '#336791', fontSize: '25px', cursor: 'pointer' }} /></a>
        {/* &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<GiHummingbird style={{ color: '#D5441C', fontSize: '25px', cursor: 'pointer' }} /> */}
        {/* &nbsp;<b><a className='Font-Verdana-Small-Rusty-Normal'>Add a Task</a></b> */}
        <b>Create a Howto Step </b>
        <div>&nbsp;</div>
      </div>


      {isExpanded && (
        <div>
          <div>&nbsp;</div>
          <div>


            <form onSubmit={handleSubmit}>
              <div className='Font-Verdana-Small-Postgres'>

                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Step Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input style={{ height: '25.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '30px' }} placeholder="Req" type="text" value={step_number} onChange={(event) => setStep_number(event.target.value)} required />
                &nbsp; &nbsp; &nbsp; &nbsp;Step Name:&nbsp;
                <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '500px' }} type="text" onChange={(event) => setTaskname(event.target.value)} required />

                &nbsp; &nbsp; &nbsp; &nbsp;Step Objective:&nbsp;
                <input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '750px' }} type="text" onChange={(event) => setTaskrequirement(event.target.value)} />

                <div>&nbsp;</div>
                <img alt="1" src={spacer} /><img alt="1" src={spacer} /><img alt="1" src={spacer} />Supporting URL:&nbsp;&nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '650px' }} placeholder="Optional" type="text" value={taskowner} onChange={(event) => setTaskowner(event.target.value)} />

                {/* &nbsp; &nbsp; &nbsp; &nbsp;Owner:&nbsp;
                <select style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} id="dropdown" onChange={(event) => setTaskowner(event.target.value)}>
                  <option disabled selected value="">Responsible</option>
                  <option value="Conor Lynch">Conor Lynch</option>
                  <option value="Declan Lawless">Declan Lawless</option>
                  <option value="Julia Temple">Julia Temple</option>
                  <option value="Kieran Hayter">Kieran Hayter</option>
                  <option value="Liam Cearbhaill">Liam Cearbhaill</option>
                  <option value="Monique Borje">Monique Borje</option>
                  <option value="Patrick Haugh">Patrick Haugh</option>
                  <option value="Paul Bester">Paul Bester</option>
                  <option value="Ray Egan">Ray Egan</option>
                  <option value="Rosie Curran">Rosie Curran</option>
                  <option value="Simon Dowling">Simon Dowling</option>
                  <option value="Stefan Manole">Stefan Manole</option>
                </select> */}

                {/* &nbsp; &nbsp; &nbsp; &nbsp;Due:&nbsp;
                <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                  <DatePicker
                    id="Tasktargetdate"
                    format="YYYY.M.D"
                    selected={tasktargetdate}
                    onChange={handleDateChange}
                    minDate={dayjs.utc().add(1, "day")}
                    dateFormat="YYYY.M.D"
                    sx={{ height: '27.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px', width: '195px' } }} />
                </LocalizationProvider> */}

                <img alt="1" src={spacer} /><label htmlFor="dropdown">Attach to Howto:&nbsp;&nbsp;</label>
                <select className='Font-Verdana-Small-Postgres'
                  onChange={(event) => {
                    const selectedIndex = event.target.selectedIndex;
                    const selectedOption = event.target.options[selectedIndex];
                    const howto_name = selectedOption.getAttribute("data-howto_name");
                    const howto_id = selectedOption.getAttribute("data-howto_id");
                    setHowto_name(howto_name);
                    setHowto_id(howto_id);
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
                <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '27.5px', border: '1px solid #D5441C', borderRadius: '5px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer' }} >Add this Step</button>
              </div>
            </form>
            <div>Make this spacer white</div>
          </div>
        </div>
      )
      }

    </div>
  );
}
