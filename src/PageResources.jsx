import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import Footer from './Footer';
import { Flip, ToastContainer, toast } from 'react-toastify';
import WebSiteCreate from './WebsiteCreate';
import WebsiteManage from './WebsiteManage';

export default function PageResources() {
    return (
      <div>
        <BannerWhite />
        <GradientLine />
        <BannerLight />
        <GradientLineThin />
        <Quicklinks />
        <GradientLineThin />
        <WebsiteManage />
        {/* <Footer/> */}
        <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        transition={Flip}
        draggable
        pauseOnHover
        theme="dark"/>
      </div>
    )
  };