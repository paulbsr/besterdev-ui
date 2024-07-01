import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import WebsiteManage from './WebsiteManage';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import DBSearchComponentBanner from './DBSearchComponentBanner';

export default function PageResources() {
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
        <WebsiteManage />
        <ToastComponent />

      </div>
    )
  };