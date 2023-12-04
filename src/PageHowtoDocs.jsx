import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import Footer from './Footer';
import { Flip, ToastContainer, Zoom, toast } from 'react-toastify';
import HowtoManage from './HowtoManage';
import HowtoSteps from './HowtoSteps';
// import TaskRecordCreate from './TaskRecordCreate';
import HowtoStepRecordCreate from './HowtoStepRecordCreate';
import Task_Accordion from './Task_Accordion';
import TaskRecordAccordion from './TaskRecordAccordion';
import Task from './Task';

export default function PageHowtoDocs() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks />
        <GradientLineThin />
        {/* <HowtoManage /> */}
        {/* <HowtoSteps /> */}
        {/* <TaskRecordCreate /> */}
        {/* <HowtoStepRecordCreate /> */}
        {/* <Task /> */}
        <Task_Accordion />
        {/* <TaskRecordAccordion /> */}
        {/* <Footer/> */}
        <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Zoom}
        draggable
        pauseOnHover
        theme="dark"/>
      </div>
    )
  };