import React, { useState } from 'react';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { IoFootstepsSharp } from "react-icons/io5";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { BsPatchQuestion } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { SiWritedotas } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { GiFiles } from "react-icons/gi";
import { MdTask } from 'react-icons/md';
import { toast } from 'react-toastify';
import '../Fonts.css';


const DBSearchComponentBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editing, setEditing] = useState(false);
  const [cyclopedianame, setCyclopedianame] = useState('');
  const [cyclopediadesc, setCyclopediadesc] = useState('');
  const [cyclopediaidedit, setCyclopediaidedit] = useState('');
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [noRecordsFound, setNorecordsFound] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/search?keyword=${searchQuery}`,
          {
            caller: 'DBSearchComponentBanner'
          }
        );
      setSearchResults(response.data);
      setNorecordsFound(response.data.length === 0);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleEdit = (crap, cyclopediaID, cyclopediaNAME, cyclopediaDESC) => {
    setCyclopediaidedit(cyclopediaID);
    setEditing(crap);
    setCyclopedianame(cyclopediaNAME);
    setCyclopediadesc(cyclopediaDESC);
  }

  const onEditCancel = () => {
    setEditing(false);
    setNorecordsFound(false);
  }

  const onEditSave = async () => {
    const CyclopediaRecordPUT = {
      'cyclopedia_name': cyclopedianame,
      'cyclopedia_desc': cyclopediadesc,
    }

    try {
      await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${cyclopediaidedit}`, CyclopediaRecordPUT);
      toast.success(`Cyclopedia Record amended.`);
      setCheckForRecords(!checkForRecords);
      onEditCancel();
    } catch (error) {
      console.error('Error updating:', error);
      toast.error('Failed to amend Cyclopedia Record.');
    }
  }

  const handleCancel = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const highlightKeyword = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        style={{
          fontFamily: 'Segoe UI',
          height: '28.5px',
          border: '1.25px solid #336791',
          borderRadius: '6px',
          paddingLeft: '4px',
          width: '700px',
          marginLeft: '10px',
          marginTop: "10px",
          marginBottom: "10px",
          boxShadow: '10px 10px 10px rgba(0,0,0,0.2)',
        }}
        placeholder="Search BesterDev"
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        required
      />

      <button
        type="submit"
        style={{
          marginLeft: '20px',
          height: '30.5px',
          border: '1px solid #336791',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          color: '#336791',
          cursor: 'pointer',
        }}>
        Search
      </button>

      <button
        type="button"
        onClick={handleCancel}
        style={{
          marginLeft: '20px',
          height: '30.5px',
          border: '1px solid #336791',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          color: '#336791',
          cursor: 'pointer',
        }}>
        Clear
      </button>

      {searchResults.length > 0 ? (
        <>
          {searchResults.map((result) => {
            if (result.cyclopediaName) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  {editing === result.id ? (
                    <>
                      <input
                        required
                        defaultValue={result.cyclopediaName}
                        onChange={(e) => setCyclopedianame(e.target.value)}
                        style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '6px', width: '350px', padding: 0, paddingLeft: '9px' }}
                      />
                      <textarea
                        required
                        defaultValue={result.cyclopediaDesc}
                        onChange={(e) => setCyclopediadesc(e.target.value)}
                        style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '6px', padding: 0, paddingLeft: '10px', width: '1000px' }}
                      />
                    </>
                  ) : (
                    <div className="Font-Segoe-Small-Howto">
                      <a onClick={() => navigate(`/cyclopediaedit/${result.cyclopediaId}`)}>&nbsp;&nbsp;&nbsp;
                        <GiGiftOfKnowledge style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                        <b>{highlightKeyword(result.cyclopediaName, searchQuery)}: </b>
                        {highlightKeyword(result.cyclopediaDesc, searchQuery)}
                        &nbsp;&nbsp;&nbsp;
                      </a>
                    </div>
                  )}
                </div>
              );
            } else if (result.website_name) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <TbWorldWww style={{ color: '#336791', fontSize: '23px', cursor: 'pointer' }} />&nbsp;
                    <a href={result.website_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.website_desc}>
                      <b>{highlightKeyword(result.website_name, searchQuery)}</b>
                    </a>
                    -&nbsp;{result.website_desc}
                  </div>
                </div>
              );
            } else if (result.news_title) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <SiWritedotas style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <a href={result.news_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.news_source}>
                      {highlightKeyword(result.news_title, searchQuery)}
                    </a>
                    -&nbsp;{result.website_desc}
                  </div>
                </div>
              );
            } else if (result.taskname) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <MdTask style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <a href={`/taskedit/${result.id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={`TaskID#${result.id}`}>
                      <b>{highlightKeyword(result.taskname, searchQuery)}</b>
                    </a>
                  </div>
                </div>
              );
            } else if (result.childrecord) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <MdTask style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <a href={`/taskedit/${result.parentid}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={`TaskID#${result.parentid}`}>
                      <GiFiles style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                      {highlightKeyword(result.childrecord, searchQuery)}
                    </a>
                  </div>
                </div>
              );
            } else if (result.howto_name) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <a href={`/howtoedit/${result.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.howto_summary}>
                      <b>{highlightKeyword(result.howto_name, searchQuery)}</b>
                    </a>
                  </div>
                </div>
              );
            } else if (result.step_name) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <b>{highlightKeyword(result.step_name, searchQuery)}</b> which has a Step Objective to: <i>" {result.step_obj} " </i>
                  </div>
                </div>
              );
            } else if (result.steprecord_id) {
              return (
                <div className="dbsearchhoverbanner" key={result.id}>
                  <div className="Font-Segoe-Small-Howto">&nbsp;&nbsp;&nbsp;
                    <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <GiFiles style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    {highlightKeyword(result.steprecord, searchQuery)}
                  </div>
                </div>
              );
            }
            return null; // Ignore other types of results
          })}
        </>
      )
        :
        noRecordsFound ? (<div>No record exists for search phase: "{searchQuery}"</div>)
          :
          null
      }
    </form>
  );
};

export default DBSearchComponentBanner;
