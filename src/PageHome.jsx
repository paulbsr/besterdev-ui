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

export default function PageHome(props) {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks3 searchPhrase={props.searchPhrase}/>
        <GradientLineThin />
        <BreakingNews searchPhrase={props.searchPhrase}/>
        <GradientLineThin />
        <CyclopediaTicker />
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
    )
  };