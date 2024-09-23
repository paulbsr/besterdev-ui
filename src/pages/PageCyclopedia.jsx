import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../GradientLineThin';
import '../Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import CyclopediaManage from '../CyclopediaManage';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import CombinedCreateFP from '../CombinedCreateFP';



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
      <CombinedCreateFP />
      <CyclopediaManage />
      <ToastComponent />
    </div>
  )
};