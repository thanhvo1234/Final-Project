import React from "react";
import "./homePage.css";
import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/heroSection/HeroSection";
import Popular from "../../components/popular/Popular";
import Offer from "../../components/offers/Offer";
import NewCollections from "../../components/newCollections/NewCollections";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import Footer from "../../components/footer/Footer";




function Homepage() {
    return (
      <div>       
        <HeroSection/>
        <Popular/>
        <Offer/>
        <NewCollections/>
        <NewsLetter/>       
      </div>
    );
  }
  
  export default Homepage;