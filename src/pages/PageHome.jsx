import { useState } from 'react';
import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import Footer from '../Footer';
import HomePage22 from '../HomePage22';
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguage_Ticker from "../dutchlanguage/DutchLanguage_Ticker";
import DBSearchComponentBanner from '../dbsearch/DBSearchComponentBanner';
import AskAI from '../openai/AskAI';

export default function PageHome() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
      <div className="home-route" data-theme={isDarkMode ? 'dark' : 'light'}>
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
        <section className="home-search-row" aria-label="Search tools">
          <article className="home-search-card" aria-label="Search Besterdev">
            <DBSearchComponentBanner />
          </article>
          <article className="home-search-card" aria-label="Ask OpenAI">
            <AskAI />
          </article>
        </section>
        <CombinedCreateFP hideSearch className="home-quick-adds" />
        <HomePage22
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((currentMode) => !currentMode)}
        />
        <Footer/>
        <ToastComponent />
      </div>
  );
}