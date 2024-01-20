import React from "react";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";

export default function App() {
  const user = useSelector((state) => state.auth.user);
  return <>{user ? <Homepage /> : <Authentication />}</>;
}
