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
import CyclopediaManage from './CyclopediaManage';
import ToastComponent from './ToastComponent';
import BreakingNews from './BreakingNews';
import CyclopediaTicker from './CyclopediaTicker';
import PeopleScorecard from './PeopleScorecard'
import TaskOverview from './TaskOverview';
import { TaskContext } from "./Contexts";
import AlertProvider from "./Generic/Alerts/AlertContext"; // Assuming AlertProvider
import AlertContext from './Generic/Alerts/AlertContext';



export default function PageTaskManage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [checkForRecords, setCheckForRecords] = useState(true);

  useEffect(() => {
    axios(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks`)
      .then((response) => {
        // setProblems(response.data.filter((task) => task.taskstatus === "PROBLEM"));
        setTasks(response.data);
        setError(null);
        // console.log(tasks)
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