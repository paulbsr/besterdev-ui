import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import './Fonts.css';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { BsPencil } from "react-icons/bs"; // Pencil grey
import { GiCheckMark, GiSpiderWeb } from "react-icons/gi"; // Commit grey
import { IoLibrary, IoInformationCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { CyclopediaImageUpload } from './CyclopediaImageUpload';

export default function CyclopediaEdit(props) {
    const [cyclopediadata, setCyclopediadata] = useState([]);
    const { cyclopediarootdata, loading, error, setRefresh } = useCyclopediaApi();
    const [editing, setEditing] = useState(false);
    const [cyclopedia_name, setCyclopedia_name] = useState('');
    const [cyclopedia_desc, setCyclopedia_desc] = useState('');
    const [cyclopedia_ref, setCyclopedia_ref] = useState('');
    const [cyclopedia_url, setCyclopedia_url] = useState('');
    const [checkForRecords, setCheckForRecords] = useState(true);

    const handleEdit = (item) => 
    {
        setCyclopedia_name(item.cyclopedia_name);
        setCyclopedia_desc(item.cyclopedia_desc);
        setCyclopedia_ref(item.cyclopedia_ref);
        setCyclopedia_url(item.cyclopedia_url);
        setEditing(true);
        console.log('In <CyclopediaEdit> is jou cyclopedia_url:', item.cyclopedia_url)
    };

    const onEditCancel = () => {
        setEditing(false);
    };


    const onEditSave = async () => {
        const CyclopediaRecordPUT = 
        {
          'cyclopedia_name': cyclopedia_name,
          'cyclopedia_desc': cyclopedia_desc,
          'cyclopedia_ref': cyclopedia_ref,
          'cyclopedia_url': cyclopedia_url,
        }
    
        try {
          await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${props.cyclopedia_id}`, CyclopediaRecordPUT);
        //   await axios.put(`http://localhost:8000/api/v1/cyclopedia/update/${props.cyclopedia_id}`, CyclopediaRecordPUT);
          toast.success(`Cyclopedia Record amended.`);
          setCheckForRecords(!checkForRecords);
          onEditCancel();
        } catch (error) {
          console.error('Error updating:', error);
          toast.error('Failed to amend Cyclopedia Record.');
        }
      }

    useEffect(() => {
        if (cyclopediarootdata && Array.isArray(cyclopediarootdata)) {
            const filteredcyclopedia = cyclopediarootdata.filter(site => {
                const cyclopedia_id = site.cyclopedia_id;
                return String(cyclopedia_id) === String(props.cyclopedia_id);
            });
            const sortedfilteredcyclopedia = filteredcyclopedia.sort((a, b) =>
                a.cyclopedia_name.localeCompare(b.cyclopedia_name)
            );
            setCyclopediadata(sortedfilteredcyclopedia);
        }
    }, [cyclopediarootdata, props.cyclopedia_id]);


    if (loading) return <div>Loading Cyclopedias...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="Font-Verdana-Medium-Postgres">
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <td style={{ width: '15%' }}></td>
                        <td style={{ width: '1%' }}></td>
                        <td style={{ width: '68%' }}></td>
                        <td style={{ width: '1%' }}></td>
                        <td style={{ width: '15%' }}></td>
                    </tr>
                </thead>


                <tbody>
                    <tr>
                        <td style={{ width: '15%' }} className="Table-home-left"></td>
                        <td style={{ width: '1%' }}></td>
                        <td style={{ width: '68%' }}>
                            {cyclopediadata.length > 0 ?
                                (
                                    cyclopediadata.map((item) => (
                                        <div key={item.cyclopedia_id}>
                                            <div className="Font-Segoe-Large-Howto">
                                                {
                                                    editing ?
                                                        (
                                                            <>
                                                                <Tooltip title='Commit' placement="top-end">
                                                                    <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditSave()}>
                                                                        <GiCheckMark style={{ color: '#336791', display: 'block', margin: 'auto', fontSize: '15px' }} />
                                                                    </button>
                                                                </Tooltip>&nbsp;


                                                                <Tooltip title='Discard' placement="top-end">
                                                                    <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => onEditCancel()}>
                                                                        <PiArrowCounterClockwiseBold style={{ color: '#336791', display: 'block', margin: 'auto', fontSize: '15px' }} />
                                                                    </button>
                                                                </Tooltip>

                                                                <div></div>

                                                                <i>Cyclopedia Name:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <input
                                                                    required
                                                                    defaultValue={item.cyclopedia_name}
                                                                    onChange={(e) => setCyclopedia_name(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>

                                                                <div className='Font-Spacer-White'>Make this Spacer White</div>

                                                                <i>Cyclopedia Description:</i>&nbsp;&nbsp;
                                                                <textarea
                                                                    required
                                                                    defaultValue={item.cyclopedia_desc}
                                                                    onChange={(e) => setCyclopedia_desc(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '150px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>

                                                                <div className="Font-Spacer-White">Make this Spacer White</div>

                                                                {/* <i>Cyclopedia Reference:</i>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <input
                                                                    required
                                                                    defaultValue={item.cyclopedia_ref}
                                                                    onChange={(e) => setCyclopedia_ref(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>

                                                                <div className='Font-Spacer-White'>Make this Spacer White</div> */}

                                                                <i>Cyclopedia URL:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <input
                                                                    required
                                                                    defaultValue={item.cyclopedia_url}
                                                                    onChange={(e) => setCyclopedia_url(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>
                                                                <div className='Font-Spacer-White'>Make this Spacer White</div>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <Tooltip title={`Edit Cyclopedia#${item.cyclopedia_id}`} placement="top-end">
                                                                    <button style={{ height: '20px', width: '25px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(item) }}>
                                                                        <IoLibrary style={{ color: '#336791', fontSize: '30px', cursor: 'pointer' }} /></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                </Tooltip>
                                                                <b>{item.cyclopedia_name}</b><i className="Font-Spacer-White">cyclopedia_id#{item.cyclopedia_id}</i>
                                                                <Tooltip title={`Edit Cyclopedia#${item.cyclopedia_id}`} placement="top-end">
                                                                    <button style={{ height: '20px', width: '20px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(item) }}>
                                                                        <BsPencil style={{ color: '#336791', display: 'block', margin: 'auto', fontSize: '15px' }} />
                                                                    </button>
                                                                </Tooltip>
                                                                <div>&nbsp;</div>


                                                                <div><u>Cyclopedia Description</u>:&nbsp;<IoInformationCircleOutline style={{ color: '#336791', fontSize: '21px' }} />&nbsp;</div>
                                                                <div>{item.cyclopedia_desc}</div>
                                                                <div>&nbsp;</div>
                                                                {/* <div>Reference: {item.cyclopedia_ref}</div> */}
                                                                <div><u>Cyclopedia URL</u>:&nbsp;<GiSpiderWeb style={{ color: '#336791', fontSize: '19px' }} />&nbsp;</div>
                                                                <div><a className="Font-Segoe-Large" href={item.cyclopedia_url} target="_blank" rel="noreferrer">{item.cyclopedia_url}</a></div>
                                                                <div>&nbsp;</div>

                                                                <u>Cyclopedia Graphix</u>:&nbsp;<CyclopediaImageUpload cyclopedia_id_fk={item.cyclopedia_id} cyclopedia_name={item.cyclopedia_name} cyclopedia_id={item.cyclopedia_id} />
                                                                <div>
                                                                    {item.cyclopediaImageEntity && item.cyclopediaImageEntity.cyclopediaimage_data ?
                                                                        (
                                                                            <img
                                                                                src={`data:image/jpeg;base64,${item.cyclopediaImageEntity.cyclopediaimage_data}`}
                                                                                alt={item.cyclopedia_name}
                                                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                                            />
                                                                        )
                                                                        :
                                                                        (
                                                                            <div>No image associated</div>
                                                                        )
                                                                    }
                                                                </div>
                                                            </>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    ))
                                )
                                :
                                (
                                    <div>No data available</div>
                                )
                            }
                        </td>
                        <td style={{ width: '1%' }}></td>
                        <td style={{ width: '15%' }} className="Table-home-right"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}