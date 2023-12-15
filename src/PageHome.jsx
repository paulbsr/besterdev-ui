import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Footer from './Footer';
import { Flip, ToastContainer, toast, Zoom } from 'react-toastify';
import HomePage from './HomePage';
import Quicklinks3 from './Quicklinks3';

export default function PageHome() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks3 />
        <GradientLineThin />
        <HomePage />
        <Footer/>
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