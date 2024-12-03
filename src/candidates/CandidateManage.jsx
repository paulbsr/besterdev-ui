import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import '../Fonts.css';
import axios from 'axios'
import 'react-dropdown/style.css';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import { MdManageAccounts } from "react-icons/md";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import CandidateCreate from './CandidateCreate';
import { toast } from 'react-toastify';
import GradientLineRusty from '../gradientlines/GradientLineRusty';
dayjs.extend(utc);



export default function CandidateManage() {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tabledata, setTabledata] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState("")
  const [firstname, setfirstname] = useState(null)
  const [lastname, setlastname] = useState(null)
  const [email, setemail] = useState(null)
  const [mobile, setmobile] = useState(null)
  const [dob, setdob] = useState(null)
  const [jobdesc, setjobdesc] = useState(null)
  const [skill1, setskill1] = useState(null)
  const [comment, setcomment] = useState(null)
  const [status, setstatus] = useState(null)
  const [role, setRole] = useState(null);
  const [reqnum, setReqnum] = useState(null);
  const [employer, setEmployer] = useState(null);
  const [cr_datehold, setCr_DateHold] = useState(null)
  const [crDate, setCrDate] = useState(null)
   
  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates')
      .then((response) => {const sortedTabledata = response.data.sort((b, a) => b.firstname.localeCompare(a.firstname)); 
        setTabledata(sortedTabledata);}) //sort firstname alphabetically
      .catch((e)=> console.error(e));}, 
      [checkForRecords]);

        const handleEdit = (row) => {
          setEditing(row.id)
          setfirstname(row.firstname)
          setlastname(row.lastname)
          setemail(row.email)
          setmobile(row.mobile)
          setdob(row.dob)
          setjobdesc(row.jobdesc)
          setskill1(row.skill1)
          setcomment(row.comment)
          setstatus(row.status)
          setRole(row.role)
          setReqnum(row.reqnum)
          setEmployer(row.employer)

        };

        const onEditCancel = () => {
          setEditing("");
          setfirstname(null)
          setlastname(null)
          setemail(null)
          setmobile(null)
          setdob(null)
          setjobdesc(null)
          setskill1(null)
          setcomment(null)
          setstatus(null)
          setRole(null)
          setReqnum(null)
          setEmployer(null)
        };

        const handleDateChange = (newVal) => {
          setCr_DateHold(newVal.format("YYYY.M.D"));
          setCrDate(newVal);
        };

        const onEditSave = async() => {
        { 
            
        const candidatePUT = {
          "firstname": firstname,
          "lastname": lastname,
          "email": email,
          "mobile": mobile,
          "dob": crDate,
          "jobdesc": jobdesc,
          "skill1":skill1,
          "comment":comment,
          "status":status,
          "role": role,
          "reqnum": reqnum,
          "employer": employer
        } 
           
                            
           await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/update/${editing}`, candidatePUT)
           .then((response) => {
            setCheckForRecords(!checkForRecords); 
            toast.success(`${firstname} ${lastname} has been updated.`)
          }
          )
           onEditCancel();
         }
       }

          const onEditDelete = (row) => {
            axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/candidates/delete/${row.id}`)
            .then((response) => {
              setCheckForRecords(!checkForRecords); 
              window.alert('Are you sure you want to delete');
              toast.success(`${firstname} ${lastname} has been purged.`)
            }
            )
       };       

  if (error) return <p>An error occurred in tableone</p>

  return (
    


    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
    
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        &nbsp; &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Amend">
          <MdManageAccounts style={{ color: '#336791', fontSize: '45px', cursor: 'pointer' }} /></a>
        &nbsp;<b style={{ fontFamily: "Verdana", fontSize: "medium", fontWeight: "bold", color: "#336791" }}>Manage Candidates / Commodoties ({tabledata.length})</b>
      </div>

      {isExpanded && (
        <div>
          <div>

          <CandidateCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>

            <table className="Table6">
              <thead>
                <tr>
                  <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
                  <th style={{ width: '70px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Firstname</th>
                  <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Lastname</th>
                  <th style={{ width: '250px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>eMail</th>
                  <th style={{ width: '150px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Mobile</th>
                  <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Date Found</th>
                  <th style={{ width: '150px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Job Title</th>
                  <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Primary Skill</th>
                  <th style={{ width: '300px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Comment</th>
                  <th style={{ width: '150px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Employer</th>
                  <th style={{ width: '150px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Role</th>
                  <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>ReqNum</th>
                </tr>
              </thead>

              <tbody>
                {tabledata.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td className="Table6 td ">
                        <>
                          <Tooltip id="edit" />
                          <Tooltip id="commit" />
                          <Tooltip id="revert" />
                          <Tooltip id="purge" />
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
                                <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => handleEdit(row)}><a data-tooltip-id="edit" data-tooltip-content="Edit"><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                            )
                          }
                        </>
                      </td>

                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '60px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={firstname} onChange={(e) => setfirstname(e.target.value)} />) : (row.firstname)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '90px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={lastname} onChange={(e) => setlastname(e.target.value)} />) : (row.lastname)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '240px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={email} onChange={(e) => setemail(e.target.value)} className='cr_edit_inputfield_disc' />) : (<a href={'mailto: ${row.email}'} target="_blank" rel="noreferrer">{row.email}</a>)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '120px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={mobile} onChange={(e) => setmobile(e.target.value)} />) : (row.mobile)}</td> 
                      <td className="asmshover Table6 td">{row.id === editing ? 
                      (
                      <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                        <DatePicker
                          id="cr_date"
                          format="YYYY.M.D"
                          value={crDate}
                          selected={dob}
                          onChange={handleDateChange}
                          dateFormat="YYYY.M.D"
                          sx={{ height: '22.5px', '& .MuiInputBase-root': { height: '100%', fontSize: '13.5px', width: '90px' }, '& .MuiSvgIcon-root': { height: '20px' } }}/>
                      </LocalizationProvider>
                      )
                      : 
                      new Date(row.dob).toLocaleDateString("en-CA")}
                      </td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '140px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={jobdesc} onChange={(e) => setjobdesc(e.target.value)} />) : (row.jobdesc)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={skill1} onChange={(e) => setskill1(e.target.value)} />) : (row.skill1)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '290px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={comment} onChange={(e) => setcomment(e.target.value)} />) : (row.comment)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '140px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={employer} onChange={(e) => setEmployer(e.target.value)} />) : (row.employer)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '140px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={role} onChange={(e) => setRole(e.target.value)} />) : (row.role)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '90px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={reqnum} onChange={(e) => setReqnum(e.target.value)} />) : (row.reqnum)}</td>
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