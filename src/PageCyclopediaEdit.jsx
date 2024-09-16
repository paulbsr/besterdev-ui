import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import { useParams } from 'react-router-dom';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import { Tooltip } from 'react-tooltip';
import CyclopediaEdit from './CyclopediaEdit';


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
        <Quicklinks3 />
        <CyclopediaEdit cyclopediaId={cyclopediaId}/>
        <ToastComponent />
      </div>
    )
  };
