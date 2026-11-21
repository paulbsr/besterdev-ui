import { useState, useEffect, useRef } from 'react';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { GiGiftOfKnowledge } from "react-icons/gi";
import CyclopediaCreate from './CyclopediaCreate';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import './CyclopediaManage.css';


function CyclopediaManage() {
  const [editing, setEditing] = useState(null);
  const [cyclopediaName, setCyclopediaName] = useState('');
  const [cyclopediaDesc, setCyclopediaDesc] = useState('');
  const [cyclopediaRef, setCyclopediaRef] = useState('');
  const descriptionEditRef = useRef(null);
  const { cyclopediaData, loading, error, reload } = useCyclopediaApi(); //gebruik van die nuwexuseContect :-)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    const textarea = descriptionEditRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [editing, cyclopediaDesc]);

  if (loading) return <div className="cyclopedia-manage-page cyclopedia-manage-state">Loading entries...</div>;
  if (error) return <div className="cyclopedia-manage-page cyclopedia-manage-state">Unable to load entries: {error.message}</div>;


  const handleEdit = (row) => {
    setEditing(row.cyclopediaId);
    setCyclopediaName(row.cyclopediaName);
    setCyclopediaDesc(row.cyclopediaDesc);
    setCyclopediaRef(row.cyclopediaRef);
  }

  const onEditCancel = () => {
    setEditing(null);
    setCyclopediaName('');
    setCyclopediaDesc('');
    setCyclopediaRef('');
  }


  const onEditDelete = async (row) => {
    if (!window.confirm(`Delete "${row.cyclopediaName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await OAuth2APIClient.delete(`/api/v1/cyclopedia/delete/${row.cyclopediaId}`);
      toast.success(`${row.cyclopediaName} deleted.`);
      await reload();
      if (editing === row.cyclopediaId) {
        onEditCancel();
      }
    } catch (deleteError) {
      console.error('Failed to delete Cyclopedia entry:', deleteError);
      toast.error('Failed to delete Cyclopedia entry.');
    }
  };


  const onEditSave = async () => {
    try {
      await OAuth2APIClient.put(`/api/v1/cyclopedia/update/${editing}`, {
        cyclopediaName,
        cyclopediaDesc,
        cyclopediaRef,
      });
      await reload();
      toast.success('Cyclopedia entry updated.');
      onEditCancel();
    } catch (updateError) {
      console.error('Failed to update Cyclopedia entry:', updateError);
      toast.error('Failed to update Cyclopedia entry.');
    }
  }

  const filteredCyclopedia = (cyclopediaData ?? []).filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.cyclopediaName?.toLowerCase().includes(term) ||
      row.cyclopediaDesc?.toLowerCase().includes(term) ||
      row.cyclopediaRef?.toLowerCase().includes(term)
    );
  });



  return (
    <main className="cyclopedia-manage-page">
      <header className="cyclopedia-manage-header">
        <div className="cyclopedia-manage-title">
          <span className="cyclopedia-manage-title-icon" aria-hidden="true">
            <GiGiftOfKnowledge />
          </span>
          <div>
            <p className="cyclopedia-eyebrow">KNOWLEDGE LIBRARY</p>
            <h1>Cyclopedia management</h1>
            <p className="cyclopedia-header-description">
              Curate definitions, concepts, and reference links.
            </p>
          </div>
        </div>
        <div className="cyclopedia-entry-count" aria-label={`${cyclopediaData?.length ?? 0} entries`}>
          <strong>{cyclopediaData?.length ?? 0}</strong>
          <span>entries</span>
        </div>
      </header>

      <CyclopediaCreate onCreated={reload} />

      <section className="cyclopedia-entries-card" aria-labelledby="cyclopedia-entries-title">
        <div className="cyclopedia-toolbar">
          <div>
            <h2 id="cyclopedia-entries-title">Your entries</h2>
            <p>Search and manage your knowledge library.</p>
          </div>
          <label className="cyclopedia-search">
            <span className="cyclopedia-visually-hidden">Search entries</span>
            <input
              type="search"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="cyclopedia-table-scroll">
          <table className="cyclopedia-table">
            <thead>
              <tr>
                <th scope="col">Actions</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredCyclopedia.map((row) => {
                const isEditing = row.cyclopediaId === editing;

                return (
                  <tr key={row.cyclopediaId}>
                    <td className="cyclopedia-actions-cell">
                      {isEditing ? (
                        <>
                          <Tooltip title="Save changes" placement="top">
                            <button
                              className="cyclopedia-action-button cyclopedia-action-save"
                              type="button"
                              aria-label="Save changes"
                              onClick={onEditSave}
                            >
                              <FaCheck aria-hidden="true" />
                            </button>
                          </Tooltip>
                          <Tooltip title="Cancel editing" placement="top">
                            <button
                              className="cyclopedia-action-button cyclopedia-action-cancel"
                              type="button"
                              aria-label="Cancel editing"
                              onClick={onEditCancel}
                            >
                              <PiArrowCounterClockwiseBold aria-hidden="true" />
                            </button>
                          </Tooltip>
                          <Tooltip title="Delete entry" placement="top">
                            <button
                              className="cyclopedia-action-button cyclopedia-action-delete"
                              type="button"
                              aria-label={`Delete ${row.cyclopediaName}`}
                              onClick={() => onEditDelete(row)}
                            >
                              <FaRegTrashAlt aria-hidden="true" />
                            </button>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip title="Edit entry" placement="top">
                          <button
                            className="cyclopedia-action-button cyclopedia-action-edit"
                            type="button"
                            aria-label={`Edit ${row.cyclopediaName}`}
                            onClick={() => handleEdit(row)}
                          >
                            <FaPen aria-hidden="true" />
                          </button>
                        </Tooltip>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className="cyclopedia-inline-input"
                          aria-label={`Edit name for ${row.cyclopediaName}`}
                          value={cyclopediaName}
                          onChange={(event) => setCyclopediaName(event.target.value)}
                        />
                      ) : (
                        <span className="cyclopedia-entry-name">{row.cyclopediaName}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <textarea
                          ref={descriptionEditRef}
                          className="cyclopedia-inline-input cyclopedia-inline-textarea"
                          aria-label={`Edit description for ${row.cyclopediaName}`}
                          rows={3}
                          value={cyclopediaDesc}
                          onChange={(event) => setCyclopediaDesc(event.target.value)}
                        />
                      ) : (
                        <span className="cyclopedia-entry-description">{row.cyclopediaDesc}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredCyclopedia.length === 0 && (
                <tr>
                  <td className="cyclopedia-empty-state" colSpan={3}>
                    {searchTerm ? 'No entries match your search.' : 'No Cyclopedia entries yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default CyclopediaManage;

