// import { useState } from 'react'
// import '../Fonts.css';
// import 'react-dropdown/style.css';
// import OAuth2APIClient from '../oauth2/OAuth2APIClient';
// import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
// import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
// import { toast } from 'react-toastify';
// import GradientLineRusty from '../gradientlines/GradientLineRusty';
// import WebsiteCreate from './WebsiteCreate';
// import { useWebsiteApi } from './WebSiteAPIProvider';
// import { GiSpiderWeb } from "react-icons/gi";



// export default function WebsiteManage(props) {
//   const [isExpanded, setExpanded] = useState(false);
//   const toggleAccordion = () => { setExpanded(!isExpanded); };
//   const [checkForRecords, setCheckForRecords] = useState(true);
//   const [editing, setEditing] = useState("")
//   const [website_name, setWebsite_name] = useState();
//   const [website_desc, setWebsite_desc] = useState();
//   const [website_url, setWebsite_url] = useState();
//   const [website_cat, setWebsite_cat] = useState();
//   const { websiterootdata, loading, error } = useWebsiteApi(); //gebruik van die nuwe useContect :-)
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;


//   const handleEdit = (row) => {
//     setEditing(row.websiteId)
//     setWebsite_name(row.websiteName)
//     setWebsite_desc(row.websiteDesc)
//     setWebsite_url(row.websiteUrl)
//     setWebsite_cat(row.websiteCat)
//   };

//   const onEditCancel = () => {
//     setEditing("");
//     setWebsite_name(null)
//     setWebsite_desc(null)
//     setWebsite_url(null)
//     setWebsite_cat(null)
//   };


//   const onEditSave = async () => {
//     const websitePUT =
//     {
//       'websiteName': website_name,
//       'websiteDesc': website_desc,
//       'websiteUrl': website_url,
//       'websiteCat': website_cat,
//     }
//     await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/update/${editing}`, websitePUT)
//       .then((response) => {
//         setCheckForRecords(!checkForRecords);
//         toast.success(`Website updated.`)
//       }
//       )
//     onEditCancel();
//   }

//   const onEditDelete = (row) => {
//     OAuth2APIClient.delete(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/delete/${row.websiteId}`)
//       .then((response) => {
//         window.alert('Are you sure you want to delete');
//         setCheckForRecords(!checkForRecords);
//         toast.success(`${website_name} purged.`)
//       }
//       )
//   };

//   return (

//     // <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
//         <div>&nbsp; &nbsp;

//       <div onClick={toggleAccordion}>
//         &nbsp; &nbsp;
//         <GiSpiderWeb style={{ color: '#336791', fontSize: '42px', cursor: 'pointer' }} />
//         &nbsp;<b style={{ fontFamily: "Verdana", fontSize: "medium", fontWeight: "bold", color: "#336791" }}>Manage the {websiterootdata.length} Tools, Websites or Books</b>
//       </div>

//       <WebsiteCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} />

//       <table className="Table6">
//         <thead style={{ background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)' }}>
//           <tr>
//             <th style={{ width: '20px', borderRadius: '4px' }} align='center'></th>
//             <th style={{ width: '400px', borderRadius: '4px' }} align='center'>Tool / Website / Book</th>
//             <th style={{ width: '800px', borderRadius: '4px' }} align='center'>Value / Description / Action</th>
//             <th style={{ width: '400px', borderRadius: '4px' }} align='center'>URL</th>
//             <th style={{ width: '200px', borderRadius: '4px' }} align='center'>Category</th>
//           </tr>
//         </thead>

//         <tbody>
//           {websiterootdata.map((row) => {

//             return (
//               <tr key={row.websiteId}>
//                 <td>
//                   <>
//                     {row.websiteId === editing ?
//                       (
//                         <>
//                           <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => onEditSave()}><a><FaCheck style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
//                           <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'silver', outline: 'none' }} type='button' onClick={() => onEditCancel()}><a><PiArrowCounterClockwiseBold style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>&nbsp;
//                           <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#D5441C', outline: 'none' }} type='button' onClick={() => onEditDelete(row)}><a><FaRegTrashAlt style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
//                         </>
//                       )
//                       :
//                       (
//                         <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: '#336791', outline: 'none' }} type='button' onClick={() => handleEdit(row)}><a><FaPen style={{ color: 'white', display: 'block', margin: 'auto', fontSize: '12px', cursor: 'pointer' }} /></a></button>
//                       )
//                     }
//                   </>
//                 </td>

//                 <td>{row.websiteId === editing ? (<input style={{ height: '30px', width: '380px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_name} onChange={(e) => setWebsite_name(e.target.value)} />) : (<a href={row.websiteUrl} target="_blank" rel="noreferrer">{row.websiteName}</a>)}</td>
//                 <td className="asmshover">{row.websiteId === editing ? (<textarea style={{ height: '30px', width: '780px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_desc} onChange={(e) => setWebsite_desc(e.target.value)} />) : (row.websiteDesc)}</td>
//                 <td className="asmshover">{row.websiteId === editing ? (<input style={{ height: '30px', width: '380px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_url} onChange={(e) => setWebsite_url(e.target.value)} />) : "URL is te lank"}</td>
//                 <td className="asmshover">{row.websiteId === editing ? (<input style={{ height: '30px', width: '180px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '5px' }} value={website_cat} onChange={(e) => setWebsite_cat(e.target.value)} />) : (row.websiteCat)}</td>

//               </tr>
//             )
//           })
//           }
//         </tbody>
//       </table>
//       <div>&nbsp;</div>
//       <GradientLineRusty />
//       <div>&nbsp;</div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { GiSpiderWeb } from "react-icons/gi";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { useWebsiteApi } from './WebSiteAPIProvider';
import WebsiteCreate from './WebsiteCreate';
import GradientLineRusty from '../gradientlines/GradientLineRusty';
import { baseInputStyle } from '../baseInputStyle';
import '../Fonts.css';

