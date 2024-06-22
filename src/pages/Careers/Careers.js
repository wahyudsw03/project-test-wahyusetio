import "./Careers.css";

import banner from "../../pics/banner.jpg";

function Careers() {
  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="text text-center">
          <h1>Careers</h1>
          <p>Where all our great things begin</p>
        </div>
        <div className="triangle"></div>
      </div>
    </>
  );
}

export default Careers;
