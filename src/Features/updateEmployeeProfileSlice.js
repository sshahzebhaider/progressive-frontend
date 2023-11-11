import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateEmployee = createAsyncThunk(
  'employeeProfileUpdate',
  async (user, thunkAPI) => {
    console.log(user);
    try {
      const {
        employeeLogin: { employeeInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          'Cotent-Type': 'application/json',
          Authorization: `Bearer ${employeeInfo.token}`,
        },
      };
      const { data } = await axios.put(`https://progressive-backend.vercel.app` +`/api/admin/${user.id}`, user, config);

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

export const updateEmployeeProfileSlice = createSlice({
  name: 'employeeProfileUpdate',
  initialState,
  reducers: {
    USER_UPDATE_RESET: () => {
      return { user: {} };
    },
  },

  extraReducers: {
    [updateEmployee.pending]: state => {
      return {
        loading: true,
      };
    },

    [updateEmployee.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [updateEmployee.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { USER_UPDATE_RESET } = updateEmployeeProfileSlice.actions;
export default updateEmployeeProfileSlice.reducer;
