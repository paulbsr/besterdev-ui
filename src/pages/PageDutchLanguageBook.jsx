import BannerWhiteDutchLanguage from '../banners/BannerWhiteDutchLanguage';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
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
        <DutchLanguageMijnBoek />
        <ToastComponent />
      </div>
    )
  };