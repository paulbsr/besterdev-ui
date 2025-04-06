import React, { useState } from 'react';
import axios from 'axios';
import '../Fonts.css';
import { BsPatchQuestion } from "react-icons/bs";
import { IoFootstepsSharp } from "react-icons/io5";
import { TbWorldWww } from "react-icons/tb";
import GradientLineGreen from '../gradientlines/GradientLineGreen';
import { GiFiles } from "react-icons/gi";
import { toast } from 'react-toastify';
import { MdTask } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GiGiftOfKnowledge, GiSpiderWeb } from "react-icons/gi";


const DBSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editing, setEditing] = useState(false);
  const [cyclopedianame, setCyclopedianame] = useState();
  const [cyclopediadesc, setCyclopediadesc] = useState();
  const [cyclopediaidedit, setCyclopediaidedit] = useState();
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [noRecordsFound, setNorecordsFound] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/search?keyword=${searchQuery}`);
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
      'cyclopediaName': cyclopedianame,
      'cyclopediaDesc': cyclopediadesc,
    }

    try {
      await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${cyclopediaidedit}`, CyclopediaRecordPUT);
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={{ height: '40.5px', border: '0.75px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '900px', fontFamily: 'Segoe UI', fontSize:'18px'}}
          placeholder="Search besterDev"
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          required
        />
        <button
          type="submit"
          style={{ marginLeft: '10px', height: '40.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{ marginLeft: '10px', height: '40.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}
        >
          Clear
        </button>
      </div>
      <div>&nbsp;&nbsp;</div>

      {/* Display search results */}
      {searchResults.length > 0 ?
      (
        <div>
          {searchResults.map((result) => 
          {
            // console.log('Search Results:', searchResults)

            if (result.cyclopediaName) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Cyclopedia entry</b>:&nbsp;&nbsp; */}

                  <div>
                    <div>
                      <div style={{ display: 'flex' }}>
                        <div>
                          {editing === result.id ?
                            <>
                              <input
                                required
                                defaultValue={result.cyclopediaName}
                                onChange={(e) => setCyclopedianame(e.target.value)}
                                style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '4px', width: '350px', padding: 0, paddingLeft: '9px', }} />
                              <div>&nbsp;&nbsp;</div>
                              <div>
                                <textarea
                                  required
                                  defaultValue={result.cyclopediaDesc}
                                  onChange={(e) => setCyclopediadesc(e.target.value)}
                                  style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '21.5px', border: '1.25px solid #D5441C', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '1000px' }} />
                              </div>
                            </>
                            :
                            <div className="Font-Segoe-Small-Howto">
                              <a onClick={() => navigate(`/cyclopediaedit/${result.cyclopediaId}`)}>
                              <GiGiftOfKnowledge style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                              <b>{highlightKeyword(result.cyclopediaName, searchQuery)}</b>
                              {/* {highlightKeyword(result.cyclopediaDesc, searchQuery)} */}
                              &nbsp;&nbsp;&nbsp;
                              </a>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }


            else if (result.websiteName) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Web Resource</b>:&nbsp;&nbsp; */}
                  <div className="Font-Segoe-Small-Howto">
                    <GiSpiderWeb style={{ color: '#336791', fontSize: '23px', cursor: 'pointer' }} />&nbsp;
                    <a href={result.websiteUrl} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.websiteDesc}>
                      <b>{highlightKeyword(result.websiteName, searchQuery)}</b>
                    </a>
                    {/* -&nbsp;{result.websiteDesc} */}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }


            else if (result.news_title) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Breaking News Article</b>:&nbsp;&nbsp; */}
                  <div className="Font-Segoe-Small-Howto">
                    <TbWorldWww style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <a href={result.news_url} target="_blank" rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.news_source}>
                      {highlightKeyword(result.news_title, searchQuery)}
                    </a>
                    -&nbsp;{result.website_desc}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }


            else if (result.taskname) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Task Name:</b> */}
                  <div className="Font-Segoe-Small-Howto">
                    <MdTask style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <a href={`/taskedit/${result.id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.id}>
                    <b>{highlightKeyword(result.taskname, searchQuery)}</b></a>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }


            else if (result.childrecord) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Task Record:</b> */}
                  <div className="Font-Segoe-Small-Howto">
                    <MdTask style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <a href={`/taskedit/${result.parentid}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={`TaskID#${result.parentid}`}>
                    <GiFiles style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    {highlightKeyword(result.childrecord, searchQuery)}
                    </a>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }

            else if (result.howto_name) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>HOWTO document</b>:&nbsp;&nbsp; */}
                  <div className="Font-Segoe-Small-Howto">
                    <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <a href={`/howtoedit/${result.howto_id}`} rel="noopener noreferrer" data-tooltip-id="insert" data-tooltip-content={result.howto_summary}>
                      <b>{highlightKeyword(result.howto_name, searchQuery)}</b>
                    </a>
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }


            else if (result.step_name) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Step Name</b> in a HOWTO document: */}
                  <div className="Font-Segoe-Small-Howto">
                    <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    <b>{highlightKeyword(result.step_name, searchQuery)}</b> 
                    {/* which has a Step Objective to: <i>" {result.step_obj} " </i> */}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }


            else if (result.steprecord_id) {
              return (
                <div className="dbsearchhover" key={result.id}>
                  {/* Found the search phrase <i>"{searchQuery}"</i> in the following <b style={{ color: '#336791' }}>Step Record</b>:&nbsp;&nbsp; */}
                  <div className="Font-Segoe-Small-Howto">
                    <BsPatchQuestion style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <IoFootstepsSharp style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />
                    <GiFiles style={{ color: '#336791', fontSize: '21px', cursor: 'pointer' }} />&nbsp;
                    {highlightKeyword(result.steprecord, searchQuery)}
                  </div>
                  <div className='Font-Spacer-White'>Make this spacer white</div>
                </div>
              );
            }
            return null; // Ignore other types of results
          })}
        </div>

      )
      :
      noRecordsFound ? (<div>No record exists for search phase: "{searchQuery}"</div>)
      :
      null
    }


      <div className='Font-Spacer-White'>Make this spacer white</div>
      <GradientLineGreen />
    </form>
  );
};

export default DBSearchComponent;
