import React from "react";
import mernImage from "./../assets/images/mernmysql.png";

export default function Homepage() {
  return (
    <div className="container-fluid">
      <h1 className="text-center m-2">MERN Stack Application Homepage</h1>
      <div class="card mb-3 container">
        <img src={mernImage} class="card-img-top" alt="mern stack" />
        <div class="card-body text-center">
          <h5 class="card-title">
            MERN Stack Application using MySQL, Express, React, NodeJS and
            Bootstrap 5
          </h5>
          <p class="card-text">
            This Application Developed using MERN Stack Technologies
          </p>
          <p class="card-text">
            <small class="text-muted">Last VM Training Version 2+</small>
          </p>
        </div>
      </div>
    </div>
  );
}
