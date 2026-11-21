import { useEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { FaPen, FaCheck, FaRegTrashAlt } from 'react-icons/fa';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { BsPatchQuestion } from 'react-icons/bs';
import HowtoCreate from './HowtoCreate';
import { useHowtoApi } from './HowtoAPIProvider';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../cyclopedia/CyclopediaManage.css';

export default function HowtoManage() {
  const { howtorootdata, loading, error, reload } = useHowtoApi();
  const [editing, setEditing] = useState(null);
  const [howtoName, setHowtoName] = useState('');
  const [howtoDesc, setHowtoDesc] = useState('');
  const [howtoCat, setHowtoCat] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const descriptionEditRef = useRef(null);

  useEffect(() => {
    const textarea = descriptionEditRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [editing, howtoDesc]);

  if (loading) return <div className="cyclopedia-manage-page cyclopedia-manage-state">Loading Howtos...</div>;
  if (error) return <div className="cyclopedia-manage-page cyclopedia-manage-state">Unable to load Howtos: {error.message}</div>;

  const handleEdit = (row) => {
    setEditing(row.howto_id);
    setHowtoName(row.howto_name ?? '');
    setHowtoDesc(row.howto_desc ?? '');
    setHowtoCat(row.howto_cat ?? '');
  };

  const onEditCancel = () => {
    setEditing(null);
    setHowtoName('');
    setHowtoDesc('');
    setHowtoCat('');
  };

  const onEditSave = async () => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/update/${editing}`,
        {
          howto_name: howtoName,
          howto_desc: howtoDesc,
          howto_cat: howtoCat,
        }
      );
      await reload();
      toast.success('Howto updated.');
      onEditCancel();
    } catch (updateError) {
      console.error('Failed to update Howto:', updateError);
      toast.error('Failed to update Howto.');
    }
  };

  const onEditDelete = async (row) => {
    if (!window.confirm(`Delete "${row.howto_name}"? This action cannot be undone.`)) return;

    try {
      await OAuth2APIClient.delete(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/howto/delete/${row.howto_id}`
      );
      await reload();
      toast.success(`${row.howto_name} deleted.`);
      if (editing === row.howto_id) onEditCancel();
    } catch (deleteError) {
      console.error('Failed to delete Howto:', deleteError);
      toast.error('Cannot delete: ensure this Howto has no Steps still associated.');
    }
  };

  const filteredHowtos = (howtorootdata ?? []).filter((row) => {
    const term = searchTerm.toLowerCase();
    return (
      row.howto_name?.toLowerCase().includes(term) ||
      row.howto_desc?.toLowerCase().includes(term) ||
      row.howto_cat?.toLowerCase().includes(term)
    );
  });

  return (
    <main className="cyclopedia-manage-page">
      <header className="cyclopedia-manage-header">
        <div className="cyclopedia-manage-title">
          <span className="cyclopedia-manage-title-icon" aria-hidden="true">
            <BsPatchQuestion />
          </span>
          <div>
            <p className="cyclopedia-eyebrow">HOW-TO LIBRARY</p>
            <h1>Howto management</h1>
            <p className="cyclopedia-header-description">
              Create and maintain practical guides and instructions.
            </p>
          </div>
        </div>
        <div className="cyclopedia-entry-count" aria-label={`${howtorootdata?.length ?? 0} Howtos`}>
          <strong>{howtorootdata?.length ?? 0}</strong>
          <span>Howtos</span>
        </div>
      </header>

      <HowtoCreate onCreated={reload} />

      <section className="cyclopedia-entries-card" aria-labelledby="howto-entries-title">
        <div className="cyclopedia-toolbar">
          <div>
            <h2 id="howto-entries-title">Your Howtos</h2>
            <p>Search and manage your guide library.</p>
          </div>
          <label className="cyclopedia-search">
            <span className="cyclopedia-visually-hidden">Search Howtos</span>
            <input
              type="search"
              placeholder="Search Howtos..."
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
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {filteredHowtos.map((row) => {
                const isEditing = row.howto_id === editing;

                return (
                  <tr key={row.howto_id}>
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
                          <Tooltip title="Delete Howto" placement="top">
                            <button
                              className="cyclopedia-action-button cyclopedia-action-delete"
                              type="button"
                              aria-label={`Delete ${row.howto_name}`}
                              onClick={() => onEditDelete(row)}
                            >
                              <FaRegTrashAlt aria-hidden="true" />
                            </button>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip title="Edit Howto" placement="top">
                          <button
                            className="cyclopedia-action-button cyclopedia-action-edit"
                            type="button"
                            aria-label={`Edit ${row.howto_name}`}
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
                          aria-label={`Edit name for ${row.howto_name}`}
                          value={howtoName}
                          onChange={(event) => setHowtoName(event.target.value)}
                        />
                      ) : (
                        <span className="cyclopedia-entry-name">{row.howto_name}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <textarea
                          ref={descriptionEditRef}
                          className="cyclopedia-inline-input cyclopedia-inline-textarea"
                          aria-label={`Edit description for ${row.howto_name}`}
                          rows={3}
                          value={howtoDesc}
                          onChange={(event) => setHowtoDesc(event.target.value)}
                        />
                      ) : (
                        <span className="cyclopedia-entry-description">{row.howto_desc}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          className="cyclopedia-inline-input"
                          aria-label={`Edit category for ${row.howto_name}`}
                          value={howtoCat}
                          onChange={(event) => setHowtoCat(event.target.value)}
                        />
                      ) : (
                        row.howto_cat
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredHowtos.length === 0 && (
                <tr>
                  <td className="cyclopedia-empty-state" colSpan={4}>
                    {searchTerm ? 'No Howtos match your search.' : 'No Howtos yet.'}
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
