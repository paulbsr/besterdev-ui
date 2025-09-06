import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import '../Fonts.css'
import ToastComponent from '../ToastComponent';
import BreakingNews from '../breakingnews/BreakingNews';
import CyclopediaTicker from '../cyclopedia/CyclopediaTicker';
import PeopleScorecard from '../people/PeopleScorecard'
import CombinedCreateFP from '../quicks/CombinedCreateFP';
import DutchLanguageTicker from '../openai/DutchLanguageTicker';

export default function PagePeopleScorecard(cyclopediadata) {

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
      <GradientLine />
      <CombinedCreateFP />
      <PeopleScorecard />
      <ToastComponent />
    </div>
  )
};