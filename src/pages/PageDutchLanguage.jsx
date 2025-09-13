import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageTicker from '../dutchlanguage/DutchLanguageTicker';
import DutchLanguagePage from '../dutchlanguage/DutchLanguagePage';

export default function PageDutchLanguage() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <DutchLanguageTicker />
        <GradientLineThin />
        <CombinedCreateFP />
        <DutchLanguagePage />
        <ToastComponent />
      </div>
    )
  };