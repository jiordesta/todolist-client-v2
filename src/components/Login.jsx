import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Login({ setShowRegister, handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loading_login = useSelector((state) => state.auth.loading_login);

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body m-1 p-1">
          <input
            type="text"
            className="form-control w-100 mb-1"
            placeholder="Username"
            value={username}
            disabled={loading_login}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control w-100 mb-1"
            placeholder="Password"
            value={password}
            disabled={loading_login}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-dark w-100"
            onClick={() => handleLogin({ username, password })}
            disabled={loading_login}
          >
            {loading_login ? <>Please wait..</> : <>Login</>}
          </button>
          <a
            type="button"
            className="w-100 text-dark p-2 text-center"
            onClick={() => setShowRegister(true)}
            disabled={loading_login}
          >
            register an account
          </a>
        </div>
      </div>
    </div>
  );
}
