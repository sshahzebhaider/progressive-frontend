import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const deleteEmployee = createAsyncThunk(
  'productDelete',
  async (id, thunkAPI) => {
    try {
      const {
        employeeLogin: { employeeInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${employeeInfo.token}`,
        },
      };
      await axios.delete(`https://progressive-backend.vercel.app` +`/api/admin/${id}`, config);
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

const employeeDeleteSlice = createSlice({
  name: 'productDelete',
  initialState,
  extraReducers: {
    [deleteEmployee.pending]: state => {
      return {
        loading: true,
      };
    },

    [deleteEmployee.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [deleteEmployee.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default employeeDeleteSlice.reducer;
