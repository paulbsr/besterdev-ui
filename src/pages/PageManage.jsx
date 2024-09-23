import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../GradientLineThin';
import CandidateManage from '../candidates/CandidateManage';
import EmployerManage1 from '../employers/EmployerManage1';
import JobreqManage from '../jobs/JobreqManage';
import Footer from '../Footer';
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import CombinedCreateFP from '../CombinedCreateFP';

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
      <CombinedCreateFP />
      <CandidateManage />
      <EmployerManage1 />
      <JobreqManage />
      <Footer/>
      <ToastComponent />
    </div>
  );
};