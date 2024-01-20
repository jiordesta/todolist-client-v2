import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Register({ setShowRegister, handleRegister }) {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loading_register = useSelector((state) => state.auth.loading_register);
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body m-1 p-1">
          <input
            type="text"
            className="form-control w-100 mb-1"
            placeholder="First Name"
            value={fname}
            disabled={loading_register}
            onChange={(e) => setfname(e.target.value)}
          />
          <input
            type="text"
            className="form-control w-100 mb-1"
            placeholder="Last Name"
            value={lname}
            disabled={loading_register}
            onChange={(e) => setlname(e.target.value)}
          />
          <input
            type="text"
            className="form-control w-100 mb-1"
            placeholder="Username"
            value={username}
            disabled={loading_register}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control w-100 mb-1"
            placeholder="Password"
            value={password}
            disabled={loading_register}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-dark w-100"
            disabled={loading_register}
            onClick={() => handleRegister({ fname, lname, username, password })}
          >
            {loading_register ? <>Please wait..</> : <>Register</>}
          </button>
          <a
            type="button"
            className="w-100 text-dark p-2 text-center"
            disabled={loading_register}
            onClick={() => setShowRegister(false)}
          >
            already have an account
          </a>
        </div>
      </div>
    </div>
  );
}
