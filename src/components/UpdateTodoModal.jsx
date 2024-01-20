import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo } from "../redux/reducers/Todo";
import { error, success } from "../redux/reducers/Notification";

export default function UpdateTodoModal({ todo, updating, setUpdating }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const dispatch = useDispatch();
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-warning w-100"
        data-bs-toggle="modal"
        data-bs-target={`#updatetodo${todo._id}`}
        disabled={updating}
        onClick={() => setUpdating(true)}
      >
        {updating ? (
          <>Updating..</>
        ) : (
          <i className="fa-regular fa-pen-to-square"></i>
        )}
      </button>

      <div
        className="modal fade"
        id={`updatetodo${todo._id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setUpdating(false)}
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
                maxLength={250}
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {todo.status == "2" ? (
                <button
                  className="btn btn-outline-info mt-1 w-100"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    dispatch(
                      updateTodo({
                        _id: todo._id,
                        title,
                        description,
                        status: "1",
                      })
                    ).then((response) => {
                      if (!response.error) {
                        dispatch(success("Updated!"));
                      } else if (response.error) {
                        dispatch(error(response.error.message));
                      }
                      setUpdating(false);
                    })
                  }
                >
                  Rework on it!
                </button>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                onClick={() => setUpdating(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-outline-info"
                data-bs-dismiss="modal"
                onClick={() =>
                  dispatch(
                    updateTodo({ _id: todo._id, title, description })
                  ).then((response) => {
                    if (!response.error) {
                      dispatch(success("Updated!"));
                    } else if (response.error) {
                      dispatch(error(response.error.message));
                    }
                  })
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
