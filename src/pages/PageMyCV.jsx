import BannerWhite from '../banners/BannerWhite';
import BannerLight from '../banners/BannerLight';
import GradientLine from '../gradientlines/GradientLine';
import GradientLineThin from '../gradientlines/GradientLineThin';
import ToastComponent from '../ToastComponent';
import MyCV from '../MyCV/MyCV';
import '../HomePage.css';

export default function PageMyCV() {
    return (
      <div className="home-route cv-page-route" data-theme="dark">
        <BannerWhite />
        <GradientLine />
        <BannerLight
          showBreakingNewsTopic={false}
          showInternalLinks={false}
          alignIconsRight
          showGitHubProfile
        />
        <GradientLineThin />
        <MyCV />
        <ToastComponent />
      </div>
    )
  };