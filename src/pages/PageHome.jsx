import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import Footer from '../Footer';
import HomePage22 from '../HomePage22';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';

export default function PageHome() {
  return (
      <div className="home-route" data-theme="dark">
        <BannerWhite />
        <GradientLine />
        <BannerLight showExternalLinks={false} />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        <CyclopediaTicker />
        <GradientLineThin />
        <CombinedCreateFP className="home-quick-adds" />
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
  );
}