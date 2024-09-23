import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../GradientLineThin';
import { useParams } from 'react-router-dom';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import CyclopediaEdit from '../CyclopediaEdit';
import CombinedCreateFP from '../CombinedCreateFP';


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
        <CombinedCreateFP />
        <CyclopediaEdit cyclopediaId={cyclopediaId}/>
        <ToastComponent />
      </div>
    )
  };
