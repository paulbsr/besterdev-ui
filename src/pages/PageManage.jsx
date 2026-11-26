import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import CandidateManage from '../candidates/CandidateManage';
import EmployerManage1 from '../employers/EmployerManage1';
import JobreqManage from '../jobs/JobreqManage';
import Footer from '../Footer';
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import '../HomePage.css';
import '../candidates/AdminManage.css';

export default function PageManage() {
  return (
    <div className="home-route candidate-admin-page" data-theme="dark">
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <CombinedCreateFP className="home-quick-adds" />
      <main className="candidate-admin-content">
        <header className="candidate-admin-heading">
          <p>RECRUITING WORKSPACE</p>
          <h1>People & opportunities</h1>
          <span>Manage candidate profiles, employers, and open job requisitions.</span>
        </header>
        <CandidateManage />
        <EmployerManage1 />
        <JobreqManage />
      </main>
      <Footer/>
      <ToastComponent />
    </div>
  );
};