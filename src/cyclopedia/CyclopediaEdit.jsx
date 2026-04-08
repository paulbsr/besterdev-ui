// import OAuth2APIClient from '../oauth2/OAuth2APIClient';
// import '../Fonts.css';
// import { useState, useEffect } from 'react';
// import { Tooltip } from '@mui/material';
// import { useCyclopediaApi } from './CyclopediaAPIProvider';
// import { GiSpiderWeb } from "react-icons/gi"; // Commit grey
// import { toast } from 'react-toastify';
// import { CyclopediaImageUpload } from './CyclopediaImageUpload';
// import { GiGiftOfKnowledge } from "react-icons/gi";

// export default function CyclopediaEdit(props) {
//     const [cyclopediadata, setCyclopediadata] = useState([]);
//     const [editing, setEditing] = useState(false);
//     const [cyclopediaName, setCyclopediaName] = useState('');
//     const [cyclopediaDesc, setCyclopediaDesc] = useState('');
//     const [cyclopediaRef, setCyclopediaRef] = useState('');
//     const [cyclopediaUrl, setCyclopediaUrl] = useState('');
//     // const [checkForRecords, setCheckForRecords] = useState(true);


// // const { cyclopediarootdata, loading, error, setRefreshCyclopediarootdata } = useCyclopediaApi(); 

//     const { cyclopedia, loading, reload } = useCyclopediaApi();

// useEffect(() => {
//   reload();
// }, [reload]);

//     const handleEdit = (item) => {
//         setCyclopediaName(item.cyclopediaName);
//         setCyclopediaDesc(item.cyclopediaDesc);
//         setCyclopediaRef(item.cyclopediaRef);
//         setCyclopediaUrl(item.cyclopediaUrl);
//         setEditing(true);
//     };

//     const onEditCancel = () => {
//         setEditing(false);
//     };


//     const onEditSave = async () => {
//         const CyclopediaRecordPUT = {
//             'cyclopediaName': cyclopediaName,
//             'cyclopediaDesc': cyclopediaDesc,
//             'cyclopediaRef': cyclopediaRef,
//             'cyclopediaUrl': cyclopediaUrl,
//         };

//         try {
//             await OAuth2APIClient.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${props.cyclopediaId}`, CyclopediaRecordPUT);
//             toast.success(`Cyclopedia Record amended.`);
//             setEditing(false);
//             setRefreshCyclopediarootdata(prev => !prev);  // Assuming setRefresh triggers a data refetch
//         } catch (error) {
//             console.error('Error updating:', error);
//             toast.error('Failed to amend Cyclopedia Record.');
//         }
//     };


//     useEffect(() => {
//         if (cyclopediarootdata && Array.isArray(cyclopediarootdata)) {
//             const filteredcyclopedia = cyclopediarootdata.filter(site => {
//                 const cyclopediaId = site.cyclopediaId;
//                 return String(cyclopediaId) === String(props.cyclopediaId);
//             });
//             const sortedfilteredcyclopedia = filteredcyclopedia.sort((a, b) =>
//                 a.cyclopediaName.localeCompare(b.cyclopediaName)
//             );
//             setCyclopediadata(sortedfilteredcyclopedia);
//         }
//     }, [cyclopediarootdata, props.cyclopediaId, setRefreshCyclopediarootdata]);
//     if (loading) return <div>Loading Cyclopedias...</div>;
//     if (error) return <div>Error: {error.message}</div>;

//     return (
//         <div className="Font-Verdana-Medium-Postgres">
//             <table style={{ width: '100%' }}>
//                 <thead>
//                     <tr>
//                         <td style={{ width: '15%' }}></td>
//                         <td style={{ width: '1%' }}></td>
//                         <td style={{ width: '68%' }}></td>
//                         <td style={{ width: '1%' }}></td>
//                         <td style={{ width: '15%' }}></td>
//                     </tr>
//                 </thead>


//                 <tbody>
//                     <tr>
//                         <td style={{ width: '15%' }} className="Table-home-left"></td>
//                         <td style={{ width: '1%' }}></td>
//                         <td style={{ width: '68%' }}>
//                             {cyclopediadata.length > 0 ?
//                                 (
//                                     cyclopediadata.map((item) => (
//                                         <div key={item.cyclopediaId}>
//                                             <div className="Font-Segoe-Large-Howto">
//                                                 {
//                                                     editing ?
//                                                         (
//                                                             <>
//                                                                 <Tooltip title='Save Changes' placement="top-end">
//                                                                     <button
//                                                                         style={{ marginLeft: '5px', height: '20.5px', border: '1px solid #D5441C', borderRadius: '4px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}
//                                                                         type='button'
//                                                                         onClick={() => onEditSave()}>Update
//                                                                     </button>&nbsp;&nbsp;&nbsp;
//                                                                 </Tooltip>

