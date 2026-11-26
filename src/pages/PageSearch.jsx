import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import CandidateAPI from '../candidates/CandidateAPI';
import Footer from '../Footer';
import '../Fonts.css'
import ToastComponent from '../ToastComponent';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import BreakingNews from '../breakingnews/BreakingNews';
import '../HomePage.css';


export default function PageSearch() {
  return (
    <div className="home-route candidate-hunt-route" data-theme="dark">
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <CombinedCreateFP className="home-quick-adds" />
      <main className="candidate-hunt-page">
        <header className="candidate-hunt-heading">
          <p>RECRUITING WORKSPACE</p>
          <h1>Candidate hunt</h1>
          <span>Discover candidate profiles and find people with the skills you need.</span>
        </header>
        <CandidateAPI />
      </main>
      <Footer />
      <ToastComponent />
    </div>
  )
};