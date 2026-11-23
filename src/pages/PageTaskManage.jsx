import { useState, useEffect } from 'react';
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
import DutchLanguage_Ticker from '../dutchlanguage/DutchLanguage_Ticker';
import OAuth2APIClient from '../oauth2/OAuth2APIClient';
import '../HomePage.css';
import '../tasks/TaskManage.css';

export default function PageTaskManage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [checkForRecords, setCheckForRecords] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    OAuth2APIClient.get(`https://besterdev-api-13a0246c9cf2.herokuapp.com/api/v1/tasks`)
      .then((response) => {
        if (active) {
          setTasks(response.data);
          setError(null);
        }
      })
      .catch((requestError) => {
        console.error("Failed to load tasks:", requestError);
        if (active) setError(requestError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [checkForRecords]);

  return (
    <div className="home-route task-manage-route" data-theme="dark">
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <BreakingNews />
      <GradientLineThin />
      <CyclopediaTicker />
      <GradientLineThin />
      <DutchLanguage_Ticker />
      <GradientLineThin />
      <CombinedCreateFP className="home-quick-adds" />
      <TaskContext.Provider value={tasks}>
        <TaskOverview
          loading={loading}
          error={error}
          checkForRecords={checkForRecords}
          setCheckForRecords={setCheckForRecords}
        />
      </TaskContext.Provider>
      <ToastComponent />
    </div>
  )
};