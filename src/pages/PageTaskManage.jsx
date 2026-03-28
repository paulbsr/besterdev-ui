import React, { useState, useEffect } from 'react';
import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import '../Fonts.css'
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import TaskOverview from '../tasks/TaskOverview';
import { TaskContext } from "../Contexts";
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageTicker from '../dutchlanguage/DutchLanguageTicker';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';

export default function PageTaskManage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [checkForRecords, setCheckForRecords] = useState(true);

  useEffect(() => {
    OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks`)
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
      <DutchLanguageTicker />
      <GradientLineThin />
      <CombinedCreateFP />
      <TaskContext.Provider value={tasks}>
      <TaskOverview />
      </TaskContext.Provider>
      <ToastComponent />
    </div>
  )
};