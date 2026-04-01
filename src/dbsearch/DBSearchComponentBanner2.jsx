// import React, { useState } from 'react';
// import OAuth2APIClient from '../oauth2/OAuth2APIClient';
// import '../Fonts.css';
// import { BsPatchQuestion } from "react-icons/bs";
// import { IoFootstepsSharp } from "react-icons/io5";
// import { TbWorldWww } from "react-icons/tb";
// import { SiWritedotas } from "react-icons/si";
// import { GiFiles } from "react-icons/gi";
// import { toast } from 'react-toastify';
// import { MdTask } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import { GiGiftOfKnowledge } from "react-icons/gi";
// import { BsSearch } from "react-icons/bs";

// const DBSearchComponentBanner2 = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [editing, setEditing] = useState(false);
//   const [cyclopedianame, setCyclopedianame] = useState('');
//   const [cyclopediadesc, setCyclopediadesc] = useState('');
//   const [cyclopediaidedit, setCyclopediaidedit] = useState('');
//   const [checkForRecords, setCheckForRecords] = useState(true);
//   const [noRecordsFound, setNorecordsFound] = useState(false);

//   const navigate = useNavigate();

//   const handleSearch = async (event) => {
//     event.preventDefault(); // Prevent default form submission
//     try {
//       const response = await OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/search?keyword=${searchQuery}`);
//       setSearchResults(response.data);
//       setNorecordsFound(response.data.length === 0);
//     } catch (error) {
//       console.error('Error searching:', error);
//     }
//   };

//   const handleEdit = (crap, cyclopediaID, cyclopediaNAME, cyclopediaDESC) => {
//     setCyclopediaidedit(cyclopediaID);
//     setEditing(crap);
//     setCyclopedianame(cyclopediaNAME);
//     setCyclopediadesc(cyclopediaDESC);
//   }

//   const onEditCancel = () => {
//     setEditing(false);
//     setNorecordsFound(false);
//   }

//   const onEditSave = async () => {
//     const CyclopediaRecordPUT = {
//       'cyclopedia_name': cyclopedianame,
//       'cyclopedia_desc': cyclopediadesc,
//     }

//     try {
//       await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${cyclopediaidedit}`, CyclopediaRecordPUT);
//       toast.success(`Cyclopedia Record amended.`);
//       setCheckForRecords(!checkForRecords);
//       onEditCancel();
//     } catch (error) {
//       console.error('Error updating:', error);
//       toast.error('Failed to amend Cyclopedia Record.');
//     }
//   }

//   const handleCancel = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//   };

//   const highlightKeyword = (text, keyword) => {
//     const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
//     return parts.map((part, index) =>
//       part.toLowerCase() === keyword.toLowerCase() ? <mark key={index}>{part}</mark> : part
//     );
//   };

//   return (

//     <form onSubmit={handleSearch}>
//       <input
//          style={{
//           fontFamily: 'Segoe UI',
//           height: '38.5px',
//           border: '1.25px solid #336791',
//           borderRadius: '6px',
//           paddingLeft: '4px',
//           width: '200px',
//           marginLeft: '10px',
//           marginTop: "10px",
//          }}
//         icon={BsSearch}
//         placeholder="Search BesterDev"
//         type="text"
//         value={searchQuery}
//         onChange={(event) => setSearchQuery(event.target.value)}
//         required
//       />

//       {/* <button
//         type="submit"
//         // style={{ marginLeft: '10px', height: '22.5px', border: '1px solid #000000', borderRadius: '5px', backgroundColor: '#ffffff', color: '#000000', cursor: 'pointer' }}>
//         style={{
//           marginLeft: '10px',
//           height: '30.5px',
//           border: '1px solid #336791',
//           borderRadius: '6px',
//           backgroundColor: '#ffffff',
//           color: '#336791',
//           cursor: 'pointer',
//         }}>
//         Search
//       </button> */}

//       <button
//         type="button"
//         onClick={handleCancel}
//         // style={{ marginLeft: '10px', height: '22.5px', border: '1px solid #000000', borderRadius: '5px', backgroundColor: '#ffffff', color: '#000000', cursor: 'pointer' }}>
//         style={{
//           marginLeft: '10px',
//           height: '30.5px',
//           border: '1px solid #336791',
//           borderRadius: '6px',
//           backgroundColor: '#ffffff',
//           color: '#336791',
//           cursor: 'pointer',
//         }}>
//         Clear
//       </button>

//       <div>&nbsp;&nbsp;</div>

