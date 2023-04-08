import React from "react";
import "./About.css";
import HK from "../../Assets/houseKeys.jpg";

import FI from "../../Assets/FamilyHouse.jpg";

// import FI from "../../../FamilyHouse.jpg";



const About = ({ AboutUsvar }) => {
  return (
    AboutUsvar === '/' ? (
      <section className="section_about" id="about">
        <h1>The largest selection of rental listings available.</h1>
        <h2>Over a million apartments, houses, condos, and townhomes for rent are available to choose from.</h2>

        <div className="container about__container">
          <div className="about__me">
            <div className="about__me-image">
              <img src={HK} alt="About Image" />
            </div>
          </div>

          <p>
            <h2>Renting Made Easy!</h2>
            <p>
              <br />
              Are you tired of scouring the internet for the perfect rental property? Look no further than our rental website, where we make renting easy! With our user-friendly platform, you can easily search through a vast selection of apartments, houses, condos, and townhomes for rent.
              Our rental properties come in all shapes and sizes, from cozy studios to spacious family homes, and everything in between.
            </p>
          </p>

          <div className="about__me">
            <div className="about__me-image">
              <img src={FI} alt="About Image" />
            </div>
          </div>

          <p>
            <h2>Affordable Prices!</h2>
            <p>
              <br />
              We believe that affordable housing is a basic necessity and strive to keep our rental rates within the reach of the average renter.

              Our rental properties are priced based on market value, ensuring that our tenants are getting a fair deal for their money.

              We work with our landlords and property owners to negotiate the best possible rental rates, so that our tenants can enjoy the benefits of affordable housing without sacrificing quality
            </p>
          </p>

          <div className="about__content">
            <div className="about__cards">

            </div>

            {/* 
          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a> */}
          </div>
        </div>
      </section>
    ) : (
      <>
      </>)
  );
};
export default About;
