import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { toast } from 'react-toastify';

export default function CyclopediaAdd() {
    const [cyclopedia_name, setCyclopedia_name] = useState('');
    const [cyclopedia_desc, setCyclopedia_desc] = useState('');
    const [cyclopedia_ref, setCyclopedia_ref] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        {
            var newRecord =
            {
                'cyclopedia_name': cyclopedia_name,
                'cyclopedia_desc': cyclopedia_desc,
                'cyclopedia_ref': cyclopedia_ref,
            }

            {
                const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/cyclopedia/create`, newRecord);
                if (response.status === 200) {
                    toast.success(`${cyclopedia_name} added.`)
                }
                else {
                    toast.error('Nee')
                }
            }
        }
    }

    return (

        <div className='Font-Verdana-QuickAdd'>&nbsp;

            <form onSubmit={handleSubmit}>

                <div className='Font-Verdana-QuickAdd'>
                    <img alt="1" src={spacer} />whatExactlyIs:&nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={cyclopedia_name} onChange={(event) => setCyclopedia_name(event.target.value)} />
                    <img alt="1" src={spacer} />Description:&nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="text" value={cyclopedia_desc} onChange={(event) => setCyclopedia_desc(event.target.value)} />
                    <img alt="1" src={spacer} />URL:&nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={cyclopedia_ref} onChange={(event) => setCyclopedia_ref(event.target.value)} />
                    <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '21.5px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#ffffff', color: 'green', cursor: 'pointer' }}>+ Add</button>
                </div>
            </form>
        </div>
    );  
}
