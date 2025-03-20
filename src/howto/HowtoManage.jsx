import { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import '../Fonts.css';
import axios from 'axios'
import 'react-dropdown/style.css';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { toast } from 'react-toastify';
import GradientLineRusty from '../gradientlines/GradientLineRusty';
import HowtoCreate from './HowtoCreate';
import { BsPatchQuestion } from "react-icons/bs";
import { useHowtoApi } from './HowtoAPIProvider';
dayjs.extend(utc);


export default function HowtoManage() {

  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [editing, setEditing] = useState("")
  const [howto_name, setHowto_name] = useState(null)
  const [howto_desc, setHowto_desc] = useState(null)
  const [howto_cat, setHowto_cat] = useState("Jy moet nog regmaak")
  const [howto_date, setHowto_date] = useState(null)
  const { howtorootdata, loading, error } = useHowtoApi(); //gebruik van die nuwe useContext :-)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
   

        const handleEdit = (row) => {
          setEditing(row.howto_id)
          setHowto_name(row.howto_name)
          setHowto_desc(row.howto_desc)
          setHowto_cat(row.howto_cat)
          setHowto_date(row.howto_date)
        };

        const onEditCancel = () => {
          setEditing("");
          setHowto_name(null)
          setHowto_desc(null)
          setHowto_cat(null)
          setHowto_date(null)
        };

        const onEditSave = async() => {
                     
        const howtoPUT = 
        {
          "howto_name": howto_name,
          "howto_desc": howto_desc,
          "howto_cat": howto_cat,
          "howto_date": howto_date,
        } 
        
           await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/update/${editing}`, howtoPUT)
           .then((response) => {
            setCheckForRecords(!checkForRecords); 
            toast.success(`${howto_name} updated.`)
          }
          )
           onEditCancel();
        }

            const onEditDelete = () => {
              axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/delete/${editing}`)
                .then((response) => 
                {
                  window.alert('Are you sure you want to delete');
                  setCheckForRecords(!checkForRecords);
                  toast.success(`${howto_name} purged.`);
                })
                .catch((error) => {
                  toast.error(`Can't delete Record#${editing}  - ensure it has no Steps or Step Records associated still.`);
                });

                };       

  return (
    


    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
    
      <div onClick={toggleAccordion}>
        &nbsp; &nbsp; <a data-tooltip-id="insert" data-tooltip-content="Amend">
          <BsPatchQuestion style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></a>
        &nbsp;<b style={{ fontFamily: "Verdana", fontSize: "medium", fontWeight: "bold", color: "#336791" }}>Manage Howto Library ({howtorootdata.length})</b>
      </div>

      <HowtoCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>

            <table className="Table6">
              <thead>
                <tr>
                  <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='left'></th>
                  <th style={{ width: '450px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='left'>Howto Name</th>
                  <th style={{ width: '1200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='left'>Howto Description</th>
                  <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='left'>Created</th>
                </tr>
              </thead>

              <tbody>
                {howtorootdata.map((row) => {
                  return (
                    <tr key={row.howto_id}>
                      <td className="Table6 td">
                        <>
                          <Tooltip id="edit" />
                          <Tooltip id="commit" />
                          <Tooltip id="revert" />
                          <Tooltip id="purge" />
                          {row.howto_id === editing ?
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

                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<input style={{ height: '22.5px', width: '430px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_name} onChange={(e) => setHowto_name(e.target.value)} />) : (row.howto_name)}</td>
                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<textarea style={{ height: '62.5px', width: '1180px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_desc} onChange={(e) => setHowto_desc(e.target.value)} />) : (row.howto_desc)}</td>
                      <td className="asmshover Table6 td">{row.howto_id === editing ? (<input style={{ height: '22.5px', width: '180px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_cat} onChange={(e) => setHowto_cat(e.target.value)} />) : (row.howto_cat)}</td> 
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
  );
}