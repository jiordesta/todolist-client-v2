import React from "react";
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAboutDrawer } from "../redux/reducers/Drawer";
export default function AboutCanvas() {
  const about_open = useSelector((state) => state.drawer.about_open);
  const dispatch = useDispatch();
  return (
    <Drawer
      title=""
      placement="right"
      onClose={() => dispatch(setAboutDrawer(false))}
      open={about_open}
    >
      <h5>Welcome to TODOLIST-WEBAPP</h5>
      <p>
        A project crafted by a single visionary developer – me! This full-stack
        web application is a testament to the passion and dedication poured into
        every line of code.
      </p>
      <h6>Frontend Technology</h6>
      <p>
        The frontend is powered by the latest web development tools and
        libraries. Leveraging React.js, I've created a dynamic and responsive
        user interface. Navigation is seamless with React Router, and state
        management is efficiently handled by Redux and React-Redux.
      </p>
      <p>
        Styling and visual elements are enhanced with Bootstrap for a modern
        design, while Ant-Design ensures a user-friendly and aesthetically
        pleasing interface. Icons are courtesy of Font Awesome, adding a
        creative touch to the visuals.
      </p>
      <h6>Backend Technology</h6>
      <p>
        On the backend, I've chosen a robust set of technologies to handle data,
        authentication, and server-side operations. Express.js serves as the web
        application framework, offering a flexible and scalable environment.
        Data is stored and managed with MongoDB through Mongoose.
      </p>
      <p>
        User authentication is handled securely with bcryptjs for password
        hashing and jsonwebtoken for token-based authentication. Firebase adds
        extra functionalities and services, while Express Validator ensures the
        validity of incoming data.
      </p>
      <h6>Additional Tools</h6>
      <p>
        Various tools and packages streamline development and enhance
        functionality. Axios facilitates smooth communication between the
        frontend and backend, Multer handles file uploads seamlessly, Cors
        ensures secure cross-origin resource sharing, and Morgan aids in logging
        server-side operations.
      </p>
      <h6>Seamless Integration</h6>
      <p>
        The website seamlessly integrates frontend and backend components,
        creating a cohesive and efficient user experience. Redux Toolkit ensures
        streamlined state management, providing a single source of truth for the
        entire application. JS-Cookie assists in handling client-side cookies,
        contributing to a secure and authenticated user session.
      </p>
      <h6>Seamless Integration</h6>
      <p>
        For an efficient development workflow, Nodemon monitors changes and
        automatically restarts the server. The dotenv package aids in managing
        environment variables, ensuring a smooth transition between development
        and production environments.
      </p>
    </Drawer>
  );
}