//       {/* Display search results */}
//       {searchResults.length > 0 ? (
//         <>
//           {searchResults.map((result) => {
//             if (result.cyclopediaName) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Cyclopedia entry</b>:&nbsp;&nbsp; */}
//                   {editing === result.id ? (
//                     <>
//                       <input
//                         required
//                         defaultValue={result.cyclopediaName}
//                         onChange={(e) => setCyclopedianame(e.target.value)}
//                         style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '6px', width: '350px', padding: 0, paddingLeft: '9px' }}
//                       />
//                       <textarea
//                         required
//                         defaultValue={result.cyclopediaDesc}
//                         onChange={(e) => setCyclopediadesc(e.target.value)}
//                         style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '6px', padding: 0, paddingLeft: '10px', width: '1000px' }}
//                       />
//                     </>
//                   ) : (
//                     <div className="Font-Segoe-Small-Howto">
//                       <a onClick={() => navigate(`/cyclopediaedit/${result.cyclopediaId}`)}>&nbsp;&nbsp;&nbsp;
//                         <GiGiftOfKnowledge style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                         <b>{highlightKeyword(result.cyclopediaName, searchQuery)}: </b>
//                         {highlightKeyword(result.cyclopediaDesc, searchQuery)}
//                         &nbsp;&nbsp;&nbsp;
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               );
//             } else if (result.website_name) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Web Resource</b>:&nbsp;&nbsp; */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <TbWorldWww style={{ color: '#336791', fontSize: '23px', cursor: 'pointer' }} />&nbsp;
//                     <a href={result.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.website_desc}>
//                       <b>{highlightKeyword(result.website_name, searchQuery)}</b>
//                     </a>
//                     -&nbsp;{result.website_desc}
//                   </div>
//                 </div>
//               );
//             } else if (result.news_title) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Breaking News Article</b>:&nbsp;&nbsp; */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <SiWritedotas style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                     <a href={result.news_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.news_source}>
//                       {highlightKeyword(result.news_title, searchQuery)}
//                     </a>
//                     -&nbsp;{result.website_desc}
//                   </div>
//                 </div>
//               );
//             } else if (result.taskname) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Task Name:</b> */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <MdTask style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                     <a href={`/taskedit/${result.id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={`TaskID#${result.id}`}>
//                       <b>{highlightKeyword(result.taskname, searchQuery)}</b>
//                     </a>
//                   </div>
//                 </div>
//               );
//             } else if (result.childrecord) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Task Record:</b> */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <MdTask style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
//                     <a href={`/taskedit/${result.parentid}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={`TaskID#${result.parentid}`}>
//                       <GiFiles style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                       {highlightKeyword(result.childrecord, searchQuery)}
//                     </a>
//                   </div>
//                 </div>
//               );
//             } else if (result.howto_name) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>HOWTO document</b>:&nbsp;&nbsp; */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                     <a href={`/howtoedit/${result.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.howto_summary}>
//                       <b>{highlightKeyword(result.howto_name, searchQuery)}</b>
//                     </a>
//                   </div>
//                 </div>
//               );
//             } else if (result.step_name) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Step Name</b> in a HOWTO document: */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
//                     <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                     <b>{highlightKeyword(result.step_name, searchQuery)}</b> which has a Step Objective to: <i>" {result.step_obj} " </i>
//                   </div>
//                 </div>
//               );
//             } else if (result.steprecord_id) {
//               return (
//                 <div className="dbsearchhoverbanner" key={result.id}>
//                   {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Step Record</b>:&nbsp;&nbsp; */}
//                   <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
//                     <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
//                     <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
//                     <GiFiles style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
//                     {highlightKeyword(result.steprecord, searchQuery)}
//                   </div>
//                 </div>
//               );
//             }
//             return null; // Ignore other types of results
//           })}
//         </>
//       )
//         :
//         noRecordsFound ? (<div>No record exists for search phase: "{searchQuery}"</div>)
//           :
//           null
//       }
//     </form>
//   );
// };

// export default DBSearchComponentBanner2;


import React, { useState } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../Fonts.css';

