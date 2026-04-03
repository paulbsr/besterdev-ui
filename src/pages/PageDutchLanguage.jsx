import BannerWhiteDutchLanguage from '../banners/BannerWhiteDutchLanguage';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguage_HomePage from '../dutchlanguage/DutchLanguage_HomePage';
import Footer from '../Footer';
import DutchLanguageTicker from "../dutchlanguage/DutchLanguageTicker";
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';

export default function PageDutchLanguage() {
    return (
      <div>
        <BannerWhiteDutchLanguage />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
                <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
        <DutchLanguageTicker />
      <GradientLineThin />
      <CombinedCreateFP />
        <DutchLanguage_HomePage />
        <Footer />
        <ToastComponent />
      </div>
    )
  };