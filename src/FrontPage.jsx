import './Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import CandidateScreen from './CandidateScreen';
import CandidateManage from './CandidateManage';
import EmployerManageAccordion from './EmployerManageAccordion';
import JobreqManage from './JobreqManage';


export default function FrontPage() {

  return (

    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks />
      <CandidateScreen />
      <CandidateManage />
      <EmployerManageAccordion />
      <JobreqManage />
    </div>
  )

};