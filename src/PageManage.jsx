import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import CandidateManage from './CandidateManage';
import EmployerManage1 from './EmployerManage1';
import JobreqManage from './JobreqManage';
import Footer from './Footer';
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';

export default function PageManage() {
  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks3 />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CandidateManage />
      <EmployerManage1 />
      <JobreqManage />
      <Footer/>
      <ToastComponent />
    </div>
  );
};