import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import './Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import CyclopediaManage from './CyclopediaManage';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import DBSearchComponentBanner from './DBSearchComponentBanner';



export default function PageCyclopedia(cyclopediadata) {

  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <Quicklinks3 />
      {/* <DBSearchComponentBanner /> */}
      <CyclopediaManage />
      <ToastComponent />
    </div>
  )
};