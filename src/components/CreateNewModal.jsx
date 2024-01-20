import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../redux/reducers/Todo";
import { error, success } from "../redux/reducers/Notification";

export default function CreateNewModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loading_create = useSelector((state) => state.todo.loading_create);

  const dispatch = useDispatch();
  return (
    <>
      <button
        id="create-modal"
        type="button"
        className="btn btn-outline-primary w-100 my-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        disabled={loading_create}
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxHeight: "38px",
        }}
      >
        {loading_create ? (
          <>Creating..</>
        ) : (
          <i className="fa-solid fa-plus"></i>
        )}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                rows={5}
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-outline-info"
                data-bs-dismiss="modal"
                onClick={() =>
                  dispatch(createTodo({ title, description })).then(
                    (response) => {
                      if (response.error) {
                        dispatch(error(response.error.message));
                      } else {
                        dispatch(success("Created a new Todo"));
                        setDescription("");
                        setTitle("");
                      }
                    }
                  )
                }
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
