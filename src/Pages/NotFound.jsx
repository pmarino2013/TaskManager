import React from "react";
import error from "../img/error404.png";
import "../Pages/css/error404.css"

const NotFound = () => {
  return (
    <>
      <body>
        <main className="d-flex flex-column align-items-center img-404">
          <img src={error} alt="" className="w-50 " />
          <h5 className=" text-center col-lg-6">
          The section you're looking for is currently unavailable. Please return to the Home page or contact the administration.
          </h5>
        </main>
      </body>
    </>
  );
};

export default NotFound;
