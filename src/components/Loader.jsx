import React from "react";

export default function Loader() {
  return (
    <div className="col-md-4 d-flex justify-content-center align-items-center">
      <div className="loader">
        <span className="loader-text">Loading..</span>
        <span className="load"></span>
      </div>
    </div>
  );
}
