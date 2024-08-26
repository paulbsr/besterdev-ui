import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import axios from 'axios'
import 'react-dropdown/style.css';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import { GiHummingbird, GiNestBirds, GiKiwiBird } from "react-icons/gi";
import AlertContext from '../Generic/Alerts/AlertContext';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'react-tooltip/dist/react-tooltip.css'
dayjs.extend(utc);



export default function RecordAmend(props) {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tabledata, setTabledata] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState("")
  const [colone, setcolone] = useState(null)
  const [coltwo, setcoltwo] = useState(null)
  const [colthree, setcolthree] = useState(null)
  const [colfour, setcolfour] = useState(null)
  const [coldate, setcoldate] = useState(null)
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [crDate, setCrDate] = useState(null)
  const alertCtx = useContext(AlertContext);
   
  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/records')
      .then((response) => {const sortedTabledata = response.data.sort((b, a) => b.colone.localeCompare(a.colone)); setTabledata(sortedTabledata); setError(null);}) //sort colone alphabetically
      .catch((e)=> console.error(e));}, [props.checkForRecords]);

        const handleEdit = (row) => {
          setEditing(row.id)
          setcolone(row.colone)
          setcoltwo(row.coltwo)
          setcolthree(row.colthree)
          setcolfour(row.colfour)
          setcoldate(row.coldate)
        };

        const onEditCancel = () => {
          setEditing("");
          setcolone(null)
          setcoltwo(null)
          setcolthree(null)
          setcolfour(null)
          setcoldate(null)
        };

        const handleDateChange = (newVal) => {
          setCr_DateHold(newVal.format("YYYY.M.D"));
          setCrDate(newVal);
        };

        const onEditSave = async() => {
        { 
            
        const recordPUT = {
          "colone": colone,
          "coltwo": coltwo,
          "colthree": colthree,
          "colfour": colfour,
          "coldate": crDate,
           } 
           
                            
           await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/records/update/${editing}`, recordPUT)
            .then((response) => {props.setCheckForRecords(!props.checkForRecords); alertCtx.success(`Suksesvolle PUT`); })
            .catch((error) => {alertCtx.error(error.message);})
            setCheckForRecords(!props.checkForRecords)
            onEditCancel();}
            }

          const onEditDelete = (row) => {
            axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/records/delete/${row.id}`)
            .then((response) => 
            {
              window.alert('Are you sure you want to delete');
              props.setCheckForRecords(!props.checkForRecords); 
              alertCtx.success(`Suksesvolle DEL`)})
            
            };       

  if (error) return <p>An error occurred in tableone</p>

  return (


    <div className='Font-Verdana-Small'>&nbsp; &nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Amend"><GiKiwiBird style={{ color: '#000000', fontSize: '28px', cursor: 'pointer' }} /></a>
        &nbsp;<b>Amend Candidate</b>
      </div>

      {isExpanded && (
        <div>
          <div>

            &nbsp;

            <table className="Table6">
              <thead>
                <tr>
                  <th align='center'></th>
                  <th style={{ width: '400px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>colone contains {tabledata.length} records</th>
                  <th style={{ width: '400px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>coltwo</th>
                  <th style={{ width: '400px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>colthree</th>
                  <th style={{ width: '250px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>colfour</th>
                  <th style={{ width: '100px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>coldate</th>
                </tr>
              </thead>

              <tbody>

                {tabledata.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td className="Table6 td">
                        <>
                          {row.id === editing ?
                            (
                              <>
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => onEditSave()}><a data-tooltip-id="commit" data-tooltip-content="Commit"><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><a data-tooltip-id="revert" data-tooltip-content="Revert"><PiArrowCounterClockwiseBold style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => onEditDelete(row)}><a data-tooltip-id="purge" data-tooltip-content="Purge"><FaRegTrashAlt style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                              </>
                            )
                            :
                            (
                              <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#1994AD', outline: 'none' }} type='button' onClick={() => handleEdit(row)}><a data-tooltip-id="edit" data-tooltip-content="Edit"><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                            )
                          }
                        </>
                      </td>

                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '380px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px' }} value={colone} onChange={(e) => setcolone(e.target.value)} className='cr_edit_inputfield' />) : (<a href={'www.dell.com' + (row.colone) + '"+&action=&title=' + (row.colone)} target="_blank" rel="noreferrer">{row.colone}</a>)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '380px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px' }} value={coltwo} onChange={(e) => setcoltwo(e.target.value)} className='cr_edit_inputfield' />) : (<a href={'https://dashboard.heroku.com/apps'} target="_blank" rel="noreferrer">{row.coltwo}</a>)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '380px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px' }} value={colthree} onChange={(e) => setcolthree(e.target.value)} className='cr_edit_inputfield_disc' />) : (row.colthree)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '380px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px' }} value={colfour} onChange={(e) => setcolfour(e.target.value)} className='cr_edit_inputfield' />) : (<a href={row.colfour}>As jy wil kak skryf</a>)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                        <DatePicker
                          id="cr_date"
                          format="YYYY.M.D"
                          value={crDate}
                          selected={coldate}
                          onChange={handleDateChange}
                          dateFormat="YYYY.M.D"
                          sx={{ height: '22.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.5px', width: '150px' }, '& .MuiSvgIcon-root': { height: '20px' } }}
                        />
                      </LocalizationProvider>) : new Date(row.coldate).toLocaleDateString("en-CA")}
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </div>
        </div>)}
    </div>
  );
}