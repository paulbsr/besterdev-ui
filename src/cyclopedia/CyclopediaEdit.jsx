import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../Fonts.css';
import './CyclopediaEdit.css';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { GiSpiderWeb, GiGiftOfKnowledge } from 'react-icons/gi';
import { FiEdit2, FiExternalLink, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { CyclopediaImageUpload } from './CyclopediaImageUpload';

export default function CyclopediaEdit({ cyclopediaId }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    cyclopediaName: '',
    cyclopediaDesc: '',
    cyclopediaUrl: '',
    cyclopediaRef: ''
  });
  const descriptionRef = useRef(null);
  const isEditing = record !== null && editingId === record.cyclopediaId;

  /* ------------------ fetch single record ------------------ */
  const fetchRecord = async () => {
    setLoading(true);
    try {
      const response = await OAuth2APIClient.get(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/${cyclopediaId}`,
        {
          caller: 'CyclopediaEdit' 
        }
      );
      setRecord(response.data);
    } catch (err) {
      console.error('Failed to fetch cyclopedia:', err);
      setRecord(null);
      toast.error('Failed to load Cyclopedia');
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ initial load ------------------ */
  useEffect(() => {
    fetchRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cyclopediaId]);

  useLayoutEffect(() => {
    const textarea = descriptionRef.current;
    if (!isEditing || !textarea) return undefined;

    const resizeTextarea = () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    resizeTextarea();
    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, [form.cyclopediaDesc, isEditing]);

  /* ------------------ helpers ------------------ */
  const startEdit = (item) => {
    setForm({
      cyclopediaName: item.cyclopediaName || '',
      cyclopediaDesc: item.cyclopediaDesc || '',
      cyclopediaUrl: item.cyclopediaUrl || '',
      cyclopediaRef: item.cyclopediaRef || ''
    });
    setEditingId(item.cyclopediaId);
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (event) => {
    event.preventDefault();
    if (!form.cyclopediaName.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${editingId}`,
        form
      );
      toast.success('Cyclopedia record updated');
      setEditingId(null);
      fetchRecord();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update record');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="cyclopedia-edit-page">
        <div className="cyclopedia-edit-state" role="status">Loading Cyclopedia entry...</div>
      </main>
    );
  }
  if (!record) {
    return (
      <main className="cyclopedia-edit-page">
        <div className="cyclopedia-edit-state" role="alert">No Cyclopedia entry found.</div>
      </main>
    );
  }

  return (
    <main className="cyclopedia-edit-page">
      <header className="cyclopedia-edit-header">
        <div className="cyclopedia-edit-heading">
          <span className="cyclopedia-edit-icon" aria-hidden="true">
            <GiGiftOfKnowledge />
          </span>
          <div>
            <p className="cyclopedia-edit-eyebrow">
              CYCLOPEDIA ENTRY <span>#{record.cyclopediaId}</span>
            </p>
            <h1>{isEditing ? 'Edit entry' : record.cyclopediaName}</h1>
            {!isEditing && (
              <p className="cyclopedia-edit-subtitle">Review and manage this knowledge entry.</p>
            )}
          </div>
        </div>
        {!isEditing && (
          <button
            className="cyclopedia-edit-button cyclopedia-edit-button-primary"
            type="button"
            onClick={() => startEdit(record)}
          >
            <FiEdit2 aria-hidden="true" />
            Edit entry
          </button>
        )}
      </header>

      <section className="cyclopedia-edit-card">
        {isEditing ? (
          <form className="cyclopedia-edit-form" onSubmit={saveEdit}>
            <label className="cyclopedia-edit-field">
              <span>Name</span>
              <input
                autoFocus
                value={form.cyclopediaName}
                onChange={(event) => setForm({ ...form, cyclopediaName: event.target.value })}
                required
              />
            </label>

            <label className="cyclopedia-edit-field">
              <span>URL</span>
              <input
                value={form.cyclopediaUrl}
                onChange={(event) => setForm({ ...form, cyclopediaUrl: event.target.value })}
              />
            </label>

            <label className="cyclopedia-edit-field cyclopedia-edit-field-wide">
              <span>Reference <span className="cyclopedia-edit-optional">Optional</span></span>
              <input
                value={form.cyclopediaRef}
                onChange={(event) => setForm({ ...form, cyclopediaRef: event.target.value })}
              />
            </label>

            <label className="cyclopedia-edit-field cyclopedia-edit-field-wide">
              <span>Description</span>
              <textarea
                ref={descriptionRef}
                rows={7}
                value={form.cyclopediaDesc}
                onChange={(event) => setForm({ ...form, cyclopediaDesc: event.target.value })}
              />
            </label>

            <section className="cyclopedia-edit-upload-panel cyclopedia-edit-field-wide" aria-labelledby="cyclopedia-edit-upload-title">
              <h2 id="cyclopedia-edit-upload-title">Upload Image</h2>
              <p>Select an image to upload or replace the image for this entry.</p>
              <div className="cyclopedia-edit-upload">
                <CyclopediaImageUpload
                  cyclopedia_id_fk={record.cyclopediaId}
                  cyclopedia_name={record.cyclopediaName}
                  cyclopedia_id={record.cyclopediaId}
                />
                <span>Choose an image</span>
              </div>
            </section>

            <div className="cyclopedia-edit-form-actions cyclopedia-edit-field-wide">
              <button
                className="cyclopedia-edit-button cyclopedia-edit-button-primary"
                type="submit"
                disabled={saving}
              >
                <FiSave aria-hidden="true" />
                {saving ? 'Saving...' : 'Save changes'}
              </button>
              <button
                className="cyclopedia-edit-button cyclopedia-edit-button-secondary"
                type="button"
                onClick={cancelEdit}
                disabled={saving}
              >
                <FiX aria-hidden="true" />
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="cyclopedia-edit-content">
            {record.cyclopediaUrl ? (
              <a
                className="cyclopedia-edit-url"
                href={record.cyclopediaUrl}
                target="_blank"
                rel="noreferrer"
              >
                <GiSpiderWeb aria-hidden="true" />
                <span>{record.cyclopediaUrl}</span>
                <FiExternalLink aria-hidden="true" />
              </a>
            ) : (
              <p className="cyclopedia-edit-no-url">No URL has been added.</p>
            )}

            {record.cyclopediaRef && (
              <div className="cyclopedia-edit-reference">
                <span>Reference</span>
                <strong>{record.cyclopediaRef}</strong>
              </div>
            )}

            {record.cyclopediaImageEntity?.cyclopediaImage && (
              <img
                className="cyclopedia-edit-inline-image"
                src={`data:image/jpeg;base64,${record.cyclopediaImageEntity.cyclopediaImage}`}
                alt={record.cyclopediaName || 'Cyclopedia entry'}
              />
            )}

            <section className="cyclopedia-edit-description">
              <h2>Description</h2>
              <p>{record.cyclopediaDesc || 'No description has been added.'}</p>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}