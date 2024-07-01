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
import CyclopediaTicker from './CyclopediaTicker';
import DBSearchComponentBanner from './DBSearchComponentBanner';

export default function PageManage() {
  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <Quicklinks3 />
      {/* <DBSearchComponentBanner /> */}
      <CandidateManage />
      <EmployerManage1 />
      <JobreqManage />
      <Footer/>
      <ToastComponent />
    </div>
  );
};