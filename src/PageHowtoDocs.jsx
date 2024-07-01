import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import DBSearchComponentBanner from './DBSearchComponentBanner';


export default function PageNewHowtoDocs() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks3 />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        {/* <DBSearchComponentBanner /> */}
        <TaskAccordion />
        <ToastComponent/>

      </div>
    )
  };