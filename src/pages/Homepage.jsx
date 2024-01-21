import React, { useEffect, useState } from "react";
import CreateNewModal from "../components/CreateNewModal";
import { useDispatch, useSelector } from "react-redux";
import { error, success } from "../redux/reducers/Notification";
import UpdateTodoModal from "../components/UpdateTodoModal";
import DemoCard from "../components/DemoCard";

import {
  deleteAll,
  deleteDone,
  deleteTodo,
  readTodos,
  updateTodo,
} from "../redux/reducers/Todo";
import AboutCanvas from "../components/AboutCanvas";

export default function Homepage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const start = useSelector((state) => state.demo.start);
  const index = useSelector((state) => state.demo.index);
  const loading_todos = useSelector((state) => state.todo.loading_todos);
  const loading_delete_done = useSelector(
    (state) => state.todo.loading_delete_done
  );
  const loading_delete_all = useSelector(
    (state) => state.todo.loading_delete_all
  );

  useEffect(() => {
    dispatch(readTodos()).then((response) => {
      if (response.error) {
        dispatch(error(response.error.message));
      }
    });
  }, []);

  const TodoCard = ({ todo }) => {
    const { _id, title, description, status } = todo;
    const [modStatus, setModStatus] = useState(status);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [setting, setSetting] = useState(false);
    const statusId = () => {
      if (modStatus == "0") {
        return "info";
      } else if (modStatus == "1") {
        return "success";
      }
      return "danger";
    };

    return (
      <div className="col-md-4">
        <div className="card">
          <div className="badge"></div>
          <div className="card-body m-0 p-1">
            <div className="d-flex">
              <h4
                className="p-2 m-0"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: "80%",
                }}
              >
                {title}
              </h4>
              <div className="">
                <span
                  className={`position-absolute top-0 end-0 text-${statusId()} p-1`}
                >
                  {modStatus == "0" ? (
                    <>NEW</>
                  ) : modStatus == "1" ? (
                    <>WORKING</>
                  ) : (
                    <>DONE</>
                  )}
                </span>
              </div>
            </div>

            <p
              className="mb-0 card p-2 custom-scrollbar"
              style={{ height: "120px", overflowY: "auto" }}
            >
              {description}
            </p>
            <div className="d-flex pt-1">
              <div className="set w-100">
                {modStatus != "2" ? (
                  <button
                    disabled={setting}
                    className="btn btn-outline-success w-100"
                    onClick={() => {
                      let s = modStatus;
                      if (s == "0") {
                        s = "1";
                      } else if (s == "1") {
                        s = "2";
                      }
                      setSetting(true);
                      dispatch(
                        updateTodo({
                          _id,
                          title,
                          description,
                          status: s,
                        })
                      ).then((response) => {
                        if (response.error) {
                          dispatch(error(response.error.message));
                        } else {
                          dispatch(success("Updated!"));
                          setModStatus(s);
                        }
                        setSetting(false);
                      });
                    }}
                  >
                    {setting ? (
                      <>Updating..</>
                    ) : (
                      <>
                        {modStatus == "0" ? (
                          <i className="fa-solid fa-person-digging"></i>
                        ) : (
                          <i className="fa-solid fa-check"></i>
                        )}
                      </>
                    )}
                  </button>
                ) : null}
              </div>
              <div className="update w-100 mx-1">
                <UpdateTodoModal
                  todo={todo}
                  updating={updating}
                  setUpdating={setUpdating}
                />
              </div>
              <div className="delete w-100">
                <button
                  disabled={deleting}
                  className="btn btn-outline-danger w-100"
                  onClick={() => {
                    setDeleting(true);
                    dispatch(deleteTodo(_id)).then((response) => {
                      if (response.error) {
                        dispatch(error(response.error.message));
                      } else {
                        dispatch(success("Deleted!"));
                      }
                      setDeleting(false);
                    });
                  }}
                >
                  {deleting ? (
                    <>Deleting..</>
                  ) : (
                    <i className="fa-solid fa-eraser"></i>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TodoDemoCard = () => {
    const [title, setTitle] = useState("Sample Title");
    const [description, setDescription] = useState("Sampe Description");
    const [status, setStatus] = useState("0");

    const [modStatus, setModStatus] = useState(status);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [setting, setSetting] = useState(false);
    const statusId = () => {
      if (modStatus == "0") {
        return "info";
      } else if (modStatus == "1") {
        return "success";
      }
      return "danger";
    };

    return (
      <div className="col-md-6" id="todo-sample">
        <div className="card mb-1">
          <div className="badge"></div>
          <div className="card-body m-0 p-1">
            <div className="d-flex">
              <h4
                className="p-2 m-0"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  maxWidth: "80%",
                }}
              >
                {title}
              </h4>
              <div className="">
                <span
                  className={`position-absolute top-0 end-0 text-${statusId()} p-1`}
                >
                  {modStatus == "0" ? (
                    <>NEW</>
                  ) : modStatus == "1" ? (
                    <>WORKING</>
                  ) : (
                    <>DONE</>
                  )}
                </span>
              </div>
            </div>

            <p
              className="mb-0 card p-2 custom-scrollbar"
              style={{ height: "120px", overflowY: "auto" }}
            >
              {description}
            </p>
            <div className="d-flex pt-1">
              <div className="set w-100">
                {modStatus != "2" ? (
                  <button
                    id="set-demo"
                    disabled={setting}
                    className="btn btn-outline-success w-100"
                    onClick={() => {
                      let s = modStatus;
                      if (s == "0") {
                        s = "1";
                      } else if (s == "1") {
                        s = "2";
                      }
                      setSetting(true);
                      setModStatus(s);
                      setStatus(s);
                      setSetting(false);
                    }}
                  >
                    {setting ? (
                      <>Updating..</>
                    ) : (
                      <>
                        {modStatus == "0" ? (
                          <i className="fa-solid fa-person-digging"></i>
                        ) : (
                          <i className="fa-solid fa-check"></i>
                        )}
                      </>
                    )}
                  </button>
                ) : null}
              </div>
              <div className="update w-100 mx-1">
                <button
                  id="update-demo"
                  type="button"
                  className="btn btn-outline-warning w-100"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
              </div>
              <div className="delete w-100">
                <button
                  id="delete-demo"
                  disabled={deleting}
                  className="btn btn-outline-danger w-100"
                >
                  <i className="fa-solid fa-eraser"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {start ? <DemoCard /> : null}
      <AboutCanvas />
      <div className="row d-flex justify-content-end">
        <div className="col-md-6">
          <div className="d-flex p-1">
            <CreateNewModal />
            <button
              id="clear-done"
              disabled={loading_delete_done}
              className="btn btn-outline-warning w-100 mx-1 my-1"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxHeight: "38px",
              }}
              onClick={() =>
                dispatch(deleteDone()).then((response) => {
                  if (response.error) {
                    dispatch(error(response.error.message));
                  } else {
                    dispatch(success("Cleared!"));
                  }
                })
              }
            >
              {loading_delete_done ? (
                <>Clearing..</>
              ) : (
                <i className="fa-solid fa-broom"></i>
              )}
            </button>
            <button
              id="delete-all"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxHeight: "38px",
              }}
              disabled={loading_delete_all}
              className="btn btn-outline-danger w-100 my-1"
              onClick={() =>
                dispatch(deleteAll()).then((response) => {
                  if (response.error) {
                    dispatch(error(response.error.message));
                  } else {
                    dispatch(success("All Deleted!"));
                  }
                })
              }
            >
              {loading_delete_all ? (
                <>Deleting..</>
              ) : (
                <i className="fa-solid fa-trash"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="row g-2" id="todos-container">
        {loading_todos ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <div key={i} className="col-md-4">
                <div className="card-skeleton">
                  <div className="card-header"></div>
                  <div className="card-content"></div>
                  <div className="card-footer"></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {start ? (
              <>{index >= 2 ? <TodoDemoCard /> : null}</>
            ) : (
              <>
                {todos.map((todo) => (
                  <TodoCard key={todo._id} todo={todo} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
