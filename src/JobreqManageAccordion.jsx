import { useState, useEffect, useContext } from 'react'
import './Fonts.css'
import { BsSignpostFill } from "react-icons/bs";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import JobreqManage from './JobreqManage';

export default function JobreqManageAccordion(props) {

    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };

    return (

        <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
            <Tooltip id="insert" />
            <div onClick={toggleAccordion}>
                &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Manage"><BsSignpostFill style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
                &nbsp;<b>Manage JRs</b>
            </div>

            {isExpanded && (
                <div>
                    <div>
                        <JobreqManage />
                    </div>
                </div>)}
        </div>

    );
}