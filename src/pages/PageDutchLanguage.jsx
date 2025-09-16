import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageHomePage from '../dutchlanguage/DutchLanguageHomePage';

export default function PageDutchLanguage() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <CombinedCreateFP />
        <DutchLanguageHomePage />
        <ToastComponent />
      </div>
    )
  };