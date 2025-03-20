import { useState, useEffect } from 'react'
import '../Fonts.css';
import 'react-dropdown/style.css';
import axios from 'axios'
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { TbWorldWww } from "react-icons/tb";
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { toast } from 'react-toastify';
import GradientLineRusty from '../gradientlines/GradientLineRusty';
import WebsiteCreate from './WebsiteCreate';
import { useWebsiteApi } from './WebSiteAPIProvider';
import { GiSpiderWeb } from "react-icons/gi";



export default function WebsiteManage(props) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [editing, setEditing] = useState("")
  const [website_name, setWebsite_name] = useState();
  const [website_desc, setWebsite_desc] = useState();
  const [website_url, setWebsite_url] = useState();
  const [website_cat, setWebsite_cat] = useState();
  const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContect :-)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  const handleEdit = (row) => {
    setEditing(row.websiteId)
    setWebsite_name(row.websiteName)
    setWebsite_desc(row.websiteDesc)
    setWebsite_url(row.websiteUrl)
    setWebsite_cat(row.websiteCat)
  };

  const onEditCancel = () => {
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
        'websiteName': website_name,
        'websiteDesc': website_desc,
        'websiteUrl': website_url,
        'websiteCat': website_cat,
      }


      await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/update/${editing}`, websitePUT)
        .then((response) => {
          setCheckForRecords(!checkForRecords);
          toast.success(`Website updated.`)
        }
        )
      onEditCancel();
    }
  }

  const onEditDelete = (row) => {
    axios.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/delete/${row.websiteId}`)
      .then((response) => {
        window.alert('Are you sure you want to delete');
        setCheckForRecords(!checkForRecords);
        toast.success(`${website_name} purged.`)
      }
      )
  };

  return (

    // <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
        <div>&nbsp; &nbsp;

      <div onClick={toggleAccordion}>
        &nbsp; &nbsp;
        <GiSpiderWeb style={{ color: '#336791', fontSize: '42px', cursor: 'pointer' }} />
        &nbsp;<b style={{ fontFamily: "Verdana", fontSize: "medium", fontWeight: "bold", color: "#336791" }}>Manage the {websiterootdata.length} Tools, Websites or Books</b>
      </div>

      <WebsiteCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />

      <table className="Table6">
        <thead>
          <tr>
            <th style={{ width: '20px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'></th>
            <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Tool / Website / Book</th>
            <th style={{ width: '800px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Value / Description / Action</th>
            <th style={{ width: '400px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>URL</th>
            <th style={{ width: '200px', borderRadius: '4px' }} className="Font-Verdana-Small-Rusty" align='center'>Category</th>
          </tr>
        </thead>

        <tbody>
          {websiterootdata.map((row) => {

            return (
              <tr key={row.websiteId}>
                <td>
                  <>
                    {row.websiteId === editing ?
                      (
                        <>
                          <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => onEditSave()}><a><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                          <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><a><PiArrowCounterClockwiseBold style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
                          <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => onEditDelete(row)}><a><FaRegTrashAlt style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                        </>
                      )
                      :
                      (
                        <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => handleEdit(row)}><a><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
                      )
                    }
                  </>
                </td>

                <td>{row.websiteId === editing ? (<input style={{ height: '30px', width: '380px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_name} onChange={(e) => setWebsite_name(e.target.value)} />) : (<a href={row.websiteUrl} target="_blank" rel="noreferrer">{row.websiteName}</a>)}</td>
                <td className="asmshover">{row.websiteId === editing ? (<textarea style={{ height: '30px', width: '780px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_desc} onChange={(e) => setWebsite_desc(e.target.value)} />) : (row.websiteDesc)}</td>
                <td className="asmshover">{row.websiteId === editing ? (<input style={{ height: '30px', width: '380px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_url} onChange={(e) => setWebsite_url(e.target.value)} />) : "URL is te lank"}</td>
                <td className="asmshover">{row.websiteId === editing ? (<input style={{ height: '30px', width: '180px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_cat} onChange={(e) => setWebsite_cat(e.target.value)} />) : (row.websiteCat)}</td>

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