function WebsiteManage() {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [editing, setEditing] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCat, setWebsiteCat] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { websiterootdata, loading, error } = useWebsiteApi();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (row) => {
    setEditing(row.websiteId);
    setWebsiteName(row.websiteName);
    setWebsiteDesc(row.websiteDesc);
    setWebsiteUrl(row.websiteUrl);
    setWebsiteCat(row.websiteCat);
  };

  const onEditCancel = () => {
    setEditing(false);
    setWebsiteName('');
    setWebsiteDesc('');
    setWebsiteUrl('');
    setWebsiteCat('');
  };

  const onEditSave = async () => {
    const websitePUT = {
      websiteName,
      websiteDesc,
      websiteUrl,
      websiteCat,
    };

    await OAuth2APIClient.put(
      `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/update/${editing}`,
      websitePUT
    );

    toast.success('Website updated.');
    setCheckForRecords(!checkForRecords);
    onEditCancel();
  };

  const onEditDelete = (row) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    OAuth2APIClient.delete(
      `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/delete/${row.websiteId}`
    ).then(() => {
      toast.success(`${row.websiteName} purged.`);
      setCheckForRecords(!checkForRecords);
    });
  };

  const filteredWebsites = websiterootdata.filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.websiteName?.toLowerCase().includes(term) ||
      row.websiteDesc?.toLowerCase().includes(term) ||
      row.websiteCat?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <Tooltip id="website-tooltips" />

      <div>&nbsp;</div>
      <div>&nbsp;</div>

      {/* Header */}
      <div
        style={{
          width: '80%',
          margin: '12px auto',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <GiSpiderWeb style={{ color: '#336791', fontSize: '38px' }} />
        &nbsp;&nbsp;
        <b style={{ fontFamily: 'Candara', fontSize: 'x-large', color: '#336791' }}>
          Manage the {websiterootdata.length} Tools, Websites or Books
        </b>
      </div>

      {/* Create */}
      <div
        style={{
          width: '80%',
          margin: '12px auto',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <WebsiteCreate
          checkForRecords={checkForRecords}
          setCheckForRecords={setCheckForRecords}
        />
      </div>

      {/* Search */}
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
          placeholder="Search websites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ ...baseInputStyle, width: '400px' }}
        />
      </div>

      {/* Table */}
      <div style={{ width: '80%', margin: '0 auto', padding: '8px 0' }}>
        <table className="Table6">
          <thead
            style={{
              background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <tr>
              <th style={{ width: '30px' }} align="center">Tool</th>
              <th style={{ width: '300px' }} align="center">Name</th>
              <th style={{ width: '800px' }} align="center">Description</th>
              <th style={{ width: '400px' }} align="center">URL</th>
              <th style={{ width: '200px' }} align="center">Category</th>
            </tr>
          </thead>

          <tbody>
            {filteredWebsites.map((row) => (
              <tr key={row.websiteId}>
                <td>
                  {row.websiteId === editing ? (
                    <>
                      <Tooltip title="Commit">
                        <button
                          style={toolBtn('#336791')}
                          onClick={onEditSave}
                        >
                          <FaCheck style={iconStyle} />
                        </button>
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Revert">
                        <button
                          style={toolBtn('silver')}
                          onClick={onEditCancel}
                        >
                          <PiArrowCounterClockwiseBold style={iconStyle} />
                        </button>
                      </Tooltip>
                      &nbsp;
                      <Tooltip title="Purge">
                        <button
                          style={toolBtn('#D5441C')}
                          onClick={() => onEditDelete(row)}
                        >
                          <FaRegTrashAlt style={iconStyle} />
                        </button>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Edit">
                      <button
                        style={toolBtn('#336791')}
                        onClick={() => handleEdit(row)}
                      >
                        <FaPen style={iconStyle} />
                      </button>
                    </Tooltip>
                  )}
                </td>

                <td>
                  {row.websiteId === editing ? (
                    <input
                      style={{ ...baseInputStyle, width: '95%' }}
                      value={websiteName}
                      onChange={(e) => setWebsiteName(e.target.value)}
                    />
                  ) : (
                    <a href={row.websiteUrl} target="_blank" rel="noreferrer">
                      {row.websiteName}
                    </a>
                  )}
                </td>

                <td>
                  {row.websiteId === editing ? (
                    <textarea
                      style={{ ...baseInputStyle, width: '99%' }}
                      value={websiteDesc}
                      onChange={(e) => setWebsiteDesc(e.target.value)}
                    />
                  ) : (
                    row.websiteDesc
                  )}
                </td>

                <td>
                  {row.websiteId === editing ? (
                    <input
                      style={{ ...baseInputStyle, width: '95%' }}
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  ) : (
                    row.websiteUrl
                  )}
                </td>

                <td>
                  {row.websiteId === editing ? (
                    <input
                      style={{ ...baseInputStyle, width: '95%' }}
                      value={websiteCat}
                      onChange={(e) => setWebsiteCat(e.target.value)}
                    />
                  ) : (
                    row.websiteCat
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>&nbsp;</div>
      <GradientLineRusty />
      <div>&nbsp;</div>
    </div>
  );
}

/* shared styles */
const toolBtn = (bg) => ({
  height: '20px',
  width: '20px',
  padding: 0,
  border: 'none',
  borderRadius: '3px',
  backgroundColor: bg,
  outline: 'none',
});

const iconStyle = {
  color: 'white',
  display: 'block',
  margin: 'auto',
  fontSize: '12px',
  cursor: 'pointer',
};

export default WebsiteManage;