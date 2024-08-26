import React, { useState, useEffect, } from 'react';
import axios from "axios";
import './Fonts.css'
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import CyclopediaCreate from './CyclopediaCreate';
import GradientLineRusty from './GradientLineRusty';
import { IoLibrary } from "react-icons/io5";
import { useCyclopediaApi } from './CyclopediaAPIProvider';


function CyclopediaManage() {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cyclopedianame, setCyclopediaName] = useState();
  const [cyclopediadesc, setCyclopediaDesc] = useState();
  const [cyclopediaref, setCyclopediaRef] = useState();
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const { cyclopediarootdata, loading, error } = useCyclopediaApi(); //gebruik van die nuwexuseContect :-)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const handleEdit = (row) => {
    setEditing(row.cyclopedia_id);
    setCyclopediaName(row.cyclopedia_name);
    setCyclopediaDesc(row.cyclopedia_desc);
    setCyclopediaRef(row.cyclopedia_ref);
  }

  const onEditCancel = () => {
    setEditing(false);
  }


  const onEditDelete = (row) => {
    axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/delete/${row.cyclopedia_id}`)
      .then((response) => 
      {
        window.alert('Are you sure you want to delete');
        toast.success(`${cyclopedianame} purged.`)
        setCheckForRecords(!checkForRecords);
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
    toast.success(`Cyclopedia Record amended.`)
    setCheckForRecords(!checkForRecords);
    onEditCancel();
  }

  return (
    <div>

      <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

        <Tooltip id="insert" />
        <div onClick={toggleAccordion}>
          &nbsp; &nbsp; <IoLibrary style={{ color: '#336791', fontSize: '38px', cursor: 'pointer' }} />
          &nbsp;<b>Manage the {cyclopediarootdata.length} Cyclopedia Entries</b>
        </div>

        <CyclopediaCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />

        <table className="Table6">
          <thead>
            <tr>
              <th style={{ width: '30px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
              <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Name</th>
              <th style={{ width: '1500px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Description</th>
              {/* <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Reference</th> */}
            </tr>
          </thead>

          <tbody>
            {cyclopediarootdata.map((row) => {
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

                  <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<input style={{ height: '22.5px', width: '270px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={cyclopedianame} onChange={(e) => setCyclopediaName(e.target.value)} />) : (row.cyclopedia_name)}</td>
                  <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<textarea style={{ height: '22.5px', width: '1240px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={cyclopediadesc} onChange={(e) => setCyclopediaDesc(e.target.value)} />) : (row.cyclopedia_desc)}</td>
                  {/* <td className="asmshover Table6 td">{row.cyclopedia_id === editing ? (<input style={{ height: '22.5px', width: '250px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={cyclopediaref} onChange={(e) => setCyclopediaRef(e.target.value)} />) : (row.cyclopedia_ref)}</td> */}
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
  );
}

export default CyclopediaManage;