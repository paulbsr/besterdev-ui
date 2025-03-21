import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import '../Fonts.css';
import { useCyclopediaApi } from './CyclopediaAPIProvider';
import { BsPencil } from "react-icons/bs"; // Pencil grey
import { GiCheckMark, GiSpiderWeb } from "react-icons/gi"; // Commit grey
import { IoLibrary, IoInformationCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { PiArrowCounterClockwiseBold } from 'react-icons/pi';
import { CyclopediaImageUpload } from './CyclopediaImageUpload';
import { GiGiftOfKnowledge } from "react-icons/gi";

export default function CyclopediaEdit(props) {
    const [cyclopediadata, setCyclopediadata] = useState([]);
    const { cyclopediarootdata, loading, error, setRefreshCyclopediarootdata } = useCyclopediaApi();
    const [editing, setEditing] = useState(false);
    const [cyclopediaName, setCyclopediaName] = useState('');
    const [cyclopediaDesc, setCyclopediaDesc] = useState('');
    const [cyclopediaRef, setCyclopediaRef] = useState('');
    const [cyclopediaUrl, setCyclopediaUrl] = useState('');
    // const [checkForRecords, setCheckForRecords] = useState(true);

    const handleEdit = (item) => {
        setCyclopediaName(item.cyclopediaName);
        setCyclopediaDesc(item.cyclopediaDesc);
        setCyclopediaRef(item.cyclopediaRef);
        setCyclopediaUrl(item.cyclopediaUrl);
        setEditing(true);
    };

    const onEditCancel = () => {
        setEditing(false);
    };


    const onEditSave = async () => {
        const CyclopediaRecordPUT = {
            'cyclopediaName': cyclopediaName,
            'cyclopediaDesc': cyclopediaDesc,
            'cyclopediaRef': cyclopediaRef,
            'cyclopediaUrl': cyclopediaUrl,
        };

        try {
            await axios.put(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/update/${props.cyclopediaId}`, CyclopediaRecordPUT);
            toast.success(`Cyclopedia Record amended.`);
            setEditing(false);
            setRefreshCyclopediarootdata(prev => !prev);  // Assuming setRefresh triggers a data refetch
        } catch (error) {
            console.error('Error updating:', error);
            toast.error('Failed to amend Cyclopedia Record.');
        }
    };


    useEffect(() => {
        if (cyclopediarootdata && Array.isArray(cyclopediarootdata)) {
            const filteredcyclopedia = cyclopediarootdata.filter(site => {
                const cyclopediaId = site.cyclopediaId;
                return String(cyclopediaId) === String(props.cyclopediaId);
            });
            const sortedfilteredcyclopedia = filteredcyclopedia.sort((a, b) =>
                a.cyclopediaName.localeCompare(b.cyclopediaName)
            );
            setCyclopediadata(sortedfilteredcyclopedia);
        }
    }, [cyclopediarootdata, props.cyclopediaId, setRefreshCyclopediarootdata]);
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
                                        <div key={item.cyclopediaId}>
                                            <div className="Font-Segoe-Large-Howto">
                                                {
                                                    editing ?
                                                        (
                                                            <>
                                                                <Tooltip title='Save Changes' placement="top-end">
                                                                    <button
                                                                        style={{ marginLeft: '5px', height: '20.5px', border: '1px solid #D5441C', borderRadius: '4px', backgroundColor: '#D5441C', color: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}
                                                                        type='button'
                                                                        onClick={() => onEditSave()}>Update
                                                                    </button>&nbsp;&nbsp;&nbsp;
                                                                </Tooltip>

                                                                <Tooltip title='Cancel and Exit' placement="top-end">
                                                                    <button
                                                                        style={{ marginLeft: '5px', height: '20.5px', border: '1px solid #336791', borderRadius: '4px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}
                                                                        type='button'
                                                                        onClick={() => onEditCancel()}>Revert
                                                                    </button>&nbsp;&nbsp;&nbsp;
                                                                </Tooltip>

                                                                <div></div>

                                                                <i>Cyclopedia Name:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <input
                                                                    required
                                                                    defaultValue={item.cyclopediaName}
                                                                    onChange={(e) => setCyclopediaName(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>

                                                                <div className='Font-Spacer-White'>Make this Spacer White</div>

                                                                <i>Cyclopedia Description:</i>&nbsp;&nbsp;
                                                                <textarea
                                                                    required
                                                                    defaultValue={item.cyclopediaDesc}
                                                                    onChange={(e) => setCyclopediaDesc(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '150px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>

                                                                <div className="Font-Spacer-White">Make this Spacer White</div>

                                                                <i>Cyclopedia URL:</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <input
                                                                    required
                                                                    defaultValue={item.cyclopediaUrl}
                                                                    onChange={(e) => setCyclopediaUrl(e.target.value)}
                                                                    style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '27.5px', border: '1.25px solid #336791', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '910px' }}
                                                                />
                                                                <div>&nbsp;&nbsp;</div>
                                                                <div>
                                                                    {item.cyclopediaImageEntity && item.cyclopediaImageEntity.cyclopediaImage ?
                                                                        (
                                                                            <img src={`data:image/jpeg;base64,${item.cyclopediaImageEntity.cyclopediaImage}`} alt={item.cyclopediaName} style={{ maxWidth: '100%', height: 'auto' }} />
                                                                        )
                                                                        :
                                                                        (
                                                                            <div>No image associated</div>
                                                                        )
                                                                    }
                                                                </div>



                                                                <div className='Font-Spacer-White'>Make this Spacer White</div>
                                                            </>
                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <div>&nbsp;</div>
                                                                <div>&nbsp;</div>
                                                                <Tooltip title={`Cyclopedia#${item.cyclopediaId}`} placement="top-end">
                                                                    <button style={{ height: '20px', width: '25px', padding: 0, border: 'none', borderRadius: '3px', backgroundColor: 'white', outline: 'none', cursor: 'pointer' }} type='button' onClick={() => { handleEdit(item) }}>
                                                                        < GiGiftOfKnowledge style={{ color: '#4D4D4D', fontSize: '40px', cursor: 'pointer' }} /></button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                </Tooltip>
                                                                <a className="Font-Segoe-XLarge-FP" href={item.cyclopediaUrl} target="_blank" rel="noreferrer"><b>{item.cyclopediaName}</b></a>&nbsp;&nbsp;&nbsp;

                                                                <Tooltip title={`Edit Cyclopedia#${item.cyclopediaId}`} placement="top-end">
                                                                    <button
                                                                        style={{ marginLeft: '5px', height: '20.5px', border: '1px solid #4D4D4D', borderRadius: '5px', backgroundColor: '#FFFFFF', color: '#4D4D4D', cursor: 'pointer', fontSize: '12px' }}
                                                                        type='button'
                                                                        onClick={() => { handleEdit(item) }}>Edit
                                                                    </button>&nbsp;&nbsp;&nbsp;
                                                                </Tooltip>

                                                                <CyclopediaImageUpload cyclopedia_id_fk={item.cyclopediaId} cyclopedia_name={item.cyclopediaName} cyclopedia_id={item.cyclopediaId} />
                                                                <div>
                                                                    <div>
                                                                        <GiSpiderWeb style={{ color: '#4D4D4D', fontSize: '19px' }} />&nbsp;
                                                                        <a className="Font-Segoe-Medium" href={item.cyclopediaUrl} target="_blank" rel="noreferrer">{item.cyclopediaUrl}</a></div>
                                                                    <div>&nbsp;</div>
                                                                    <div>&nbsp;</div>
                                                                    {item.cyclopediaImageEntity && item.cyclopediaImageEntity.cyclopediaImage ?
                                                                        (
                                                                            <img
                                                                                src={`data:image/jpeg;base64,${item.cyclopediaImageEntity.cyclopediaImage}`}
                                                                                alt={item.cyclopediaName}
                                                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                                            />
                                                                        )
                                                                        :
                                                                        (
                                                                            <div>No image available</div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div>&nbsp;</div>
                                                                <div>
                                                                    <textarea
                                                                        required
                                                                        defaultValue={item.cyclopediaDesc}
                                                                        style={{ fontFamily: 'Segoe UI', fontSize: 'Large', height: '400px', border: '1.25px solid #FFFFFF', borderRadius: '4px', padding: 0, paddingLeft: '1px', width: '1300px' }}
                                                                    />
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