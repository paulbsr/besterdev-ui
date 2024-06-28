import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './Fonts.css'
import 'react-dropdown/style.css';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'


export default function RoleManage(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [rolerecords, setRolerecords] = useState([]);
  const [editing, setEditing] = useState("");
  const [rolename, setRolename] = useState('');
  const [roledesc, setRoledesc] = useState('');
  const [roleskill1, setRoleskill1] = useState('');
  const [roleskill2, setRoleskill2] = useState('');
  const [roleskill3, setRoleskill3] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };



  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles')
      .then((response) => { const sortedrolerecords = response.data.sort((b, a) => b.rolename.localeCompare(a.rolename)); setRolerecords(sortedrolerecords);}) //sort empname alphabetically
      .catch((e) => console.error(e));
  }, [checkForRecords]);

  const handleEmpEdit = (row) => {
    setEditing(row.id)
    setRolename(row.rolename)
    setRoledesc(row.roledesc)
    setRoleskill1(row.roleskill1)
    setRoleskill2(row.roleskill2)
    setRoleskill3(row.roleskill3)
  };

  const onEditCancel = () => {
    setEditing("");
    setRolename(null)
    setRoledesc(null)
    setRoleskill1(null)
    setRoleskill2(null)
    setRoleskill3(null)
  };


  const onEditSave = async () => {
    {

      const rolePUT = {
        "rolename": rolename,
        "roledesc": roledesc,
        "roleskill1": roleskill1,
        "roleskill2": roleskill2,
        "roleskill3": roleskill3,
      }
      
      await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles/update/${editing}`, rolePUT)
      .then((response) => {setCheckForRecords(!checkForRecords); alert(`The Role ${rolename} has been updated.`);})
      onEditCancel();
    }
  }


  const onEditDelete = (row) => {
    axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/roles/delete/${row.id}`)
      .then((response) => 
      { 
        setCheckForRecords(!checkForRecords); 
        alert(`The Role ${rolename} has been purged.`) })
  };


  return (<div>
    <Tooltip id="edit" />
    <Tooltip id="commit" />
    <Tooltip id="revert" />
    <Tooltip id="purge" />

    &nbsp;

    <table className="Table6">
      <thead>
        <tr>
          <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'></th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Role Name</th>
          <th style={{ width: '500px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Role Description</th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Role Skill#1</th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Role Skill#2</th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Role Skill#3</th>
        </tr>
      </thead>

      <tbody>

        {rolerecords.map((row) => {
          return (
            <tr key={row.id}>
              <td className="Table6 td">
                <>
                  {row.id === editing ?
                    (
                      <>
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#169247', outline: 'none' }} type='button' onClick={() => onEditSave()}><a data-tooltip-id="commit" data-tooltip-content="Commit"><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><a data-tooltip-id="revert" data-tooltip-content="Revert"><PiArrowCounterClockwiseBold style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => onEditDelete(row)}><a data-tooltip-id="purge" data-tooltip-content="Purge"><FaRegTrashAlt style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                      </>
                    )
                    :
                    (
                      <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#1994AD', outline: 'none' }} type='button' onClick={() => handleEmpEdit(row)}><a data-tooltip-id="edit" data-tooltip-content="Edit"><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                    )
                  }
                </>
              </td>

              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '180px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={rolename} onChange={(e) => setRolename(e.target.value)} className='cr_edit_inputfield' />) : (row.rolename)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '480px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={roledesc} onChange={(e) => setRoledesc(e.target.value)} className='cr_edit_inputfield' />) : (row.roledesc)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '180px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={roleskill1} onChange={(e) => setRoleskill1(e.target.value)} className='cr_edit_inputfield' />) : (row.roleskill1)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '180px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={roleskill2} onChange={(e) => setRoleskill2(e.target.value)} className='cr_edit_inputfield_disc' />) : (row.roleskill2)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '180px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={roleskill3} onChange={(e) => setRoleskill3(e.target.value)} className='cr_edit_inputfield' />) : (row.roleskill3)}</td>
              
            </tr>
          )
        })
        }
      </tbody>
    </table>
  </div>
  )
}