import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import HowtoEdit from './HowtoEdit';
import { useParams } from 'react-router-dom';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import DBSearchComponentBanner from './DBSearchComponentBanner';

// export default function PageCyclopedia() {
export default function PageHowtoEdit() {

  const { howto_id } = useParams();

    return (
      
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks3 />
        <GradientLineThin />
        <BreakingNews />
        <GradientLineThin />
        <CyclopediaTicker />
        <DBSearchComponentBanner />
        <HowtoEdit howto_id={howto_id}/>
        <ToastComponent />

      </div>
    )
  };