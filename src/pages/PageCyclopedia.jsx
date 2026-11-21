import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import '../Fonts.css'
import CyclopediaManage from '../cyclopedia/CyclopediaManage';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';

export default function PageCyclopedia(cyclopediadata) {

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
      <CombinedCreateFP hideSearch className="home-quick-adds" />
      <CyclopediaManage />
      <ToastComponent />
    </div>
  )
};