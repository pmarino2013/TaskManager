import React from "react";
import '../Pages/css/AboutUs.css';
import Mauricio from "../img/20.jpg";
import Manuel from "../img/22.png";
import Samuel from "../img/24.jpg";

const AboutUs = () => {
  return (
    <section
      className="page-section "
      id="Equipo-Directivo"
      data-aos="flip-down"
    >
      <div className="container">
        <div className="text-center">
          <h1 className="section-heading text-uppercase">
          Team TaskGenius
          </h1>
          <h3 className="section-subheading my-3">
            We are a diverse group of individuals with a common interest:
            learning to create software. As students, we have varying levels of
            experience, but we are all committed to improving our knowledge and
            programming skills. We work together as a team on the TaskGenius
            project, collaborating to solve problems and complete tasks.
          </h3>
        </div>
        <div className="row container d-flex justify-content-between about">
          <div className="col-lg-3">
            <div className="team-member">
              <img className="mx-auto redondeo" src={Mauricio} alt="Foto desarrolador1" />
              <h4>Mauricio Campo</h4>
              <div>Mail:</div>
              <div> mcampo26@gmail.com</div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="team-member">
              <img className="mx-auto redondeo" src={Manuel} alt="Foto desarrolador2" />
              <h4>Manuel Torres</h4>
              <div>Mail:</div>
              <div>  manolitotorres.2020@gmail.com</div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="team-member">
              <img className="mx-auto redondeo" src={Samuel} alt="Foto desarrolador3" />
              <h4>Samuel Alvarado</h4>
              <div>Mail:</div>
              <div>samuel33758@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
