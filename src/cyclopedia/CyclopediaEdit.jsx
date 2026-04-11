import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../Fonts.css';
import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { GiSpiderWeb, GiGiftOfKnowledge } from "react-icons/gi";
import { toast } from 'react-toastify';
import { CyclopediaImageUpload } from './CyclopediaImageUpload';

export default function CyclopediaEdit({ cyclopediaId }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    cyclopediaName: '',
    cyclopediaDesc: '',
    cyclopediaUrl: '',
    cyclopediaRef: ''
  });

  /* ------------------ fetch single record ------------------ */
  const fetchRecord = async () => {
    setLoading(true);
    try {
      const response = await OAuth2APIClient.get(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/${cyclopediaId},
          {
            caller: 'CyclopediaEdit'
          }`
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

  const saveEdit = async () => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${editingId}`,
        form
      );
      toast.success('Cyclopedia record updated');
      setEditingId(null);
      fetchRecord(); // re-fetch only the updated record
    } catch (err) {
      console.error(err);
      toast.error('Failed to update record');
    }
  };

  if (loading) return <div>Loading Cyclopedia…</div>;
  if (!record) return <div>No Cyclopedia found</div>;

  const isEditing = editingId === record.cyclopediaId;

  /* ------------------ render ------------------ */
  return (
    <div className="Font-Verdana-Medium-Postgres">
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td className="Table-home-left" style={{ width: '15%' }} />
            <td style={{ width: '70%' }}>

              {/* ---------- HEADER ---------- */}
              <div className="Font-Segoe-Large-Howto">
                {!isEditing && (
                  <>
                    <Tooltip title={`Cyclopedia #${record.cyclopediaId}`}>
                      <GiGiftOfKnowledge style={{ fontSize: 40, color: '#4D4D4D' }} />
                    </Tooltip>

                    &nbsp;&nbsp;

                    <a
                      className="Font-Segoe-XLarge-FP"
                      href={record.cyclopediaUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>{record.cyclopediaName}</b>
                    </a>

                    &nbsp;&nbsp;

                    <Tooltip title={`Edit ${record.cyclopediaId}`} placement="top">
                      <button
                        onClick={() => startEdit(record)}
                        style={editBtn}
                      >
                        Edit
                      </button>
                    </Tooltip>

                    <CyclopediaImageUpload
                      cyclopedia_id_fk={record.cyclopediaId}
                      cyclopedia_name={record.cyclopediaName}
                      cyclopedia_id={record.cyclopediaId}
                    />
                  </>
                )}
              </div>

              {/* ---------- EDIT MODE ---------- */}
              {isEditing ? (
                <>
                  <div>
                    <button style={saveBtn} onClick={saveEdit}>Update</button>
                    &nbsp; &nbsp;
                    <button style={cancelBtn} onClick={cancelEdit}>Cancel</button>
                  </div>

                  <br />

                  <label>Name: &nbsp;</label>
                  <input
                    value={form.cyclopediaName}
                    onChange={e => setForm({ ...form, cyclopediaName: e.target.value })}
                    style={{...inputStyle, width: 550}}
                  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <label>URL: &nbsp;</label>
                  <input
                    value={form.cyclopediaUrl}
                    onChange={e => setForm({ ...form, cyclopediaUrl: e.target.value })}
                    style={{...inputStyle, width: 635}}
                  />

                  <br /><br />

                  <label>Description</label>
                  <textarea
                    value={form.cyclopediaDesc}
                    onChange={e => setForm({ ...form, cyclopediaDesc: e.target.value })}
                    style={{ ...inputStyle, height: 150 }}
                  />

                  <br /><br />

                </>
              ) : (
                /* ---------- VIEW MODE ---------- */
                <>
                  <div>
                    <GiSpiderWeb />&nbsp;
                    <a href={record.cyclopediaUrl} target="_blank" rel="noreferrer">
                      {record.cyclopediaUrl}
                    </a>
                  </div>

                  <br />

                  {record.cyclopediaImageEntity?.cyclopediaImage ? (
                    <img
                      src={`data:image/jpeg;base64,${record.cyclopediaImageEntity.cyclopediaImage}`}
                      alt={record.cyclopediaName}
                      style={{ maxWidth: '100%' }}
                    />
                  ) : (
                    <div>No image available</div>
                  )}

                  <br /><br />

                  <textarea
                    readOnly
                    value={record.cyclopediaDesc}
                    style={{
                      ...inputStyle,
                      height: 400,
                      borderColor: '#fff'
                    }}
                  />

                  <br /><br />

                  <CyclopediaImageUpload
                    cyclopedia_id_fk={record.cyclopediaId}
                    cyclopedia_name={record.cyclopediaName}
                    cyclopedia_id={record.cyclopediaId}
                  />
                </>
              )}
            </td>
            <td className="Table-home-right" style={{ width: '15%' }} />
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ------------------ styles ------------------ */

const inputStyle = {
  width: '100%',
  fontFamily: 'Segoe UI',
  fontSize: 'Large',
  border: '1.25px solid #336791',
  borderRadius: '4px'
};

const editBtn = {
  background: '#FFFFFF',
  color: '#000000',
  border: '1px solid #000000',
  cursor: 'pointer',
  borderRadius: '4px',
  width: '65px',
  height: '25px',
};

const saveBtn = {
  background: '#D5441C',
  color: '#fff',
  border: '1px solid #D5441C',
  cursor: 'pointer',
  borderRadius: '4px',
  width: '65px',
  height: '25px',
};

const cancelBtn = {
  background: '#336791',
  color: '#fff',
  border: '1px solid #336791',
  cursor: 'pointer',
  borderRadius: '4px',
  width: '65px',
  height: '25px',
};