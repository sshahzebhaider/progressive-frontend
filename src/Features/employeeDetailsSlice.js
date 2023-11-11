import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmployeeDetails = createAsyncThunk(
  'employeeDetails',
  async (id, thunkAPI) => {
    try {
      const {
        employeeLogin: { employeeInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${employeeInfo.token}`,
        },
      };
      const { data } = await axios.get(`https://progressive-backend.vercel.app` +`/api/admin/${id}`, config);
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

const initialState = {
  user: {},
};

export const EmployeeDetailsSlice = createSlice({
  name: 'EmployeeDetails',
  initialState,
  reducers: {
    USER_DETAILS_RESET: () => {
      return { user: {} };
    },
  },
  extraReducers: {
    [getEmployeeDetails.pending]: state => {
      return {
        ...state,
        loading: true,
      };
    },

    [getEmployeeDetails.fulfilled]: (state, action) => {
      return {
        loading: false,
        employeeDetails: action.payload,
      };
    },

    [getEmployeeDetails.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { USER_DETAILS_RESET } = EmployeeDetailsSlice.actions;
export default EmployeeDetailsSlice.reducer;
