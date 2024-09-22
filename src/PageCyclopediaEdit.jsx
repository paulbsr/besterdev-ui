import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import { useParams } from 'react-router-dom';
import ToastComponent from './ToastComponent';
import BreakingNews from './breakingnews/BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import { Tooltip } from 'react-tooltip';
import CyclopediaEdit from './CyclopediaEdit';
import CombinedCreateFP from './CombinedCreateFP';


export default function PageCyclopediaEdit() {
  const { cyclopediaId } = useParams();

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
        {/* <Quicklinks3 /> */}
        <CombinedCreateFP />
        <CyclopediaEdit cyclopediaId={cyclopediaId}/>
        <ToastComponent />
      </div>
    )
  };
