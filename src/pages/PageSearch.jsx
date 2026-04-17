import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import CandidateAPI from '../candidates/CandidateAPI';
import Footer from '../Footer';
import '../Fonts.css'
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguage_Ticker from '../dutchlanguage/DutchLanguage_Ticker';


export default function PageSearch() {
  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      {/* <BreakingNews /> */}
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <DutchLanguage_Ticker />
      <GradientLineThin />
      <CombinedCreateFP/>
      <CandidateAPI />
      <Footer/>
      <ToastComponent />
    </div>
  )
};