import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import GradientLineThin from './GradientLineThin';
import ToastComponent from './ToastComponent';
import MyCV from './MyCV/MyCV';
import MyCV_BannerLight from './MyCV/MyCV_BannerLight';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';

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