import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { toast } from 'react-toastify';

export default function QuickAddCyclopedia() {
    const [cyclopedia_name, setCyclopedia_name] = useState('');
    const [cyclopedia_desc, setCyclopedia_desc] = useState('');
    const [cyclopedia_url, setCyclopedia_url] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        {
            var newRecord =
            {
                'cyclopedia_name': cyclopedia_name,
                'cyclopedia_desc': cyclopedia_desc,
                'cyclopedia_url': cyclopedia_url,
            }

            {
                const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`, newRecord);
                if (response.status === 200) {
                    toast.success(`${cyclopedia_name} added.`)
                    setCyclopedia_name('');
                    setCyclopedia_desc('');
                    setCyclopedia_url('');
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
                    &nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '200px' }} placeholder="What exactly is a ..?" type="text" value={cyclopedia_name} onChange={(event) => setCyclopedia_name(event.target.value)} />
                    &nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '250px' }} placeholder="Description" type="text" value={cyclopedia_desc} onChange={(event) => setCyclopedia_desc(event.target.value)} />
                    &nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '200px' }} placeholder="URL" type="text" value={cyclopedia_url} onChange={(event) => setCyclopedia_url(event.target.value)} />
                    <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '20.5px', border: '1px solid #336791', borderRadius: '5px', backgroundColor: '#336791', color: '#FFFFFF', cursor: 'pointer' }}>Add</button>
                </div>
            </form>
        </div>
    );
}
