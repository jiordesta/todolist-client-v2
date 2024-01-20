import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";
import { ErrorHandler } from "../errorHandler";
const initialState = {
  todos: [],
  loading_todos: false,
  loading_update: false,
  loading_create: false,
  loading_delete_all: false,
  loading_delete_done: false,
};

export const createTodo = createAsyncThunk("/create_todo", async (inputs) => {
  try {
    const response = await axiosInstance.post(`/todo/create`, inputs);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});
export const readTodo = createAsyncThunk("/read_todo", async (id) => {
  try {
  } catch (error) {}
});
export const readTodos = createAsyncThunk("/read_todos", async () => {
  try {
    const response = await axiosInstance.get(`/todo/read_all`);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});
export const updateTodo = createAsyncThunk("/update_todo", async (inputs) => {
  try {
    const response = await axiosInstance.patch(`/todo/update`, inputs);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});
export const deleteTodo = createAsyncThunk("/delete_todo", async (id) => {
  try {
    const response = await axiosInstance.delete(`/todo/delete/${id}`);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});

export const deleteAll = createAsyncThunk("/delete_all", async () => {
  try {
    const response = await axiosInstance.delete(`/todo/delete_all`);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});

export const deleteDone = createAsyncThunk("/delete_done", async () => {
  try {
    const response = await axiosInstance.delete(`/todo/delete_done`);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});

const sortTodos = (todos) => {
  const newTodo = [];
  const workingTodo = [];
  const doneTodo = [];

  todos.map((todo) =>
    todo.status == "0"
      ? newTodo.push(todo)
      : todo.status == "1"
      ? workingTodo.push(todo)
      : doneTodo.push(todo)
  );

  return newTodo.concat(workingTodo, doneTodo);
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(createTodo.pending, (state, action) => {
      state.loading_create = true;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.loading_create = false;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.loading_create = false;
      state.todos.unshift(action.payload.todo);
    });
    //read_all
    builder.addCase(readTodos.pending, (state, action) => {
      state.loading_todos = true;
    });
    builder.addCase(readTodos.rejected, (state, action) => {
      state.loading_todos = false;
      state.todos = [];
    });
    builder.addCase(readTodos.fulfilled, (state, action) => {
      state.loading_todos = false;
      state.todos = sortTodos(action.payload.todos);
    });
    //update
    builder.addCase(updateTodo.pending, (state, action) => {
      state.loading_update = true;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.loading_update = false;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const { _id, title, description, status } = action.payload.todo;
      state.loading_update = false;
      state.todos = state.todos.map((todo) =>
        todo._id == _id ? { ...todo, title, description, status } : todo
      );
      state.todos = sortTodos(state.todos);
    });
    //delete
    builder.addCase(deleteTodo.pending, (state, action) => {});
    builder.addCase(deleteTodo.rejected, (state, action) => {});
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const { _id } = action.payload.todo;
      state.todos = state.todos.filter((todo) => todo._id != _id);
    });
    //delete_all
    builder.addCase(deleteAll.pending, (state, action) => {
      state.loading_delete_all = true;
    });
    builder.addCase(deleteAll.rejected, (state, action) => {
      state.loading_delete_all = false;
    });
    builder.addCase(deleteAll.fulfilled, (state, action) => {
      state.loading_delete_all = false;
      state.todos = [];
    });
    //delete_done
    builder.addCase(deleteDone.pending, (state, action) => {
      state.loading_delete_done = true;
    });
    builder.addCase(deleteDone.rejected, (state, action) => {
      state.loading_delete_done = false;
    });
    builder.addCase(deleteDone.fulfilled, (state, action) => {
      state.loading_delete_done = false;
      state.todos = state.todos.filter((todo) => todo.status != "2");
    });
  },
});

export default todoSlice.reducer;
