import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import WebsiteManage from '../websites/WebsiteManage';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
export default function PageResources() {
    return (
      <div className="cyclopedia-route website-resource-route">
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        <CyclopediaTicker />
        <div className="cyclopedia-quick-add-divider">
          <GradientLineThin />
        </div>
        <CombinedCreateFP className="home-quick-adds" />
        <WebsiteManage />
        <ToastComponent />

      </div>
    )
  };