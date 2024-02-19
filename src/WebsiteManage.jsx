import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { TbWorldWww } from "react-icons/tb";
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { toast } from 'react-toastify';
import GradientLineRusty from './GradientLineRusty';
import WebsiteCreate from './WebsiteCreate';

export default function WebsiteManage(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tabledata, setTabledata] = useState([]);
  const [editing, setEditing] = useState("")
  const [website_name, setWebsite_name] = useState('');
  const [website_desc, setWebsite_desc] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [website_cat, setWebsite_cat] = useState('');

  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {
        const sortedTabledata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
        setTabledata(sortedTabledata);})
      .catch((e) => console.error(e));
  }, [checkForRecords] [props.checkForRecordsA]
  
  );

  const handleEdit = (row) => 
  {
    setEditing(row.id)
    setWebsite_name(row.website_name)
    setWebsite_desc(row.website_desc)
    setWebsite_url(row.website_url)
    setWebsite_cat(row.website_cat)
  };

  const onEditCancel = () => 
  {
    setEditing("");
    setWebsite_name(null)
    setWebsite_desc(null)
    setWebsite_url(null)
    setWebsite_cat(null)
  };


  const onEditSave = async () => {
    {

      const websitePUT = 
      {
        'website_name': website_name,
        'website_desc': website_desc,
        'website_url': website_url,
        'website_cat': website_cat,
      }


      await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/update/${editing}`, websitePUT)
        .then((response) => {
          setCheckForRecords(!checkForRecords);
          toast.success(`${website_name} updated.`)
        }
        )
      onEditCancel();
    }
  }

  const onEditDelete = (row) => {
    axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/delete/${row.id}`)
      .then((response) => {
        setCheckForRecords(!checkForRecords);
        toast.success(`${website_name} purged.`)
      }
      )
  };

  return (

    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;

      <div onClick={toggleAccordion}>
        &nbsp; &nbsp;
        <TbWorldWww style={{ color: '#336791', fontSize: '42px', cursor: 'pointer' }} />
        &nbsp;<b>Manage Tool, Website or Book ({tabledata.length})</b>
      </div>

      <WebsiteCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />

      <table className="Table6">
        <thead>
          <tr>
            <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
            <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Tool / Website / Book</th>
            <th style={{ width: '800px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Value / Description / Action</th>
            <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>URL</th>
            <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Catagory</th>
          </tr>
        </thead>

        <tbody>
          {tabledata.map((row) => {
            return (
              <tr key={row.id}>
                <td>
                  <>
                    <Tooltip id="edit" />
                    <Tooltip id="commit" />
                    <Tooltip id="revert" />
                    <Tooltip id="purge" />
                    {row.id === editing ?
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

                <td className="asmshover">{row.id === editing ? (<input style={{ height: '30px', width: '400px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_name} onChange={(e) => setWebsite_name(e.target.value)} />) : (<a href={row.website_url} target="_blank">{row.website_name}</a>)}</td>
                <td className="asmshover">{row.id === editing ? (<textarea style={{ height: '30px', width: '900px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_desc} onChange={(e) => setWebsite_desc(e.target.value)} />) : (row.website_desc)}</td>
                <td className="asmshover">{row.id === editing ? (<input style={{ height: '30px', width: '600px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_url} onChange={(e) => setWebsite_url(e.target.value)} />) : (row.website_url)}</td>
                <td className="asmshover">{row.id === editing ? (<input style={{ height: '30px', width: '200px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_cat} onChange={(e) => setWebsite_cat(e.target.value)} />) : (row.website_cat)}</td>
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