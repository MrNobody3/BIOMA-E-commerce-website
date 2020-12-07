import React, { useEffect } from "react";

function PreLoader() {
  return (
    <>
      {/* TODO We must add the properly css files */}
      <div className="preloader">
        <div className="preloader-inner">
          <div className="preloader-icon">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreLoader;
