import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Footer from './Footer';
import Quicklinks3 from './Quicklinks3';
import HomePage22 from './HomePage22';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import DBSearchComponent from './DBSearchComponent';
import BreakingNewsAPI from './BreakingNewsAPI';
import HowtoTicker from './HowtoTicker';

export default function PageHome() {
    return (
      <div>
        <BreakingNewsAPI />
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        <CyclopediaTicker />
        <GradientLineThin />
        {/* <HowtoTicker />
        <GradientLineThin /> */}
        <Quicklinks3 />
        {/* <GradientLineThin /> */}
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
    )
  };