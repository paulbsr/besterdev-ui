import './Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import CandidateAPI from './CandidateAPI';
import CandidateManage from './CandidateManage';
import EmployerManage from './EmployerManage';
import JobreqManage from './JobreqManage';
import EmployerCreate from './EmployerCreate';
import EmployerManageAccordion from './EmployerManageAccordion';



export default function FrontPage() {

  return (

    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks />
      <CandidateAPI />
      <CandidateManage />
      <EmployerManageAccordion />
      <JobreqManage />
    </div>
  )

};