import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_current_user, logout } from "../redux/reducers/Authentication";
import { error, success } from "../redux/reducers/Notification";
import { setAboutDrawer } from "../redux/reducers/Drawer";
import { reset, setStart } from "../redux/reducers/Demo";

export default function Navigation() {
  const user = useSelector((state) => state.auth.user);
  const loading_logout = useSelector((state) => state.auth.loading_logout);
  const start = useSelector((state) => state.demo.start);
  const some_drawers_is_open = useSelector((state) => state.drawer.about_open);

  const dispatch = useDispatch();
  const Component = () => {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3 sticky-top">
        <div className="container-fluid p-0">
          <div className="w-25 ">
            <span>TODOLIST</span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse w-100"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-75 d-flex justify-content-center"></ul>
            <ul className="navbar-nav w-25 d-flex justify-content-end">
              <li className="nav-item nav-hover w-100">
                {start ? (
                  <span onClick={() => dispatch(reset())}>End</span>
                ) : (
                  <span onClick={() => dispatch(setStart(true))}>Tour</span>
                )}
              </li>
              <li className="nav-item nav-hover w-100">
                <span onClick={() => dispatch(setAboutDrawer(true))}>
                  About
                </span>
              </li>
              <li className="nav-item nav-hover w-100">
                <span
                  onClick={() => alert(`Hello ${user.fname} ${user.lname}`)}
                >
                  Profile
                </span>
              </li>
              <li className="nav-item nav-hover w-100">
                <span
                  disabled={loading_logout}
                  onClick={() =>
                    dispatch(logout()).then((response) => {
                      if (response.error) {
                        dispatch(error(response.error.message));
                      } else {
                        dispatch(success("Good Bye!"));
                        dispatch(get_current_user());
                      }
                    })
                  }
                >
                  {loading_logout ? <>Loading..</> : <>Logout</>}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  return <>{user && !some_drawers_is_open ? <Component /> : null}</>;
}
