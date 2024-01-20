import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosition } from "../redux/reducers/Demo";

export default function DemoCard() {
  const offset = 50;
  const top = useSelector((state) => state.demo.top);
  const left = useSelector((state) => state.demo.left);
  const index = useSelector((state) => state.demo.index);

  const dispatch = useDispatch();
  const targets = ["#create-modal", "#clear-done", "#delete-all"];
  const updatePosition = () => {
    const targetElement = document.querySelector(`${targets[index]}`);
    const targetRect = targetElement.getBoundingClientRect();
    dispatch(setPosition({ top: targetRect.top, left: targetRect.left }));
  };

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top + offset}px`,
        zIndex: "9999",
      }}
    >
      <h1>Here</h1>
      <button onClick={() => updatePosition()}>Click me!</button>
    </div>
  );
}
