import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import GradientLineThin from './GradientLineThin';
import ToastComponent from './ToastComponent';
import MyCV from './MyCV/MyCV';
import MyCV_BannerLight from './MyCV/MyCV_BannerLight';

export default function PageMyCV() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <MyCV_BannerLight />
        <GradientLineThin />
        <MyCV />
        <ToastComponent />
      </div>
    )
  };