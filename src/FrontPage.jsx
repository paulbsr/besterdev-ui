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
import EmployerManage1 from './EmployerManage1';
import JobreqManage from './JobreqManage';
import Footer from './Footer';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; 

export default function FrontPage() {

  return (

    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks />
      <CandidateAPI />
   
    </div>
  )
};