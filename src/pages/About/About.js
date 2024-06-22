import "./About.css";

import banner from "../../pics/banner.jpg";

function About() {
  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="text text-center">
          <h1>About</h1>
          <p>Where all our great things begin</p>
        </div>
        <div className="triangle"></div>
      </div>
    </>
  );
}

export default About;