//                                                                 <Tooltip title='Cancel and Exit' placement="top-end">
//                                                                     <button
//                                                                         style={{ marginLeft: '5px', height: '20.5px', border: '1px solid #336791', borderRadius: '4px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}
//                                                                         type='button'
//                                                                         onClick={() => onEditCancel()}>Revert
//                                                                     </button>&nbsp;&nbsp;&nbsp;
//                                                                 </Tooltip>

//                                                                 <div></div>

//                                                                 <i>Cyclopedia Name:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                                 <input
//                                                                     required
//                                                                     defaultValue={item.cyclopediaName}
//                                                                     onChange={(e) => setCyclopediaName(e.target.value)}
//                                                                     style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '910px' }}
//                                                                 />
//                                                                 <div>&nbsp;&nbsp;</div>

//                                                                 <div className='Font-Spacer-White'>Make this Spacer White</div>

//                                                                 <i>Cyclopedia Description:</i>&nbsp;&nbsp;
//                                                                 <textarea
//                                                                     required
//                                                                     defaultValue={item.cyclopediaDesc}
//                                                                     onChange={(e) => setCyclopediaDesc(e.target.value)}
//                                                                     style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '150px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '910px' }}
//                                                                 />
//                                                                 <div>&nbsp;&nbsp;</div>

//                                                                 <div className="Font-Spacer-White">Make this Spacer White</div>

//                                                                 <i>Cyclopedia URL:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                                                 <input
//                                                                     required
//                                                                     defaultValue={item.cyclopediaUrl}
//                                                                     onChange={(e) => setCyclopediaUrl(e.target.value)}
//                                                                     style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '910px' }}
//                                                                 />
//                                                                 <div>&nbsp;&nbsp;</div>
//                                                                 <div>
//                                                                     {item.cyclopediaImageEntity && item.cyclopediaImageEntity.cyclopediaImage ?
//                                                                         (
//                                                                             <img src={`data:image/jpeg;base64,${item.cyclopediaImageEntity.cyclopediaImage}`} alt={item.cyclopediaName} style={{ maxWidth: '100%', height: 'auto' }} />
//                                                                         )
//                                                                         :
//                                                                         (
//                                                                             <div>No image associated</div>
//                                                                         )
//                                                                     }
//                                                                 </div>



//                                                                 <div className='Font-Spacer-White'>Make this Spacer White</div>
//                                                             </>
//                                                         )
//                                                         :
//                                                         (
//                                                             <>
//                                                                 <div>&nbsp;</div>
//                                                                 <div>&nbsp;</div>
//                                                                 <Tooltip title={`Cyclopedia#${item.cyclopediaId}`} placement="top-end">
//                                                                     <button style={{ height: '20px', width: '25px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(item) }}>
//                                                                         < GiGiftOfKnowledge style={{ color: '#4D4D4D', fontSize: '40px', cursor: 'pointer' }} /></button>&nbsp;&nbsp;&nbsp;&nbsp;
//                                                                 </Tooltip>
//                                                                 <a className="Font-Segoe-XLarge-FP" href={item.cyclopediaUrl} target="_blank" rel="noreferrer"><b>{item.cyclopediaName}</b></a>&nbsp;&nbsp;&nbsp;

//                                                                 <Tooltip title={`Edit Cyclopedia#${item.cyclopediaId}`} placement="top-end">
//                                                                     <button
//                                                                         style={{ marginLeft: '5px', height: '20.5px', border: '1px solid #4D4D4D', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#4D4D4D', cursor: 'pointer', fontSize: '12px' }}
//                                                                         type='button'
//                                                                         onClick={() => { handleEdit(item) }}>Edit
//                                                                     </button>&nbsp;&nbsp;&nbsp;
//                                                                 </Tooltip>

