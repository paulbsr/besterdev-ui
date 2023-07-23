import { useState } from 'react'
import './Fonts.css'
import 'react-dropdown/style.css';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Template2 from './EmployerManageAccordion';
import CandidateScreen from './CandidateScreen';
import CandidateManage from './CandidateManage';
import CandidateCreate from './CandidateCreate';
import EmployerManageAccordion from './EmployerManageAccordion';
import RoleManageAccordion from './RoleManageAccordion';
import CandidateManageAccordion from './CandidateManageAccordion';
import JobreqManageAccordion from './JobreqManageAccordion';
import JobreqManage from './JobreqManage';
dayjs.extend(utc);


export default function FrontPage() {
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const toggleAccordion = () => { setExpanded(!isExpanded); };


  if (error) return <p>An error occurred in tableone</p>

  return (<div>
    <Tooltip id="edit" />
    <Tooltip id="commit" />
    <Tooltip id="revert" />
    <Tooltip id="purge" />

    <BannerWhite />
    <GradientLine />
    <BannerLight />
    <GradientLineThin />
    <Quicklinks />

    <CandidateScreen />
    {/* <CandidateCreate checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
    {/* <CandidateManage checkForRecords={checkForRecords} setCheckForRecords={setCheckForRecords} /> */}
    <CandidateManage/>
    <EmployerManageAccordion/>
    {/* <RoleManageAccordion/> */}
    <JobreqManage/>
    
    
    {/* <AccordionTemplate /> */}

  </div>
  )

};