import { BsPatchQuestion, BsSearch, BsXCircleFill } from "react-icons/bs";
import { IoFootstepsSharp } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
import { SiWritedotas } from "react-icons/si";
import { GiFiles, GiGiftOfKnowledge } from "react-icons/gi";
import { MdTask } from 'react-icons/md';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DBSearchComponentBanner2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editing, setEditing] = useState(false);
  const [cyclopedianame, setCyclopedianame] = useState('');
  const [cyclopediadesc, setCyclopediadesc] = useState('');
  const [cyclopediaidedit, setCyclopediaidedit] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [noRecordsFound, setNorecordsFound] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await OAuth2APIClient.get(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/search?keyword=${searchQuery}`
      );
      setSearchResults(response.data);
      setNorecordsFound(response.data.length === 0);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleCancel = () => {
    setSearchQuery('');
    setSearchResults([]);
    setNorecordsFound(false);
  };

  const handleEdit = (id, name, desc) => {
    setEditing(id);
    setCyclopediaidedit(id);
    setCyclopedianame(name);
    setCyclopediadesc(desc);
  };

  const onEditCancel = () => {
    setEditing(false);
    setNorecordsFound(false);
  };

  const onEditSave = async () => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${cyclopediaidedit}`,
        {
          cyclopedia_name: cyclopedianame,
          cyclopedia_desc: cyclopediadesc,
        }
      );
      toast.success('Cyclopedia Record amended.');
      setCheckForRecords(!checkForRecords);
      onEditCancel();
    } catch {
      toast.error('Failed to amend Cyclopedia Record.');
    }
  };

  const highlightKeyword = (text, keyword) => {
    if (!keyword) return text;
    return text.split(new RegExp(`(${keyword})`, 'gi')).map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase()
        ? <mark key={i}>{part}</mark>
        : part
    );
  };

  return (
    <form onSubmit={handleSearch}>
      {/* Search Input with Icons */}
      <div
        style={{
          position: 'relative',
          width: '160px',
          // marginLeft: '10px',
          // marginTop: '10px',
        }}
      >
        <BsSearch
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#000000',
            pointerEvents: 'none',
          }}
        />

        {/* <input
          type="text"
          placeholder="Search BesterDev"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
          style={{
            fontFamily: 'Segoe UI',
            height: '38.5px',
            width: '100%',
            border: '1.25px solid #ccc',
            borderRadius: '8px',
            paddingLeft: '30px',
            paddingRight: '30px',
          }}
        /> */}

<input
  type="text"
  placeholder="Search BesterDev"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  required
  className="search-input"
  style={{
    fontFamily: 'Segoe UI',
    height: '38.5px',
    width: '100%',
    border: '1.25px solid #ccc',
    borderRadius: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
  }}
/>


        {searchQuery && (
          <BsXCircleFill
            onClick={handleCancel}
            title="Clear search"
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#999',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.color = '#336791')}
            onMouseOut={(e) => (e.target.style.color = '#999')}
          />
        )}
      </div>

      {/* Results */}
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div className="dbsearchhoverbanner" key={result.id}>
            <div className="Font-Segoe-Small-Howto">
              {result.cyclopediaName && (
                <>
                  <GiGiftOfKnowledge
                    style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }}
                    onClick={() => navigate(`/cyclopediaedit/${result.cyclopediaId}`)}
                  />
                  &nbsp;
                  <b>{highlightKeyword(result.cyclopediaName, searchQuery)}:</b>{' '}
                  {highlightKeyword(result.cyclopediaDesc, searchQuery)}
                </>
              )}

              {result.website_name && (
                <>
                  <TbWorldWww style={{ color: '#336791', fontSize: '21px' }} />&nbsp;
                  <a href={result.website_url} target="_blank" rel="noreferrer">
                    {highlightKeyword(result.website_name, searchQuery)}
                  </a>
                </>
              )}

              {result.news_title && (
                <>
                  <SiWritedotas style={{ color: '#336791', fontSize: '21px' }} />&nbsp;
                  <a href={result.news_url} target="_blank" rel="noreferrer">
                    {highlightKeyword(result.news_title, searchQuery)}
                  </a>
                </>
              )}

              {result.taskname && (
                <>
                  <MdTask style={{ color: '#336791', fontSize: '21px' }} />&nbsp;
                  <a href={`/taskedit/${result.id}`}>
                    {highlightKeyword(result.taskname, searchQuery)}
                  </a>
                </>
              )}

              {result.step_name && (
                <>
                  <BsPatchQuestion style={{ color: '#336791', fontSize: '21px' }} />&nbsp;
                  <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px' }} />&nbsp;
                  {highlightKeyword(result.step_name, searchQuery)}
                </>
              )}

              {result.steprecord && (
                <>
                  <GiFiles style={{ color: '#336791', fontSize: '21px' }} />&nbsp;
                  {highlightKeyword(result.steprecord, searchQuery)}
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        noRecordsFound && (
          <div style={{ marginLeft: '10px' }}>
            No record exists for search phrase: "{searchQuery}"
          </div>
        )
      )}
    </form>
  );
};

export default DBSearchComponentBanner2;