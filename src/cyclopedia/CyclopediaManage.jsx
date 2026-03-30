import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { GiGiftOfKnowledge } from "react-icons/gi";
import '../Fonts.css'
import CyclopediaCreate from './CyclopediaCreate';
import GradientLineRusty from '../gradientlines/GradientLineRusty';
import { baseInputStyle } from '../baseInputStyle';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';


function CyclopediaManage() {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [editing, setEditing] = useState(false);
  const [cyclopediaName, setCyclopediaName] = useState();
  const [cyclopediaDesc, setCyclopediaDesc] = useState();
  const [cyclopediaRef, setCyclopediaRef] = useState();
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [isExpanded, setExpanded] = useState(false);
  const { cyclopediarootdata, loading, error } = useCyclopediaApi(); //gebruik van die nuwexuseContect :-)
  const [searchTerm, setSearchTerm] = useState('');


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const handleEdit = (row) => {
    setEditing(row.cyclopediaId);
    setCyclopediaName(row.cyclopediaName);
    setCyclopediaDesc(row.cyclopediaDesc);
    setCyclopediaRef(row.cyclopediaRef);
  }

  const onEditCancel = () => {
    setEditing(false);
  }


  const onEditDelete = (row) => {
    OAuth2APIClient.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/delete/${row.cyclopediaId}`)
      .then((response) => {
        window.alert('Are you sure you want to delete');
        toast.success(`${cyclopediaName} purged.`)
        setCheckForRecords(!checkForRecords);
      }
      )
  };


  const onEditSave = async () => {

    const CyclopediaRecordPUT =
    {
      'cyclopediaName': cyclopediaName,
      'cyclopediaDesc': cyclopediaDesc,
      'cyclopediaRef': cyclopediaRef,
    }

    const response = await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${editing}`, CyclopediaRecordPUT)
    toast.success(`Cyclopedia Record amended.`)
    setCheckForRecords(!checkForRecords);
    onEditCancel();
  }

  const filteredCyclopedia = cyclopediarootdata.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.cyclopediaName?.toLowerCase().includes(term) ||
      row.cyclopediaDesc?.toLowerCase().includes(term)
    );
  });

  return (
    <div>


      <Tooltip id="insert" />
      <div>&nbsp;</div>
            <div>&nbsp;</div>
      <div style={{
        width: '80%',
        margin: '12px auto',
        display: 'flex',
        justifyContent: 'flex-start',
      }} onClick={toggleAccordion}>
        <GiGiftOfKnowledge style={{ color: '#336791', fontSize: '38px' }} />&nbsp; &nbsp;&nbsp;
        <b style={{ fontFamily: "Candara", fontSize: "x-large", color: "#336791" }}>Manage the {cyclopediarootdata.length} Cyclopedia Entries</b>
      </div>

      <div
        style={{
          width: '80%',
          margin: '12px auto',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <CyclopediaCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />
      </div>


      {/* <div style={{ margin: '12px 0' }}>
  <input
    type="text"
    placeholder="Search cyclopedia..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      ...baseInputStyle,
      width: '400px'
    }}
  />
</div> */}

      <div
        style={{
          width: '80%',
          margin: '12px auto',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <input
          type="text"
          placeholder="Search cyclopedia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            ...baseInputStyle,
            width: '400px',
          }}
        />
      </div>

      <div
        style={{
          width: '80%',
          margin: '0 auto',
          padding: '8px 0',
        }}
      >
        <table className="Table6">
          <thead style={{ background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' }}>
            <tr>
              <th style={{ width: '30px', borderRadius: '4px' }} align='center'>Tool</th>
              <th style={{ width: '400px', borderRadius: '4px' }} align='center'>Name</th>
              <th style={{ width: '1500px', borderRadius: '4px' }} align='center'>Description</th>
            </tr>
          </thead>

          <tbody>
            {filteredCyclopedia.map((row) => {
              return (
                <tr key={row.cyclopediaId}>
                  <td>
                    <>
                      {row.cyclopediaId === editing ?
                        (
                          <>
                            <Tooltip title='Commit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => onEditSave()}><a data-tooltip-id="commit" data-tooltip-content="Commit"><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;</Tooltip>
                            <Tooltip title='Revert' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><a data-tooltip-id="revert" data-tooltip-content="Revert"><PiArrowCounterClockwiseBold style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;</Tooltip>
                            <Tooltip title='Purge' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => onEditDelete(row)}><a data-tooltip-id="purge" data-tooltip-content="Purge"><FaRegTrashAlt style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button></Tooltip>
                          </>
                        )
                        :
                        (
                          <Tooltip title='Edit' placement="top-end"><button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => handleEdit(row)}><a data-tooltip-id="edit" data-tooltip-content="Edit"><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button></Tooltip>
                        )
                      }
                    </>
                  </td>

                  <td>{row.cyclopediaId === editing ? (<input style={{ ...baseInputStyle, width: '350px' }} value={cyclopediaName} onChange={(e) => setCyclopediaName(e.target.value)} />) : (row.cyclopediaName)}</td>
                  <td>{row.cyclopediaId === editing ? (<textarea style={{ ...baseInputStyle, width: '1240px' }} value={cyclopediaDesc} onChange={(e) => setCyclopediaDesc(e.target.value)} />) : (row.cyclopediaDesc)}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
      <div>&nbsp;</div>
      <GradientLineRusty />;
      <div>&nbsp;</div>
    </div>
  );
}

export default CyclopediaManage;

