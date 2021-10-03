import React, { useState } from "react";
import firebase from "../../firebase.config";

const Signup = () => {
  const [formDetails, setFormDetails] = useState({});

  const handleFormChanges = (e) => {
    formDetails[e.target.name] = e.target.value;
    setFormDetails({ ...formDetails });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formDetails;

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (user) {
        user.updateProfile({
          displayName: firstName + " " + lastName,
        });
        await firebase.firestore().collection("users").doc(user.uid).set({
          firstName,
          lastName,
          email,
          createdAt: Date.now(),
        });
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="row mx-0 my-3">
          <div className="col-6">
            <label className="form-label">First Name</label>
            <input
              name="firstName"
              value={formDetails.firstName}
              className="form-control"
              onChange={handleFormChanges}
            />
          </div>
          <div className="col-6">
            <label className="form-label">Last Name</label>
            <input
              name="lastName"
              value={formDetails.lastName}
              className="form-control"
              onChange={handleFormChanges}
            />
          </div>
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
