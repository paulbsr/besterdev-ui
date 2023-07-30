import React from 'react';
import BannerWhite from './BannerWhite';
import GradientLine from './GradientLine';
import BannerLight from './BannerLight';
import GradientLineThin from './GradientLineThin';
import Quicklinks from './Quicklinks';
import CandidateManage from './CandidateManage';
import EmployerManage1 from './EmployerManage1';
import JobreqManage from './JobreqManage';
import Footer from './Footer';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ManagePage = () => {
  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <Quicklinks />
      <CandidateManage />
      <EmployerManage1 />
      <JobreqManage />
      <Footer/>
      <ToastContainer
        position="top-left"
        autoClose={2500}
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
  );
};

export default ManagePage;
