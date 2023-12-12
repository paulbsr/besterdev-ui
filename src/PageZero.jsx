import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import CandidateAPI from './CandidateAPI';
import Footer from './Footer';
import './Fonts.css'
import 'react-dropdown/style.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


export default function PageZero() {

    const { howto_id } = useParams();

  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks />
      <>pppppppppppppppppppppppppppppppppppppppp{howto_id}</>
      <Footer/>
    </div>
  )
};