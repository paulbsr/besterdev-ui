import BannerWhite from '../BannerWhite';
import GradientLine from '../GradientLine';
import BannerLight from '../BannerLight';
import GradientLineThin from '../GradientLineThin';
import { useParams } from 'react-router-dom';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../CyclopediaTicker';
import TaskEdit from '../TaskEdit';
import CombinedCreateFP from '../CombinedCreateFP';

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
        <CombinedCreateFP />
        <TaskEdit task_id={task_id}/>
        <ToastComponent />

      </div>
    )
  };