import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Footer from './Footer';
import Quicklinks3 from './Quicklinks3';
import HomePage22 from './HomePage22';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';

export default function PageHome() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks3 />
        <GradientLineThin />
        <BreakingNews/>
        <GradientLineThin />
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
    )
  };