import BannerWhiteDutchLanguage from '../banners/BannerWhiteDutchLanguage';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageHomePage from '../dutchlanguage/DutchLanguageHomePage';
import Footer from '../Footer';
import BreakingNews from '../breakingnews/BreakingNews';
import DutchLanguageTicker from "../dutchlanguage/DutchLanguageTicker";
import DutchLanguageMijnBoek from '../dutchlanguage/DutchLanguage_MijnBoek';

export default function PageDutchLanguageBook() {
    return (
      <div>
        <BannerWhiteDutchLanguage />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <DutchLanguageTicker />
        <CombinedCreateFP />
        {/* <DutchLanguageHomePage /> */}
        <DutchLanguageMijnBoek />
        <Footer />
        <ToastComponent />
      </div>
    )
  };