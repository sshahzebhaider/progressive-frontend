import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const createEmployee = createAsyncThunk(
  'createEmployee',
  async (newEmployee, thunkAPI) => {
    console.log(newEmployee);
    try {
      const {
        employeeLogin: { employeeInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${employeeInfo.token}`,
        },
      };
      const { data } = await axios.post(`https://progressive-backend.vercel.app` +`/api/admin`, newEmployee, config);
      return data;
    } catch (error) {
      const newError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return thunkAPI.rejectWithValue(newError);
    }
  }
);

const employeeCreateSlice = createSlice({
  name: 'createEmployee',
  initialState,
  reducers: {
    EMPLOYEE_CREATE_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    [createEmployee.pending]: state => {
      return {
        loading: true,
      };
    },

    [createEmployee.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        employee: action.payload,
      };
    },

    [createEmployee.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { EMPLOYEE_CREATE_RESET } = employeeCreateSlice.actions;
export default employeeCreateSlice.reducer;
