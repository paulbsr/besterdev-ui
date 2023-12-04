import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import Footer from './Footer';
import { Flip, ToastContainer, toast, Zoom } from 'react-toastify';
import HowtoManage from './HowtoManage';

export default function PageHowtoManage() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks />
        <GradientLineThin />
        <HowtoManage />
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