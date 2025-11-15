import BannerWhiteDutchLanguage from '../banners/BannerWhiteDutchLanguage';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageHomePage from '../dutchlanguage/DutchLanguageHomePage';
import Footer from '../Footer';
import BreakingNews from '../breakingnews/BreakingNews';

export default function PageDutchLanguage() {
    return (
      <div>
        <BannerWhiteDutchLanguage />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <BreakingNews />
        <CombinedCreateFP />
        <DutchLanguageHomePage />
        <Footer />
        <ToastComponent />
      </div>
    )
  };