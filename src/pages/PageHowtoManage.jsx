import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import HowtoManage from '../howto/HowtoManage';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';

export default function PageHowtoManage() {
    return (
      <div className="cyclopedia-route">
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
        <HowtoManage />
        <ToastComponent />

      </div>
    )
  };