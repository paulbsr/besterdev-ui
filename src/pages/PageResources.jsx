import BannerWhite from '../BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../BannerLight';
import GradientLineThin from '../GradientLineThin';
import WebsiteManage from '../websites/WebsiteManage';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import CombinedCreateFP from '../CombinedCreateFP';

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
        <CombinedCreateFP />
        <WebsiteManage />
        <ToastComponent />

      </div>
    )
  };