import React from "react";
import reactImage from "./../assets/images/react.png";

import nodeImage from "./../assets/images/node.png";
import mysqlImage from "./../assets/images/mysql.png";
import mernImage from "./../assets/images/mern.png";

export default function Dashboard() {
  const courses = [
    {
      image: reactImage,
      title: "React",
      description: "This is used for building user interface",
      latestVersion: "Latest version 16+",
      color: "primary",
    },
    {
      image: nodeImage,
      title: "NodeJS",
      description: "This is used for developing REST APIs",
      latestVersion: "Latest version 14+",
      color: "success",
    },
    {
      image: mysqlImage,
      title: "MySQL",
      description: "This is used for storing user data",
      latestVersion: "Latest version 7+",
      color: "warning",
    },
    {
      image: mernImage,
      title: "MERN Stack",
      description: "This is combination of React, NodeJS and MySQL",
      latestVersion: "Latest VM Training Version 2+",
      color: "dark",
    },
  ];
  return (
    <div className="container-fluid">
      <h1 className="text-center m-2 text-warning">WELCOME TO VMTRAINING</h1>
      <div className="d-flex flex-row flex-wrap justify-content-center">
        {courses.map(
          ({ image, title, description, latestVersion, color }, index) => (
            <div
              class="card mb-3 m-4 container col-lg-2 col-md-12 col-sm-12 col-xs-12"
              key={index}
            >
              <img
                src={image}
                class="card-img-top mt-1 common-image"
                alt="mern stack"
              />
              <div class="card-body text-left">
                <h5 class={`card-title bg-${color} p-2 text-white rounded`}>
                  {title}
                </h5>
                <p class="card-text">{description}</p>
                <p class="card-text">
                  <small class="text-muted">{latestVersion}</small>
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
