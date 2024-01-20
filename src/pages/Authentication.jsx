import React, { useEffect, useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  get_current_user,
  login,
  register,
} from "../redux/reducers/Authentication";
import { error, success } from "../redux/reducers/Notification";
import Loader from "../components/Loader";

export default function Authentication() {
  const [showRegister, setShowRegister] = useState(false);
  const viewportHeight = window.innerHeight;
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const loading_user = useSelector((state) => state.auth.loading_user);

  useEffect(() => {
    dispatch(get_current_user()).then((response) => {
      if (response.error) {
        dispatch(error(response.error.message));
      }
      setLoaded(true);
    });
  }, []);

  const handleLogin = (inputs) => {
    dispatch(login(inputs)).then((response) => {
      if (response.error) {
        dispatch(error(response.error.message));
      } else {
        dispatch(success("Welcome!"));
        dispatch(get_current_user());
      }
    });
  };

  const handleRegister = (inputs) => {
    dispatch(register(inputs)).then((response) => {
      if (response.error) {
        dispatch(error(response.error.message));
      } else {
        dispatch(success("Registered Successfully"));
        dispatch(login(inputs)).then((response) => {
          if (!response.error) {
            dispatch(get_current_user());
          }
        });
      }
    });
  };

  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{ height: `${viewportHeight - viewportHeight / 10}px` }}
      >
        {loaded && !loading_user ? (
          <>
            {showRegister ? (
              <Register
                setShowRegister={setShowRegister}
                handleRegister={handleRegister}
              />
            ) : (
              <Login
                setShowRegister={setShowRegister}
                handleLogin={handleLogin}
              />
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
