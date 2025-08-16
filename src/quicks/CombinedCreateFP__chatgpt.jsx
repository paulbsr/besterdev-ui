import { useState } from 'react';
import CyclopediaForm from './components/CyclopediaForm';
import WebsiteForm from './components/WebsiteForm';
import TaskForm from './components/TaskForm';
import DBSearchComponentBanner from '../dbsearch/DBSearchComponentBanner';
import WebSocketComponent from '../websockets/WebSocketComponent';
import BearerToken from '../oauth2.0/BearerToken';
import { useCyclopediaApi } from '../cyclopedia/CyclopediaAPIProvider';
import { useWebsiteApi } from '../websites/WebSiteAPIProvider';

export default function CombinedCreateFP() {
  const [openSection, setOpenSection] = useState(null);
  const { websiterootdata, setRefreshWebsiterootdata } = useWebsiteApi();
  const { setRefreshCyclopediarootdata } = useCyclopediaApi();

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  const categories = websiterootdata
    ? Array.from(new Set(websiterootdata.map(opt => opt.websiteCat)))
      .sort()
      .filter(cat => !cat.startsWith('HOWTO'))
    : [];

  return (
    <div className="combined-container">
      <div className="menu">
        <span onClick={() => toggleSection('cyclopedia')}>Add Cyclopedia...</span>
        <span onClick={() => toggleSection('website')}>Add Website...</span>
        <span onClick={() => toggleSection('task')}>Add Task...</span>
        <span onClick={() => toggleSection('oauth')}>OAuth2.0</span>
        <span onClick={() => toggleSection('websocket')}>WebSocket</span>
        <span onClick={() => toggleSection('search')}>Search</span>
      </div>

      <div className="form-section">
        {openSection === 'cyclopedia' && <CyclopediaForm onSuccess={() => setRefreshCyclopediarootdata(prev => !prev)} />}
        {openSection === 'website' && <WebsiteForm categories={categories} onSuccess={() => setRefreshWebsiterootdata(prev => !prev)} />}
        {openSection === 'task' && <TaskForm />}
        {openSection === 'oauth' && <BearerToken />}
        {openSection === 'websocket' && <WebSocketComponent />}
        {openSection === 'search' && <DBSearchComponentBanner />}
      </div>
    </div>
  );
}
