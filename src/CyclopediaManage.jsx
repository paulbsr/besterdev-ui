import React, { useState, useEffect, } from 'react';
import New_TaskRecordCreate from './New_TaskRecordCreate';
import axios from "axios";
import './Fonts.css'
import { Tooltip } from '@mui/material';
import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";

import { toast } from 'react-toastify';
import GradientLineRusty from './GradientLineRusty';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import { FaFileCircleQuestion } from "react-icons/fa6";
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import { GiGiftOfKnowledge } from "react-icons/gi";
import CyclopediaCreate from './CyclopediaCreate';


function CyclopediaManage ({  }) {
    const [checkForRecords, setCheckForRecords] = useState(true);
    // const date = new Date();
    // const [isExpanded, setExpanded] = useState(false);
    // const toggleAccordion = () => { setExpanded(!isExpanded); };
    // const filteredSteps1 = howtodata.howto_steps.filter((steps) => steps.step_id === step_idd);
    // const filteredSteps = howtodata.howto_steps.filter((task, key) => { return task.step_id === step_idd });
    // const SortedStepRecords = filteredSteps[0].step_records.sort((a, b) => a.steprecord_number - b.steprecord_number);
    const [editing, setEditing] = useState(false);
    // const [steprecord_id, setCyclopediaDesc_id] = useState();
    const [cyclopedianame, setCyclopediaName] = useState();
    const [cyclopediadesc, setCyclopediaDesc] = useState();
    const [cyclopediaref, setCyclopediaRef] = useState();
    const [cyclopediadata, setCyclopediaData] = useState([]);
    const toggleAccordion = () => {setExpanded(!isExpanded);};
    const [isExpanded, setExpanded] = useState(false);  

    
    useEffect(() => {
        axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia')
          .then((response) => {
            const sortedCyclopediaData = response.data.sort((a, b) => a.cyclopedia_name.localeCompare(b.cyclopedia_name));
            setCyclopediaData(sortedCyclopediaData);
          })
          .catch((e) => console.error(e));
      }, [checkForRecords]);


    
    
      const handleEdit = (row) => {
        setEditing(row.cyclopedia_id);
        setCyclopediaName(row.cyclopedia_name);
        setCyclopediaDesc(row.cyclopedia_desc);
        setCyclopediaRef(row.cyclopedia_ref);
    }

    const onEditCancel = () => 
    {
        setEditing(false);
    }


    const onEditDelete = (row) => {
        axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/delete/${row.cyclopedia_id}`)
        .then((response) => {
          setCheckForRecords(!checkForRecords); 
          toast.success(`${cyclopedianame} purged.`)
        }
        )
   };  


    const onEditSave = async () => {

        const CyclopediaRecordPUT = 
        {
            'cyclopedia_name': cyclopedianame,
            'cyclopedia_desc': cyclopediadesc,
            'cyclopedia_ref': cyclopediaref,
        }

        const response = await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${editing}`, CyclopediaRecordPUT)
        setCheckForRecords(!checkForRecords); 
        toast.success(`Cyclopedia Record amended.`)
        onEditCancel();
    }

    // function editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref, checkForRecords, setCheckForRecords) {
    //     return (
    //         <div>
    //             <div style={{ display: 'flex' }}>
    //                 <div>
    //                     {editing === cyclopedia_id ?
    //                         <><img alt="1" src={spacer} /><img alt="1" src={spacer} />
                                

    //                             <input
    //                                 required
    //                                 defaultValue={cyclopedia_name}
    //                                 onChange={(e) => setCyclopediaName(e.target.value)}
    //                                 style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '250px', padding: 0, paddingLeft: '9px', }} />
    //                             <img alt="1" src={spacer2} /><img alt="1" src={spacer2} /><img alt="1" src={spacer2} /><img alt="1" src={spacer2} /><img alt="1" src={spacer2} />

    //                             <input
    //                                 required
    //                                 defaultValue={cyclopedia_desc}
    //                                 onChange={(e) => setCyclopediaDesc(e.target.value)}
    //                                 style={{ fontFamily: 'Calibri', fontSize: 'Large', height: '27.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '600px' }} />
    //                         </>
    //                         :
                            
    //                         <div className="Font-Calibri-Large-Howto">
    //                             <Tooltip title='Edit Cyclopedia' placement="top-end">&nbsp;&nbsp;&nbsp;
    //                                 <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(cyclopedia_id, cyclopedia_name, cyclopedia_desc) }}>
    //                                     <AiOutlineEdit style={{ color: '#DDDDDD', display: 'round', margin: 'auto', fontSize: '18px' }} /></button>
    //                             </Tooltip>
    //                             <img alt="1" src={spacer} /><img alt="1" src={spacer} />{cyclopedia_name}.
    //                             <img alt="1" src={spacer2} /><img alt="1" src={spacer2} /><img alt="1" src={spacer2} /><img alt="1" src={spacer2} /><img alt="1" src={spacer2} />{cyclopedia_desc}
    //                         </div>
    //                     }
    //                 </div>

    //                 <div style={{ display: 'flex', float: 'right' }}>
    //                     <>
    //                         {editing === cyclopedia_id ?
    //                             (
    //                                 <>&nbsp;&nbsp;
    //                                     <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave(cyclopedia_id)}><AiOutlineCheckCircle style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>&nbsp;
    //                                     <Tooltip title='Discard' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}><MdOutlineCancel style={{ color: '#D5441C', display: 'round', margin: 'auto', fontSize: '20px' }} /></button></Tooltip>
    //                                 </>
    //                             )
    //                             :
    //                             (
    //                                 <Tooltip title='Edit Cyclopedia' placement="top-end">&nbsp;&nbsp;&nbsp;
    //                                     <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(cyclopedia_id, cyclopedia_name, cyclopedia_desc) }}>
    //                                         <AiOutlineEdit style={{ color: '#DDDDDD', display: 'round', margin: 'auto', fontSize: '18px' }} /></button>
    //                                 </Tooltip>
    //                             )
    //                         }
    //                     </>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div>
            {/* <div>
                {cyclopediadata.map(({ cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref }) => (editableCyclopediaRecord(cyclopedia_id, cyclopedia_name, cyclopedia_desc, cyclopedia_ref)))}
            </div> */}

            <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
    
    <Tooltip id="insert" />
    <div onClick={toggleAccordion}>
      &nbsp; &nbsp; <a data-tooltip-id="insert" data-tooltip-content="Amend"><GiGiftOfKnowledge style={{ color: '#336791', fontSize: '38px', cursor: 'pointer' }} /></a>
      &nbsp;<b>Manage Cyclopedia Entries ({cyclopediadata.length})</b>
    </div>

    <CyclopediaCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>

          <table className="Table6">
            <thead>
              <tr>
                <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
                <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Name</th>
                <th style={{ width: '1450px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Description</th>
                <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Reference</th>
                {/* <th style={{ width: '100px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Last Touched</th> */}
              </tr>
            </thead>

            <tbody>
              {cyclopediadata.map((row) => {
                return (
                  <tr key={row.cyclopedia_id}>
                    <td className="Table6 td ">
                      <>
                        <Tooltip id="edit" />
                        <Tooltip id="commit" />
                        <Tooltip id="revert" />
                        <Tooltip id="purge" />
                        {row.cyclopedia_id === editing ?
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

                    <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<input style={{ height: '22.5px', width: '440px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={cyclopedianame} onChange={(e) => setCyclopediaName(e.target.value)} className='cr_edit_inputfield' />) : (row.cyclopedia_name)}</td>
                    <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<textarea rows={5} style={{ height: '22.5px', width: '880px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={cyclopediadesc} onChange={(e) => setCyclopediaDesc(e.target.value)} className='cr_edit_inputfield' />) : (row.cyclopedia_desc)}</td>
                    <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={cyclopediaref} onChange={(e) => setCyclopediaRef(e.target.value)} className='cr_edit_inputfield_disc' />) : (row.cyclopedia_ref)}</td>
                    {/* <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<input style={{ height: '22.5px', width: '90px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={howto_date} onChange={(e) => setHowto_date(e.target.value)} className='cr_edit_inputfield' />) : (row.howto_date)}</td>  */}
                  </tr>
                )
              })
              }
            </tbody>
          </table>

          {/* <HowtoSteps /> */}
          <div>&nbsp;</div>
          <GradientLineRusty />
          <div>&nbsp;</div>
        </div>

        </div>

        
    );
}

export default CyclopediaManage;