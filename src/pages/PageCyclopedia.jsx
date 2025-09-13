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
import DutchLanguageTicker from '../dutchlanguage/DutchLanguageTicker';

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
      <DutchLanguageTicker />
      <GradientLineThin />
      <CombinedCreateFP />
      <CyclopediaManage />
      <ToastComponent />
    </div>
  )
};