import { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import '../Fonts.css';
import axios from 'axios'
import 'react-dropdown/style.css';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import { BsSignpostFill } from "react-icons/bs";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'react-tooltip/dist/react-tooltip.css'
import JobreqCreate from './JobreqCreate';
import { toast } from 'react-toastify';
import GradientLineRusty from '../gradientlines/GradientLineRusty';
dayjs.extend(utc);



export default function JobreqManage() {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [jobreqdata, setJobreqdata] = useState([]);
  const [editing, setEditing] = useState("");
  const [jrnumber, setJrnumber] = useState(null);
  const [company, setCompany] = useState(null);
  const [jrtitle, setJrtitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [recruitername, setRecruitername] = useState(null);
  const [recruiteremail, setRecruiteremail] = useState(null);
  const [recruiternumber, setRecruiternumber] = useState(null);
  const [comment, setComment] = useState(null);
  const [createdate, setCreatedate] = useState(null);
  const [targetdate, setTargetdate] = useState(null);
  const [status, setStatus] = useState(null);
  const [wa, setWa] = useState(null);

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs')
      .then((response) => {const SortedJobreqData = response.data.sort((b, a) => b.jrnumber.localeCompare(a.jrnumber)); setJobreqdata(SortedJobreqData);}) //sort reqnumber alphabetically
      .catch((e)=> console.error(e));}, [checkForRecords]);

        const handleEdit = (row) => {
          setEditing(row.id)
          setJrnumber(row.jrnumber)
          setCompany(row.company)
          setJrtitle(row.jrtitle)
          setLocation(row.location)
          setRecruitername(row.recruitername)
          setRecruiteremail(row.recruiteremail)
          setRecruiternumber(row.recruiternumber)
          setComment(row.comment)
          setCreatedate(row.createdate)
          setTargetdate(row.targetdate)
          setStatus(row.status)
          setWa(row.wa)
        };

        const onEditCancel = () => {
          setEditing("");
          setJrnumber(null)
          setCompany(null)
          setJrtitle(null)
          setLocation(null)
          setRecruitername(null)
          setRecruiteremail(null)
          setRecruiternumber(null)
          setComment(null)
          setCreatedate(null)
          setTargetdate(null)
          setStatus(null)
          setWa(null)
        };

        const onEditSave = async() => {
        { 
            
        const jobreqPUT = 
          {
            "jrnumber": jrnumber,
            "company": company,
            "jrtitle": jrtitle,
            "location": location,
            "recruitername": recruitername,
            "recruiteremail": recruiteremail,
            "recruiternumber":recruiternumber,
            "comment": comment,
            "createdate": createdate,
            "targetdate": targetdate,
            "status": status,
            "wa": wa
        }
                               
           await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/update/${editing}`, jobreqPUT)
           .then((response) => {setCheckForRecords(!checkForRecords); toast.success(`${jrnumber} has been updated.`);})
           onEditCancel();
         }
       }

          const onEditDelete = (row) => {
            axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/jobreqs/delete/${row.id}`)
            .then((response) => 
            {
              window.alert('Are you sure you want to delete');
              setCheckForRecords(!checkForRecords); 
              toast.success(`${jrnumber} has been purged.`)
            })
        };       

  return (
    
    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        &nbsp; &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Amend"><BsSignpostFill style={{ color: '#336791', fontSize: '42px', cursor: 'pointer' }} /></a>
        &nbsp;<b style={{ fontFamily: "Verdana", fontSize: "medium", fontWeight: "bold", color: "#336791" }}>Manage Job Postings / JRs ({jobreqdata.length})</b>
      </div>

      {isExpanded && (
        <div>
          <div>

          <JobreqCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>
          <div>&nbsp;</div>

            <table className="Table6">
              <thead>
                <tr>
                  <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
                  <th style={{ width: '110px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>JR Number</th>
                  <th style={{ width: '130px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Company</th>
                  <th style={{ width: '250px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>JR Title</th>
                  <th style={{ width: '120px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Location</th>
                  <th style={{ width: '160px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Recruiter Name</th>
                  <th style={{ width: '170px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Recruiter eMail</th>
                  <th style={{ width: '150px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Recruiter Number</th>
                  <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Comment</th>
                  <th style={{ width: '50px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>WA</th>
                  <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Create Date</th>
                  <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Target Date</th>
                  <th style={{ width: '60px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Status</th>
                  
                </tr>
              </thead>

              <tbody>

                {jobreqdata.map((row) => {
                  return (
                    
                    <tr key={row.id}>
                      <td className="Table6 td">
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

                      <td className="Table6">{row.id === editing ? (<input style={{ height: '22.5px', width: '90px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={jrnumber} onChange={(e) => setJrnumber(e.target.value)} />) : (row.jrnumber)}</td>
                      <td className="Table6">{row.id === editing ? (<input style={{ height: '22.5px', width: '110px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={company} onChange={(e) => setCompany(e.target.value)} />) : (row.company)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '230px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={jrtitle} onChange={(e) => setJrtitle(e.target.value)}   />) : (row.jrtitle)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '100px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={location} onChange={(e) => setLocation(e.target.value)}   />) : (row.location)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '140px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={recruitername} onChange={(e) => setRecruitername(e.target.value)}   />) : (row.recruitername)}</td> 
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '150px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={recruiteremail} onChange={(e) => setRecruiteremail(e.target.value)}   />) : (row.recruiteremail)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '130px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={recruiternumber} onChange={(e) => setRecruiternumber(e.target.value)}   />) : (row.recruiternumber)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '380px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={comment} onChange={(e) => setComment(e.target.value)}   />) : (row.comment)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '30px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={wa} onChange={(e) => setWa(e.target.value)}   />) : (row.wa)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '70px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={createdate} onChange={(e) => setCreatedate(e.target.value)}   />) : new Date(row.createdate).toLocaleDateString("en-CA")}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '70px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={targetdate} onChange={(e) => setTargetdate(e.target.value)}   />) : new Date(row.targetdate).toLocaleDateString("en-CA")}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '40px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={status} onChange={(e) => setStatus(e.target.value)}   />) : (row.status)}</td>
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
        </div>)}
    </div>
  );
}