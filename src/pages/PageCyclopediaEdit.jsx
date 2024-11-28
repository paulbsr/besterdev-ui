import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import { useParams } from 'react-router-dom';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CyclopediaEdit from '../cyclopedia/CyclopediaEdit';
import CombinedCreateFP from '../quicks/CombinedCreateFP';


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
