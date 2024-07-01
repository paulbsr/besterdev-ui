import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks3 from './Quicklinks3';
import './Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import TaskOverview from './TaskOverview';
import { TaskContext } from "./Contexts";
import DBSearchComponent from './DBSearchComponent';
import DBSearchComponentBanner from './DBSearchComponentBanner';



export default function PageTaskManage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [checkForRecords, setCheckForRecords] = useState(true);

  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks`)
      .then((response) => {
        setTasks(response.data);
        setError(null);
      })
      .catch(setError);
  }, [checkForRecords]);

  useEffect(() => {
    console.log('In <PageTaskManage/> is tasks:', tasks);
  }, [tasks]);

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
      <TaskContext.Provider value={tasks}>
      <TaskOverview />
      </TaskContext.Provider>
      <ToastComponent />
    </div>
  )
};