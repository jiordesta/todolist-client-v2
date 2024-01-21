import { createSlice } from "@reduxjs/toolkit";

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

const initialState = {
  top: viewportHeight / 4,
  offset: 0,
  left: viewportWidth / 4,
  index: -1,
  height: 50,
  width: viewportWidth / 2,
  start: false,
  message:
    "Hello there! Welcome to our intuitive ToDoList web app designed to help you organize your tasks effortlessly. Click start to give you a quick preview!",
};

const steps = [
  {
    message:
      "This is the create new todo button. A modal will open and ask for the todo details.",
    target: "#create-modal",
  },
  {
    message:
      "This is the clear done todo button. It will delete all todo that has status of (DONE).",
    target: "#clear-done",
  },
  {
    message:
      "This is the delete all todo button. It will delete all todos either the status are (NEW, WORKING and DONE).",
    target: "#delete-all",
  },
  { message: "This is a sample todo.", target: "#todo-sample" },
  {
    message: "Set status button.",
    target: "#set-demo",
  },
  {
    message: "Update todo button",
    target: "#update-demo",
  },
  {
    message: "Delete todo button",
    target: "#delete-demo",
  },
];

const updatePosition = (index) => {
  const { message, target } = steps[index];
  const targetElement = document.querySelector(target);
  const { top, left, height, width } = targetElement.getBoundingClientRect();
  return { top, left, height, width, message };
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    setPosition: (state, action) => {
      state.index += action.payload;
      const { top, left, height, width, message } = updatePosition(state.index);
      state.left = left;
      state.top = top;
      state.height = height;
      state.width = width;
      state.message = message;
      state.offset = height + 10;
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    reset: (state, action) => {
      state.start = false;
      state.index = -1;
      state.left = 500;
      state.top = 250;
      state.height = 50;
      state.width = 500;
      state.message =
        "Hello there! Welcome to our intuitive ToDoList web app designed to help you organize your tasks effortlessly. Follow these simple steps to make the most out of your experience:";
    },
  },
});

export const { setPosition, setStart, reset } = demoSlice.actions;
export default demoSlice.reducer;
