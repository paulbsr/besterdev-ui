import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Footer from './Footer';
// import Quicklinks from './Quicklinks';
// import Quicklinks2 from './Quicklinks2';
import Quicklinks3 from './Quicklinks3';
import HomePage22 from './HomePage22';
import ToastComponent from './ToastComponent';

export default function PageHome() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks3 />
        {/* <Quicklinks /> */}
        {/* <Quicklinks2 /> */}
        <GradientLineThin />
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
    )
  };