//                                                                 <CyclopediaImageUpload cyclopedia_id_fk={item.cyclopediaId} cyclopedia_name={item.cyclopediaName} cyclopedia_id={item.cyclopediaId} />
//                                                                 <div>
//                                                                     <div>
//                                                                         <GiSpiderWeb style={{ color: '#4D4D4D', fontSize: '19px' }} />&nbsp;
//                                                                         <a className="Font-Segoe-Medium" href={item.cyclopediaUrl} target="_blank" rel="noreferrer">{item.cyclopediaUrl}</a></div>
//                                                                     <div>&nbsp;</div>
//                                                                     <div>&nbsp;</div>
//                                                                     {item.cyclopediaImageEntity && item.cyclopediaImageEntity.cyclopediaImage ?
//                                                                         (
//                                                                             <img
//                                                                                 src={`data:image/jpeg;base64,${item.cyclopediaImageEntity.cyclopediaImage}`}
//                                                                                 alt={item.cyclopediaName}
//                                                                                 style={{ maxWidth: '100%', height: 'auto' }}
//                                                                             />
//                                                                         )
//                                                                         :
//                                                                         (
//                                                                             <div>No image available</div>
//                                                                         )
//                                                                     }
//                                                                 </div>
//                                                                 <div>&nbsp;</div>
//                                                                 <div>
//                                                                     <textarea
//                                                                         required
//                                                                         defaultValue={item.cyclopediaDesc}
//                                                                         style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '400px', border: '1.25px solid #FFFFFF', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '1300px' }}
//                                                                     />
//                                                                 </div>
//                                                             </>
//                                                         )
//                                                 }
//                                             </div>
//                                         </div>
//                                     ))
//                                 )
//                                 :
//                                 (
//                                     <div>No data available</div>
//                                 )
//                             }
//                         </td>
//                         <td style={{ width: '1%' }}></td>
//                         <td style={{ width: '15%' }} className="Table-home-right"></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// }


import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../Fonts.css';
import { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { GiSpiderWeb, GiGiftOfKnowledge } from "react-icons/gi";
import { toast } from 'react-toastify';
import { CyclopediaImageUpload } from './CyclopediaImageUpload';

export default function CyclopediaEdit({ cyclopediaId }) {
  const { cyclopedia, loading, reload } = useCyclopediaApi();

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    cyclopediaName: '',
    cyclopediaDesc: '',
    cyclopediaUrl: '',
    cyclopediaRef: ''
  });

  /* ------------------ initial load ------------------ */
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------ helpers ------------------ */
  const record = Array.isArray(cyclopedia)
    ? cyclopedia.find(c => String(c.cyclopediaId) === String(cyclopediaId))
    : null;

  const startEdit = (item) => {
    setForm({
      cyclopediaName: item.cyclopediaName || '',
      cyclopediaDesc: item.cyclopediaDesc || '',
      cyclopediaUrl: item.cyclopediaUrl || '',
      cyclopediaRef: item.cyclopediaRef || ''
    });
    setEditingId(item.cyclopediaId);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async () => {
    try {
      await OAuth2APIClient.put(
        `https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${editingId}`,
        form
      );
      toast.success('Cyclopedia record updated');
      setEditingId(null);
      reload();
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

                    <Tooltip title="Edit">
                      <button
                        onClick={() => startEdit(record)}
                        style={editBtn}
                      >
                        Edit
                      </button>
                    </Tooltip>
                  </>
                )}
              </div>

              {/* ---------- EDIT MODE ---------- */}
              {isEditing ? (
                <>
                  <div>
                    <button style={saveBtn} onClick={saveEdit}>Update</button>
                    &nbsp;
                    <button style={cancelBtn} onClick={cancelEdit}>Cancel</button>
                  </div>

                  <br />

                  <label>Name</label>
                  <input
                    value={form.cyclopediaName}
                    onChange={e => setForm({ ...form, cyclopediaName: e.target.value })}
                    style={inputStyle}
                  />

                  <br /><br />

                  <label>Description</label>
                  <textarea
                    value={form.cyclopediaDesc}
                    onChange={e => setForm({ ...form, cyclopediaDesc: e.target.value })}
                    style={{ ...inputStyle, height: 150 }}
                  />

                  <br /><br />

                  <label>URL</label>
                  <input
                    value={form.cyclopediaUrl}
                    onChange={e => setForm({ ...form, cyclopediaUrl: e.target.value })}
                    style={inputStyle}
                  />
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
  border: '1px solid #4D4D4D',
  background: '#fff',
  cursor: 'pointer'
};

const saveBtn = {
  background: '#D5441C',
  color: '#fff',
  border: '1px solid #D5441C',
  cursor: 'pointer'
};

const cancelBtn = {
  background: '#336791',
  color: '#fff',
  border: '1px solid #336791',
  cursor: 'pointer'
};