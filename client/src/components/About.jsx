import React from "react";
import "./About.css";

const About = () => (
  <div className="about-page">
    <div className="about-waves-bg">
      <svg width="100%" height="320" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="about-waves-svg">
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f4f6fb" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,149.3C840,139,960,149,1080,170.7C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" fill="url(#waveGradient)" />
        <path d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,154.7C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" fill="url(#waveGradient)" opacity="0.7" />
      </svg>
    </div>
    <h2 className="about-title">About This Project</h2>
    <div className="about-content">
      <p>
        This hotel booking website was developed as part of my internship project at Synergech, India. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), the platform offers a seamless hotel browsing and booking experience with a clean UI, personalized recommendations, and efficient data handling.
      </p>
      <p className="about-author">
        <b>- JOVITA JAYBURT</b><br/>
        Student at Loyola - ICAM College of Engineering and Technology.
      </p>
    </div>
  </div>
);

export default About;
