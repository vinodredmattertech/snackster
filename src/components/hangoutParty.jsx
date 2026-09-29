import React from "react";

const SnacksterComponent = () => {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="image-container">
            <img
              src="../../public/images/Desi_Masti_Chicken_Nuggets.png"
              alt="Front"
              className="img-fluid front-image"
              loading="lazy"
            />
            <img
              src="path/to/back-image.png"
              alt="Back"
              className="img-fluid back-image"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2>Hangout Party Scenes</h2>
        </div>
      </div>
    </div>
  );
};

export default SnacksterComponent;
