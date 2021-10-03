import React, { useState } from "react";
import firebase from "firebase";

const Login = () => {
  const [formDetails, setFormDetails] = useState({});

  const handleFormChanges = (e) => {
    formDetails[e.target.name] = e.target.value;
    setFormDetails({ ...formDetails });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formDetails;

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mx-0 my-3">
          <div className="col-12">
            <label className="form-label">Email</label>
            <input
              name="email"
              value={formDetails.email}
              className="form-control"
              onChange={handleFormChanges}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Password</label>
            <input
              name="password"
              value={formDetails.password}
              className="form-control"
              type="password"
              onChange={handleFormChanges}
            />
          </div>
        </div>
        <div className=" d-flex p-2">
          <button type="submit" className="ms-auto btn btn-primary ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
