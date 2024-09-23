import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import MyCV from '../MyCV/MyCV';
import MyCV_BannerLight from '../MyCV/MyCV_BannerLight';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';

export default function PageMyCV() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <MyCV_BannerLight />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        <CyclopediaTicker />
        <GradientLineThin />
        <MyCV />
        <ToastComponent />
      </div>
    )
  };