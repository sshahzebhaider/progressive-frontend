import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};
export const addNewStock = createAsyncThunk(
  'addNewStock',
  async (newStock, thunkAPI) => {
    // console.log(newStock);
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
      const { data } = await axios.post(
        `https://progressive-backend.vercel.app` +`/api/employee/addNewStock`,
        newStock,
        config
      );
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

const addNewStockSlice = createSlice({
  name: 'sellProduct',
  initialState,
  reducers: {
    ADD_NEW_STOCK_RESET: () => {
      return { success: false };
    },
  },
  extraReducers: {
    [addNewStock.pending]: state => {
      return {
        loading: true,
      };
    },

    [addNewStock.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [addNewStock.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { ADD_NEW_STOCK_RESET } = addNewStockSlice.actions;
export default addNewStockSlice.reducer;
