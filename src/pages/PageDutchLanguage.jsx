import BannerWhiteNoImage from '../banners/BannerWhiteNoImage';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageHomePage from '../dutchlanguage/DutchLanguageHomePage';
import Footer from '../Footer';

export default function PageDutchLanguage() {
    return (
      <div>
        <BannerWhiteNoImage />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <CombinedCreateFP />
        <DutchLanguageHomePage />
        <Footer />
        <ToastComponent />
      </div>
    )
  };