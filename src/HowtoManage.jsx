import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import axios from 'axios'
import 'react-dropdown/style.css';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import { FaFileCircleQuestion } from "react-icons/fa6";
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import { MdManageAccounts } from "react-icons/md";
import AlertContext from './Generic/Alerts/AlertContext';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'react-tooltip/dist/react-tooltip.css'
import CandidateCreate from './CandidateCreate';
import GradientLine from './GradientLine';
import { toast } from 'react-toastify';
import GradientLineRusty from './GradientLineRusty';
import HowtoCreate from './HowtoCreate';
import HowtoStepCreate from './HowtoStepCreate';
dayjs.extend(utc);



export default function HowtoManage() {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tabledata, setTabledata] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState("")
  const [howto_name, setHowto_name] = useState(null)
  const [howto_desc, setHowto_desc] = useState(null)
  const [howto_author, setHowto_author] = useState(null)
  const [howto_date, setHowto_date] = useState(null)
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [crDate, setCrDate] = useState(null)
  const alertCtx = useContext(AlertContext);
   
  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos')
      .then((response) => {const sortedTabledata = response.data.sort((b, a) => b.howto_name.localeCompare(a.howto_name)); 
        setTabledata(sortedTabledata);}) //sort firstname alphabetically
      .catch((e)=> console.error(e));}, 
      [checkForRecords]);

        const handleEdit = (row) => {
          setEditing(row.howto_id)
          setHowto_name(row.howto_name)
          setHowto_desc(row.howto_desc)
          setHowto_author(row.howto_author)
          setHowto_date(row.howto_date)
        };

        const onEditCancel = () => {
          setEditing("");
          setHowto_name(null)
          setHowto_desc(null)
          setHowto_author(null)
          setHowto_date(null)
        };

        const handleDateChange = (newVal) => {
          setCr_DateHold(newVal.format("YYYY.M.D"));
          setCrDate(newVal);
        };

        const onEditSave = async() => {
        { 
            
        const howtoPUT = {
          "howto_name": howto_name,
          "howto_desc": howto_desc,
          "howto_author": howto_author,
          "howto_date": howto_date,
        } 
           
                            
           await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos/update/${editing}`, howtoPUT)
           .then((response) => {
            setCheckForRecords(!checkForRecords); 
            toast.success(`${howto_name} updated.`)
          }
          )
           onEditCancel();
         }
       }

          const onEditDelete = (row) => {
            axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howtos/delete/${row.howto_id}`)
            .then((response) => {
              setCheckForRecords(!checkForRecords); 
              toast.success(`${howto_name} purged.`)
            }
            )
       };       

  if (error) return <p>An error occurred in tableone</p>

  return (
    


    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
    
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        &nbsp; &nbsp; <a data-tooltip-id="insert" data-tooltip-content="Amend"><FaFileCircleQuestion style={{ color: '#336791', fontSize: '38px', cursor: 'pointer' }} /></a>
        &nbsp;<b>Manage Howtos ({tabledata.length})</b>
      </div>

      {isExpanded && (
        <div>
          <div>

          <HowtoCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>

          <HowtoStepCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>

            <table className="Table6">
              <thead>
                <tr>
                  <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
                  <th style={{ width: '450px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Howto name</th>
                  <th style={{ width: '900px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Description</th>
                  <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Created By</th>
                  <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Last Touched</th>
                </tr>
              </thead>

              <tbody>
                {tabledata.map((row) => {
                  return (
                    <tr key={row.howto_id}>
                      <td className="Table6 td ">
                        <>
                          <Tooltip id="edit" />
                          <Tooltip id="commit" />
                          <Tooltip id="revert" />
                          <Tooltip id="purge" />
                          {row.howto_id === editing ?
                            (
                              <>
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none' }} type='button' onClick={() => onEditSave()}><a data-tooltip-id="commit" data-tooltip-content="Commit"><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><a data-tooltip-id="revert" data-tooltip-content="Revert"><PiArrowCounterClockwiseBold style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => onEditDelete(row)}><a data-tooltip-id="purge" data-tooltip-content="Purge"><FaRegTrashAlt style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                              </>
                            )
                            :
                            (
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => handleEdit(row)}><a data-tooltip-id="edit" data-tooltip-content="Edit"><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                            )
                          }
                        </>
                      </td>

                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<input style={{ height: '22.5px', width: '440px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_name} onChange={(e) => setHowto_name(e.target.value)} className='cr_edit_inputfield' />) : (row.howto_name)}</td>
                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<input style={{ height: '22.5px', width: '880px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_desc} onChange={(e) => setHowto_desc(e.target.value)} className='cr_edit_inputfield' />) : (row.howto_desc)}</td>
                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_author} onChange={(e) => setHowto_author(e.target.value)} className='cr_edit_inputfield_disc' />) : (row.howto_author)}</td>
                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<input style={{ height: '22.5px', width: '90px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_date} onChange={(e) => setHowto_date(e.target.value)} className='cr_edit_inputfield' />) : (row.howto_date)}</td> 
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
            <div>&nbsp;</div>
            <GradientLineRusty />
            <div>&nbsp;</div>
          </div>
        </div>
        )
        }
    </div>
  );
}