import BannerWhite from '../BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../BannerLight';
import GradientLineThin from '../GradientLineThin';
import CandidateAPI from '../candidates/CandidateAPI';
import Footer from '../Footer';
import '../Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import CombinedCreateFP from '../CombinedCreateFP';


export default function PageSearch() {
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
      <CombinedCreateFP/>
      <CandidateAPI />
      <Footer/>
      <ToastComponent />
    </div>
  )
};