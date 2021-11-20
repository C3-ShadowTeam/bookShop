import React from "react";

export const About = () => {
  window.scrollTo(0, 0)
  return (
    <div>
      <center>
        <div>
          <div>
            <h1 style={{ color: "#72147e" }}>
              Welcome To <span style={{ color: "#72147e" , fontFamily:"Style Script , cursive"}}>KERO BOOK</span>
            </h1>
            <div>
              <div style={{ width: "650px" }}>
                <img
                  style={{ width: "650px" }}
                  src="https://www.wantedinmilan.com/i/preview/storage/uploads/2020/01/italys-bookshop-crisis.jpg"
                  alt=""
                />
                <p style={{ color: "#72147e" }}>
                  We believe that bookstores are essential to a healthy culture.
                  They’re where authors can connect with readers, where we
                  discover new writers, where children get hooked on the thrill
                  of reading that can last a lifetime. They’re also anchors for
                  our downtowns and communities.
                </p>
                <p style={{ color: "#72147e" }}>
                  It was founded in september 2021 by entrepreneur Meraki Academy
                  with the support of Shadow team .
                </p>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};
