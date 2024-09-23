import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../GradientLineThin';
import Footer from '../Footer';
import HomePage22 from '../HomePage22';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import BreakingNewsAPI from '../breakingnews/BreakingNewsAPI';
import CombinedCreateFP from '../CombinedCreateFP';


export default function PageHome() {
    return (
      <div>
        <BreakingNewsAPI />
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        <CyclopediaTicker />
        <GradientLineThin />
        <CombinedCreateFP />
        <HomePage22 />
        <Footer/>
        <ToastComponent />
      </div>
    )
  };