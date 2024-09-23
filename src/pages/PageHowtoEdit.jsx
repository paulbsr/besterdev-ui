import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../GradientLineThin';
import HowtoEdit from '../HowtoEdit';
import { useParams } from 'react-router-dom';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import CombinedCreateFP from '../CombinedCreateFP';

// export default function PageCyclopedia() {
export default function PageHowtoEdit() {

  const { howto_id } = useParams();

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
        <HowtoEdit howto_id={howto_id}/>
        <ToastComponent />

      </div>
    )
  };