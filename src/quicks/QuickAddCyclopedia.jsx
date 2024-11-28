import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { toast } from 'react-toastify';

export default function QuickAddCyclopedia() {
    const [cyclopediaName, setCyclopediaName] = useState('');
    const [cyclopediaDesc, setCyclopediaDesc] = useState('');
    const [cyclopediaUrl, setCyclopediaUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        {
            var newRecord =
            {
                'cyclopediaName': cyclopediaName,
                'cyclopediaDesc': cyclopediaDesc,
                'cyclopediaUrl': cyclopediaUrl,
            }

            {
                const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`, newRecord);
                if (response.status === 200) {
                    toast.success(`${cyclopediaName} added.`)
                    setCyclopediaName('');
                    setCyclopediaDesc('');
                    setCyclopediaUrl('');
                }
                else {
                    toast.error('Gefok')
                }
            }
        }
    }

    return (

        <div className='Font-Verdana-QuickAdd'>&nbsp;
            <form onSubmit={handleSubmit}>
                <div className='Font-Verdana-QuickAdd'>
                    <img alt="1" src={spacer} />
                    &nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '200px' }} placeholder="What exactly is a ..?" type="text" value={cyclopediaName} onChange={(event) => setCyclopediaName(event.target.value)} />
                    &nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '250px' }} placeholder="Description" type="text" value={cyclopediaDesc} onChange={(event) => setCyclopediaDesc(event.target.value)} />
                    &nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '200px' }} placeholder="URL" type="text" value={cyclopediaUrl} onChange={(event) => setCyclopediaUrl(event.target.value)} />
                    <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '20.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>Add</button>
                </div>
            </form>
        </div>
    );
}
