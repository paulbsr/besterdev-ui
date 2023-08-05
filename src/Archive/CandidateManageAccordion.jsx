import { useState, useEffect, useContext } from 'react'
import './Fonts.css'
import { GiKiwiBird } from "react-icons/gi";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import CandidateCreate from './CandidateCreate';
import CandidateManage from './CandidateManage';


export default function CandidateManageAccordion(props) {
    const [isExpanded, setExpanded] = useState(false);
    const toggleAccordion = () => { setExpanded(!isExpanded); };

    return (
        <div className='Font-Verdana-Medium-Postgres'>&nbsp; &nbsp;
            <Tooltip id="insert" />
            <div onClick={toggleAccordion}>
                &nbsp;<a data-tooltip-id="insert" data-tooltip-content="Manage"><GiKiwiBird style={{ color: '#336791', fontSize: '28px', cursor: 'pointer' }} /></a>
                &nbsp;<b>Manage Candidate/Commodities</b>
            </div>

            {isExpanded && (
                <div>
                    <div>
                        <CandidateCreate />
                        <CandidateManage />
                    </div>
                </div>)}
        </div>
    );
}