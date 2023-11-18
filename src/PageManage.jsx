import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import CandidateManage from './CandidateManage';
import EmployerManage1 from './EmployerManage1';
import JobreqManage from './JobreqManage';
import Footer from './Footer';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HowtoManage from './HowtoManage';
import WebsiteManage from './WebsiteManage';



export default function PageManage() {
  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks />
      <GradientLineThin />
      <CandidateManage />
      <EmployerManage1 />
      <JobreqManage />
      <HowtoManage />
      <WebsiteManage />
      <Footer/>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Flip}
        draggable
        pauseOnHover
        theme="dark"/>
    </div>
  );
};