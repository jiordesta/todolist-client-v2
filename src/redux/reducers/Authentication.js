import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../axiosInstance";
import { ErrorHandler } from "../errorHandler";

const initialState = {
  user: null,
  loading_user: false,
  loading_login: false,
  loading_register: false,
  loading_logout: false,
};

export const login = createAsyncThunk("/login", async (inputs) => {
  try {
    const { username, password } = inputs;
    const response = await axiosInstance.post(`/authentication/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});
export const register = createAsyncThunk("/register", async (inputs) => {
  try {
    const response = await axiosInstance.post(
      `/authentication/register`,
      inputs
    );
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});
export const get_current_user = createAsyncThunk(
  "/get_current_user",
  async () => {
    try {
      const response = await axiosInstance.get(
        `/authentication/get_current_user`
      );
      return response.data.user;
    } catch (error) {
      ErrorHandler(error);
    }
  }
);
export const logout = createAsyncThunk("/logout", async () => {
  try {
    const response = await axiosInstance.post(`/authentication/logout`);
    return response.data;
  } catch (error) {
    ErrorHandler(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state, action) => {
      state.loading_login = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading_login = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading_login = false;
    });
    //register
    builder.addCase(register.pending, (state, action) => {
      state.loading_register = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading_register = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading_register = false;
    });
    //get_current_user
    builder.addCase(get_current_user.pending, (state, action) => {
      state.loading_user = true;
    });
    builder.addCase(get_current_user.rejected, (state, action) => {
      state.user = null;
      state.loading_user = false;
    });
    builder.addCase(get_current_user.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading_user = false;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading_logout = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading_logout = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading_logout = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
