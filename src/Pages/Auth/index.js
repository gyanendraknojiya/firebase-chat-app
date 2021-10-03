import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);

  return (
    <div className="d-flex vh-100 vw-100 justify-content-center align-items-center">
      <div
        style={{ maxWidth: 400, width: "90%" }}
        className=" bg-dark shadow rounded text-white p-2"
      >
        <div className="text-center">
          <h1>{showLoginPage ? "Log in" : "Signup"}</h1>
          {showLoginPage ? (
            <small>
              Not registered?, click{" "}
              <span className="cp btn-link " onClick={() => setShowLoginPage(false)}>
                here
              </span>{" "}
              to register.
            </small>
          ) : (
            <small>
              Already registered?, click{" "}
              <span className="cp btn-link " onClick={() => setShowLoginPage(true)}>
                here
              </span>{" "}
              to login.
            </small>
          )}
        </div>
        {showLoginPage?<Login/>:<Signup/>}
      </div>
    </div>
  );
};

export default Auth;
