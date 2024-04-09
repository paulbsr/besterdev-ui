import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Fonts.css';
import { toast } from 'react-toastify';

export default function QuickAddWebResource(props) {
    const [website_name, setWebsite_name] = useState('');
    const [website_desc, setWebsite_desc] = useState('');
    const [website_url, setWebsite_url] = useState('');
    const [website_cat, setWebsite_cat] = useState('');
    const [websitedata, setWebsitedata] = useState(null);
    const [checkForRecords, setCheckForRecords] = useState(true);

    useEffect(() => {
        axios('https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/websites')
            .then((response) => {
                const sortedwebsitedata = response.data.sort((b, a) => b.website_name.localeCompare(a.website_name));
                setWebsitedata(sortedwebsitedata);
            })
            .catch((e) => console.error(e));
    },
        [checkForRecords]
    )

    const handleSubmit = async (event) => {
        event.preventDefault();

        {
            var newRecord =
            {
                'website_name': website_name,
                'website_desc': website_desc,
                'website_url': website_url,
                'website_cat': website_cat,
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
                    &nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '200px' }} placeholder="Web resource" type="text" value={website_name} onChange={(event) => setWebsite_name(event.target.value)} />
                    &nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '300px' }} placeholder="Description" type="text" value={website_desc} onChange={(event) => setWebsite_desc(event.target.value)} />
                    &nbsp;&nbsp;<input style={{ height: '19.5px', border: '1.25px solid #c4c4c4', borderRadius: '4px', padding: 0, paddingLeft: '5px', width: '200px' }} placeholder="URL" type="text" value={website_url} onChange={(event) => setWebsite_url(event.target.value)} />
                    &nbsp;&nbsp;<select
                        className='Font-Verdana-QuickAdd'
                        onChange={(event) => {
                            const selectedIndex = event.target.selectedIndex;
                            const selectedOption = event.target.options[selectedIndex];
                            const category = selectedOption.getAttribute("data-category");
                            setWebsite_cat(category);
                        }}
                        id="dropdown"
                        style={{
                            height: '20.5px',
                            border: '1.25px solid #c4c4c4',
                            borderRadius: '4px',
                            padding: 0,
                            paddingLeft: '5px',
                            width: '125px'
                        }}
                    >
                        <option disabled selected value="">Category</option>
                        {websitedata &&
                            Array.from(new Set(websitedata.map(option => option.website_cat)))
                                .sort()
                                .map(category => (
                                    <option key={category} value={category} data-category={category}>
                                        {category}
                                    </option>
                                ))}
                    </select>
                    <button className="Font-Verdana-Small-Postgres" type="submit" style={{ marginLeft: '10px', height: '20.5px', border: '1px solid #169247', borderRadius: '5px', backgroundColor: '#169247', color: '#FFFFFF', cursor: 'pointer' }}>Add</button>
                </div>
            </form>
        </div>
    );
}
