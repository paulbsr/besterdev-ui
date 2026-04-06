import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
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
              <th style={{ width: '200px' }} align="center">Name</th>
              <th style={{ width: '500px' }} align="center">Description</th>
              <th style={{ width: '400px' }} align="center">URL</th>
              <th style={{ width: '100px' }} align="center">Category</th>
            </tr>
          </thead>

          <tbody>
            {filteredWebsites.map((row) => (
              <tr key={row.websiteId}>
                <td>
                  {row.websiteId === editing ? (
                    <>
                      <Tooltip id="reactTooltip" place="left" />
                      <button style={toolBtn('#336791')} onClick={onEditSave} data-tooltip-id="reactTooltip" data-tooltip-content="Commit"><FaCheck style={iconStyle} /></button>
                      <button style={toolBtn('silver')} onClick={onEditCancel} data-tooltip-id="reactTooltip" data-tooltip-content="Revert"><PiArrowCounterClockwiseBold style={iconStyle} /></button>
                      <button style={toolBtn('#D5441C')} onClick={() => onEditDelete(row)} data-tooltip-id="reactTooltip" data-tooltip-content="Purge"><FaRegTrashAlt style={iconStyle} /></button>
                    </>
                  ) : (
                    <button style={toolBtn('#336791')} onClick={() => handleEdit(row)} data-tooltip-id="reactTooltip" data-tooltip-content="Edit"><FaPen style={iconStyle} /></button>
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