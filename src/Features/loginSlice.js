import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      // specifying the content type of the request payload as JSON
      const config = {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `https://progressive-backend.vercel.app` +`/api/employee/login`,
        { email, password },
        config
      );
      //Setting User data to local storage which we are getting from backend
      localStorage.setItem('employeeInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      //This will end up in rejected section as payload... just error return karny sy fulfilled action run hora tha
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const initialState = {};

export const loginEmployeeSlice = createSlice({
  name: 'LoginUser',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('employeeInfo');
      return {};
    },
  },
  extraReducers: {
    [login.pending]: () => {
      return {
        loading: true,
      };
    },

    [login.fulfilled]: (state, action) => {
      return {
        loading: false,
        employeeInfo: action.payload,
      };
    },

    [login.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { logout } = loginEmployeeSlice.actions;
export default loginEmployeeSlice.reducer;
