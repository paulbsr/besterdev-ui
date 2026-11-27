import { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { GiSpiderWeb } from "react-icons/gi";
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import { useWebsiteApi } from './WebSiteAPIProvider';
import WebsiteCreate from './WebsiteCreate';
import '../Fonts.css';
import '../cyclopedia/CyclopediaManage.css';

function WebsiteManage() {
  const [editing, setEditing] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDesc, setWebsiteDesc] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteCat, setWebsiteCat] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const descriptionEditRef = useRef(null);
  const { websiterootdata, loading, error, setRefreshWebsiterootdata } = useWebsiteApi();

  const reload = () => setRefreshWebsiterootdata((value) => !value);

  useEffect(() => {
    const textarea = descriptionEditRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [editing, websiteDesc]);

  if (loading) return <div className="cyclopedia-manage-page cyclopedia-manage-state">Loading resources...</div>;
  if (error) return <div className="cyclopedia-manage-page cyclopedia-manage-state">Unable to load resources: {error.message}</div>;

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
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/update/${editing}`,
        { websiteName, websiteDesc, websiteUrl, websiteCat }
      );
      reload();
      toast.success('Web resource updated.');
      onEditCancel();
    } catch (updateError) {
      console.error('Failed to update web resource:', updateError);
      toast.error('Failed to update web resource.');
    }
  };

  const onEditDelete = async (row) => {
    if (!window.confirm(`Delete "${row.websiteName}"? This action cannot be undone.`)) return;
    try {
      await OAuth2APIClient.delete(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/delete/${row.websiteId}`
      );
      reload();
      toast.success(`${row.websiteName} purged.`);
      if (editing === row.websiteId) onEditCancel();
    } catch (deleteError) {
      console.error('Failed to delete web resource:', deleteError);
      toast.error('Failed to delete web resource.');
    }
  };

  const filteredWebsites = (websiterootdata ?? []).filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.websiteName?.toLowerCase().includes(term) ||
      row.websiteDesc?.toLowerCase().includes(term) ||
      row.websiteCat?.toLowerCase().includes(term) ||
      row.websiteUrl?.toLowerCase().includes(term)
    );
  });

  return (
    <main className="cyclopedia-manage-page">
      <header className="cyclopedia-manage-header">
        <div className="cyclopedia-manage-title">
          <span className="cyclopedia-manage-title-icon" aria-hidden="true"><GiSpiderWeb /></span>
          <div>
            <p className="cyclopedia-eyebrow">RESOURCE LIBRARY</p>
            <h1>Web Resource Management</h1>
            <p className="cyclopedia-header-description">Curate tools, websites, and books.</p>
          </div>
        </div>
        <div className="cyclopedia-entry-count" aria-label={`${websiterootdata?.length ?? 0} resources`}>
          <strong>{websiterootdata?.length ?? 0}</strong>
          <span>resources</span>
        </div>
      </header>

      <WebsiteCreate onCreated={reload} />

      <section className="cyclopedia-entries-card" aria-labelledby="web-resource-entries-title">
        <div className="cyclopedia-toolbar">
          <div>
            <h2 id="web-resource-entries-title">Your resources</h2>
            <p>Search and manage your resource library.</p>
          </div>
          <label className="cyclopedia-search">
            <span className="cyclopedia-visually-hidden">Search resources</span>
            <input type="search" placeholder="Search resources..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          </label>
        </div>

        <div className="cyclopedia-table-scroll">
          <table className="cyclopedia-table">
            <thead>
            <tr>
              <th scope="col">Actions</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">URL</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredWebsites.map((row) => (
              <tr key={row.websiteId}>
                <td className="cyclopedia-actions-cell">
                  {row.websiteId === editing ? (
                    <>
                      <Tooltip title="Save changes"><button className="cyclopedia-action-button cyclopedia-action-save" type="button" aria-label="Save changes" onClick={onEditSave}><FaCheck /></button></Tooltip>
                      <Tooltip title="Cancel editing"><button className="cyclopedia-action-button cyclopedia-action-cancel" type="button" aria-label="Cancel editing" onClick={onEditCancel}><PiArrowCounterClockwiseBold /></button></Tooltip>
                      <Tooltip title="Delete resource"><button className="cyclopedia-action-button cyclopedia-action-delete" type="button" aria-label={`Delete ${row.websiteName}`} onClick={() => onEditDelete(row)}><FaRegTrashAlt /></button></Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Edit resource"><button className="cyclopedia-action-button cyclopedia-action-edit" type="button" aria-label={`Edit ${row.websiteName}`} onClick={() => handleEdit(row)}><FaPen /></button></Tooltip>
                  )}
                </td>
                <td>
                  {row.websiteId === editing ? (
                    <input className="cyclopedia-inline-input web-resource-field-edit web-resource-name-edit" aria-label={`Edit name for ${row.websiteName}`} value={websiteName} onChange={(event) => setWebsiteName(event.target.value)} />
                  ) : (
                    <a className="cyclopedia-entry-name web-resource-name-display" href={row.websiteUrl} target="_blank" rel="noreferrer">{row.websiteName}</a>
                  )}
                </td>
                <td>
                  {row.websiteId === editing ? (
                    <textarea ref={descriptionEditRef} className="cyclopedia-inline-input cyclopedia-inline-textarea web-resource-description-edit" aria-label={`Edit description for ${row.websiteName}`} rows={3} value={websiteDesc} onChange={(event) => setWebsiteDesc(event.target.value)} />
                  ) : (
                    <span className="cyclopedia-entry-description">{row.websiteDesc}</span>
                  )}
                </td>
                <td>
                  {row.websiteId === editing ? (
                    <textarea
                      className="cyclopedia-inline-input web-resource-url-edit"
                      aria-label={`Edit URL for ${row.websiteName}`}
                      rows={3}
                      wrap="soft"
                      value={websiteUrl}
                      onChange={(event) => setWebsiteUrl(event.target.value)}
                    />
                  ) : (
                    row.websiteUrl
                  )}
                </td>
                <td>
                  {row.websiteId === editing ? (
                    <input className="cyclopedia-inline-input web-resource-field-edit" aria-label={`Edit category for ${row.websiteName}`} value={websiteCat} onChange={(event) => setWebsiteCat(event.target.value)} />
                  ) : (
                    row.websiteCat
                  )}
                </td>
              </tr>
            ))}
            {filteredWebsites.length === 0 && (
              <tr><td className="cyclopedia-empty-state" colSpan={5}>{searchTerm ? 'No resources match your search.' : 'No web resources yet.'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      </section>
    </main>
  );
}

export default WebsiteManage;