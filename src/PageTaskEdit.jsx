import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
// import Task from './Task';
import { useParams } from 'react-router-dom';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import TaskEdit from './TaskEdit';
import DBSearchComponentBanner from './DBSearchComponentBanner';

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
        <Quicklinks3 />
        {/* <DBSearchComponentBanner /> */}
        <TaskEdit task_id={task_id}/>
        <ToastComponent />

      </div>
    )
  };