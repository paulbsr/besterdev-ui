import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './Fonts.css'
import 'react-dropdown/style.css';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import GradientLine from './GradientLine';


export default function EmployerManage(props) {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [employerrecords, setemployerrecords] = useState([]);
  const [editing, setEditing] = useState("");
  const [empname, setEmpname] = useState(null);
  const [empcontactfn, setEmpcontactfn] = useState(null);
  const [empcontactln, setEmpcontactln] = useState(null);
  const [empcontactnum, setEmpcontactnum] = useState(null);
  const [empcontactemail, setEmpcontactemail] = useState(null);
  const [empcomment, setEmpcomment] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  
  const toggleAccordion = () => { setExpanded(!isExpanded); };

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers')
      .then((response) => { const sortedemployerrecords = response.data.sort((b, a) => b.empname.localeCompare(a.empname)); setemployerrecords(sortedemployerrecords);}) //sort empname alphabetically
      .catch((e) => console.error(e));
  }, [checkForRecords]);

  const handleEmpEdit = (row) => {
    setEditing(row.id)
    setEmpname(row.empname)
    setEmpcontactfn(row.empcontactfn)
    setEmpcontactln(row.empcontactln)
    setEmpcontactnum(row.empcontactnum)
    setEmpcontactemail(row.empcontactemail)
    setEmpcomment(row.empcomment)
  };

  const onEditCancel = () => {
    setEditing("");
    setEmpname(null)
    setEmpcontactfn(null)
    setEmpcontactln(null)
    setEmpcontactnum(null)
    setEmpcontactemail(null)
    setEmpcomment(null)
  };


  const onEditSave = async () => {
    {

      const employerPUT = {
        "empname": empname,
        "empcontactfn": empcontactfn,
        "empcontactln": empcontactln,
        "empcontactnum": empcontactnum,
        "empcontactemail": empcontactemail,
        "empcomment": empcomment
      }
      
      await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/update/${editing}`, employerPUT)
      .then((response) => {setCheckForRecords(!checkForRecords); alert(`${empname} has been updated.`)}) 
      .catch((error) => {alert("Done");})
      setCheckForRecords(!checkForRecords)
      onEditCancel();
    }
  }


  const onEditDelete = (row) => {
    axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/employers/delete/${row.id}`)
      .then((response) => 
      { 
        window.alert('Are you sure you want to delete');
        setCheckForRecords(!checkForRecords); 
        alert(`${empname} has been purged.`) })
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
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Company Name</th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Contact First Name</th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Contact Last Name</th>
          <th style={{ width: '350px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Contact eMail</th>
          <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Contact Number</th>
          <th style={{ width: '650px', borderRadius: '4px' }} className="Font-Verdana-Small_Compliment_Blue" align='center'>Comment</th>
        </tr>
      </thead>

      <tbody>

        {employerrecords.map((row) => {
          return (
            <tr key={row.id}>
              <td className="Table6 td">
                <>
                  {row.id === editing ?
                    (
                      <>
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => onEditSave()}><a data-tooltip-id="commit" data-tooltip-content="Commit"><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
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

              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={empname} onChange={(e) => setEmpname(e.target.value)} className='cr_edit_inputfield' />) : (row.empname)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={empcontactfn} onChange={(e) => setEmpcontactfn(e.target.value)} className='cr_edit_inputfield' />) : (row.empcontactfn)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={empcontactln} onChange={(e) => setEmpcontactln(e.target.value)} className='cr_edit_inputfield' />) : (row.empcontactln)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '340px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={empcontactemail} onChange={(e) => setEmpcontactemail(e.target.value)} className='cr_edit_inputfield_disc' />) : (<a href={'mailto: ${row.email}'} target="_blank" rel="noreferrer">{row.empcontactemail}</a>)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={empcontactnum} onChange={(e) => setEmpcontactnum(e.target.value)} className='cr_edit_inputfield' />) : (row.empcontactnum)}</td>
              <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '640px', border: '1.25px solid #1994AD', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={empcomment} onChange={(e) => setEmpcomment(e.target.value)} className='cr_edit_inputfield' />) : (row.empcomment)}</td>

            </tr>
          )
        })
        }
      </tbody>
    </table>
    <div>&nbsp;</div>
    <GradientLine/>
    <div>&nbsp;</div>
  </div>
  )
}