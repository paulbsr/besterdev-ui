import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import spacer from './graphix/besterdev_spacer_white.png';
import { toast } from 'react-toastify';

export default function WebResourceQuickAdd() {
    const [website_name, setWebsite_name] = useState('');
    const [website_desc, setWebsite_desc] = useState('');
    const [website_url, setWebsite_url] = useState('');
    const [website_owner, setWebsite_owner] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        {
            var newRecord =
            {
                'website_name': website_name,
                'website_desc': website_desc,
                'website_url': website_url,
                'website_owner': website_owner,
            }

            {
                const response = await axios.post(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites/create`, newRecord);
                if (response.status === 200) {
                    toast.success(`${website_name} added.`)
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
                    <img alt="1" src={spacer} />QuickAdd Resource:&nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={website_name} onChange={(event) => setWebsite_name(event.target.value)} />
                    <img alt="1" src={spacer} />Description:&nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '350px' }} type="text" value={website_desc} onChange={(event) => setWebsite_desc(event.target.value)} />
                    <img alt="1" src={spacer} />URL:&nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '10px', width: '200px' }} type="text" value={website_url} onChange={(event) => setWebsite_url(event.target.value)} />
                    <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '21.5px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#ffffff', color: 'green', cursor: 'pointer' }}>+ Add</button>
                </div>
            </form>
        </div>
    );  
}
