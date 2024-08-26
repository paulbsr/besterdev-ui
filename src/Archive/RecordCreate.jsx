import React, { useState, useContext } from "react";
import AlertContext from "./Generic/Alerts/AlertContext";
import axios from 'axios';
import './Fonts.css';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import spacer from './graphix/besterdev_spacer_white.png'
import spacer2 from './graphix/besterdev_spacer_white_half.png'
import { GiHummingbird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import RecordAmend from "./RecordAmend";
dayjs.extend(utc);


export default function RecordCreate(props) {
  const alertCtx = useContext(AlertContext);
  const [colone, setcolone] = useState('');
  const [cr_date, setcr_date] = useState(null);
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [coltwo, setcoltwo] = useState('');
  const [colthree, setcolthree] = useState('');
  const [colfour, setcolfour] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };

  const handleDateChange = (newVal) => {
    setCr_DateHold(newVal.format("YYYY.M.D"));
    setcr_date(newVal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      cr_date != null &&
      cr_datehold != "Invalid Date"
    ) {
      var newRecord = {
        'colone': colone,
        'coldate': cr_date,
        'coltwo': coltwo,
        'colthree': colthree,
        'colfour': colfour,
      }

      try {
        const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/records/create`, newRecord);
        if (response.status === 200) { props.setCheckForRecords(!props.checkForRecords); alertCtx.success(`${colone} memorialized`); }

        else { alertCtx.error(`oops! Something went wrong!`); }
      }

      catch (err) { alertCtx.error(`oops! Something went wrong!`); console.log(err); }
    }
    else {
      event.preventDefault();
      alertCtx.warning("Valid CR date required");
    }
  }


  return (

    <div className='Font-Verdana-Small'>&nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        <a data-tooltip-id="insert" data-tooltip-content="Insert"><GiHummingbird style={{ color: '#000000', fontSize: '35px', cursor: 'pointer' }} /></a>
        <b>Insert Candidate</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            <form onSubmit={handleSubmit}>
              <div><img alt="1" src={spacer2} /></div>
              <div><img alt="1" src={spacer} />colone:&nbsp; &nbsp; &nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Required" type="text" value={colone} onChange={(event) => setcolone(event.target.value)} required /></div>
              <div>&nbsp;</div>
              <div><img alt="1" src={spacer} />coltwo:&nbsp; &nbsp; &nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Required" type="text" value={coltwo} onChange={(event) => setcoltwo(event.target.value)} required /></div>
              <div>&nbsp;</div>
              <div><img alt="1" src={spacer} />colthree:&nbsp; &nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Required" type="text" value={colthree} onChange={(event) => setcolthree(event.target.value)} /></div>
              <div>&nbsp;</div>
              <div><img alt="1" src={spacer} />colfour:&nbsp; &nbsp; &nbsp;<input style={{ height: '27.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} placeholder="Required" type="text" value={colfour} onChange={(event) => setcolfour(event.target.value)} /></div>
              <div>&nbsp;</div>
              <div><img alt="1" src={spacer} />coldate:&nbsp; &nbsp; &nbsp;<LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                <DatePicker
                  id="cr_date"
                  format="YYYY.M.D"
                  selected={cr_date}
                  onChange={handleDateChange}
                  dateFormat="YYYY.M.D"
                  sx={{ height: '30px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.3px' } }}
                />
              </LocalizationProvider>
                <button className="Font-Verdana-Small" type="submit" style={{ marginLeft: '10px', height: '30px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#336791 ', cursor: 'pointer' }}>Commit</button>
              </div>
            </form>
          </div>
        </div>)}
    </div>

  );
}
