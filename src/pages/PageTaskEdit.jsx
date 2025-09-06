import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import { useParams } from 'react-router-dom';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import TaskEdit from '../tasks/TaskEdit';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageTicker from '../openai/DutchLanguageTicker';

export default function PageTaskEdit() {

  const { task_id } = useParams();

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
        <DutchLanguageTicker />
        <GradientLineThin />
        <CombinedCreateFP />
        <TaskEdit task_id={task_id}/>
        <ToastComponent />

      </div>
    )
  };