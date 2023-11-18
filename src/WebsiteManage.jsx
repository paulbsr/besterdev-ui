import { useState, useEffect, useContext } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './Fonts.css';
import axios from 'axios'
import 'react-dropdown/style.css';
import {FaPen, FaCheck, FaRegTrashAlt} from 'react-icons/fa';
import { TbWorldWww } from "react-icons/tb";
import {PiArrowCounterClockwiseBold} from 'react-icons/pi';
import 'react-tooltip/dist/react-tooltip.css'
import { toast } from 'react-toastify';
import GradientLineRusty from './GradientLineRusty';
import WebsiteCreate from './WebsiteCreate';
import WebResourceChannelCreate from './WebResourceChannelCreate';


export default function WebsiteManage() {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => {setExpanded(!isExpanded);};  
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [tabledata, setTabledata] = useState([]);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState("")
  const [website_name, setWebsite_name] = useState('');
  const [website_desc, setWebsite_desc] = useState('');
  const [website_url, setWebsite_url] = useState('');
  const [website_owner, setWebsite_owner] = useState('');
   
  useEffect(() => {
    axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
      .then((response) => {const sortedTabledata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name)); 
        setTabledata(sortedTabledata);
        console.log(sortedTabledata);
        console.log(tabledata);}) //sort firstname alphabetically
      .catch((e)=> console.error(e));}, 
      
      [checkForRecords]);

        const handleEdit = (row) => {
          setEditing(row.id)
          setWebsite_name(row.website_name)
          setWebsite_desc(row.website_desc)
          setWebsite_url(row.website_url)
          setWebsite_owner(row.website_owner)
        };

        const onEditCancel = () => {
          setEditing("");
          setWebsite_name(null)
          setWebsite_desc(null)
          setWebsite_url(null)
          setWebsite_owner(null)
        };


        const onEditSave = async() => {
        { 
            
        const websitePUT = {
          'website_name': website_name,
          'website_desc': website_desc,
          'website_url': website_url,
          'website_owner': website_owner,
        } 
           
                            
           await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/update/${editing}`, websitePUT)
           .then((response) => {
            setCheckForRecords(!checkForRecords); 
            toast.success(`${website_name} has been updated.`)
          }
          )
           onEditCancel();
         }
       }

          const onEditDelete = (row) => {
            axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/delete/${row.id}`)
            .then((response) => {
              setCheckForRecords(!checkForRecords); 
              toast.success(`${website_name} has been purged.`)
            }
            )
       };       

  if (error) return <p>An error occurred in tableone</p>

  return (
    


    <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
    
      <Tooltip id="insert" />
      <div onClick={toggleAccordion}>
        &nbsp; &nbsp; <a data-tooltip-id="insert" data-tooltip-content="Amend"><TbWorldWww style={{ color: '#336791', fontSize: '42px', cursor: 'pointer' }} /></a>
        &nbsp;<b>Manage Websites ({tabledata.length})</b>
      </div>

      {isExpanded && (
        <div>
          <div>

          <WebsiteCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/>

          {/* <WebResourceChannelCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords}/> */}

            <table className="Table6">
              <thead>
                <tr>
                  <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
                  <th style={{ width: '300px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Website Name</th>
                  <th style={{ width: '1300px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Website Value / Description</th>
                  <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Website Owner</th>
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

                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '290px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_name} onChange={(e) => setWebsite_name(e.target.value)} className='cr_edit_inputfield' />) : (<a href={row.website_url} target="_blank">{row.website_name}</a>)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '1200px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_desc} onChange={(e) => setWebsite_desc(e.target.value)} className='cr_edit_inputfield' />) : (row.website_desc)}</td>
                      <td className="asmshover Table6 td">{row.id === editing ? (<input style={{ height: '22.5px', width: '190px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_owner} onChange={(e) => setWebsite_owner(e.target.value)} className='cr_edit_inputfield' />) : (row.website_owner)}</td>
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