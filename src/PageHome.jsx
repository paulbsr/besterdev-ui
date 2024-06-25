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
import BreakingNewsAPI from './BreakingNewsAPI';

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
        <Quicklinks3 />
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
    )
  };