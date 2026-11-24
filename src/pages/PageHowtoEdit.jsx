import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import HowtoEdit from '../howto/HowtoEdit';
import { useParams } from 'react-router-dom';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageTicker from '../dutchlanguage/DutchLanguage_Ticker';
import Footer from '../Footer';
import '../HomePage.css';
import '../cyclopedia/CyclopediaManage.css';
import '../howto/HowtoEdit.css';

export default function PageHowtoEdit() {
  const { howto_id } = useParams();

  return (
    <div className="home-route howto-edit-route" data-theme="dark">
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <DutchLanguageTicker />
      <GradientLineThin />
      <CombinedCreateFP className="home-quick-adds" />
      <HowtoEdit howto_id={howto_id} />
      <Footer />
      <ToastComponent />
    </div>
  );
}