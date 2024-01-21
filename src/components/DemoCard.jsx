import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, setPosition } from "../redux/reducers/Demo";

export default function DemoCard() {
  const offset = useSelector((state) => state.demo.offset);
  const top = useSelector((state) => state.demo.top);
  const left = useSelector((state) => state.demo.left);
  const height = useSelector((state) => state.demo.height);
  const width = useSelector((state) => state.demo.width);
  const index = useSelector((state) => state.demo.index);
  const message = useSelector((state) => state.demo.message);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top + offset}px`,
        zIndex: "9",
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <div className="">
        <div className="card-body card m-0">{message}</div>
        <div className="card-body mt-1 p-0 d-flex">
          {index === -1 ? (
            <button
              className="btn btn-outline-dark w-100 me-1"
              onClick={() => dispatch(setPosition(1))}
            >
              Start
            </button>
          ) : (
            <>
              <button
                className="btn btn-outline-dark w-100 me-1"
                onClick={() => {
                  if (index !== 0) {
                    dispatch(setPosition(-1));
                  }
                }}
              >
                Prev
              </button>
              {index === 6 ? (
                <button
                  className="btn btn-outline-dark w-100 ms-1"
                  onClick={() => {
                    dispatch(reset());
                  }}
                >
                  End
                </button>
              ) : (
                <button
                  className="btn btn-outline-dark w-100 ms-1"
                  onClick={() => {
                    dispatch(setPosition(1));
                  }}
                >
                  Next
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
