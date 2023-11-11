import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserProfile = createAsyncThunk(
  'updateUserProfile',
  async (user, thunkAPI) => {
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
      const { data } = await axios.put(`/api/employee/profile`, user, config);

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

const initialState = {};

export const updateProfileSlice = createSlice({
  name: 'userLoginReducer',
  initialState,
  // reducers: {
  //   USER_UPDATE_PROFILE_RESET: () => {
  //     return {};
  //   },
  // },
  extraReducers: {
    [updateUserProfile.pending]: state => {
      return {
        loading: true,
      };
    },

    [updateUserProfile.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        employeeInfo: action.payload,
      };
    },

    [updateUserProfile.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { USER_UPDATE_PROFILE_RESET } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
