import React from 'react';
import BannerWhite from '../banners/BannerWhite';
import GradientLine from '../gradientlines/GradientLine';
import BannerLight from '../banners/BannerLight';
import GradientLineThin from '../gradientlines/GradientLineThin';
import Footer from '../Footer';
import '../Fonts.css';

const Swagger = () => {

  return (
    <div>
      <BannerWhite />
      <GradientLine />
      <BannerLight />
      <GradientLineThin />
      <GradientLineThin />
      <iframe
        title="Swagger UI"
        src="http://localhost:8000/swagger-ui.html"
        // src="https://www.bester.ie/swagger"
        style={{ width: '100%', height: '800px', border: 'none' }}
      />
      
      <Footer/>
    </div>
  );
};

export default Swagger;
