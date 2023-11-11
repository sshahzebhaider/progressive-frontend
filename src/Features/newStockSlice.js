import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  newStock: [],
  error: '',
};

export const getNewStockList = createAsyncThunk('getNewStockList', async () => {
  try {
    const { data } = await axios.get(`https://progressive-backend.vercel.app` +`/api/products/newStock`);
    return data;
  } catch (error) {
    return error;
  }
});

export const newStockSlice = createSlice({
  name: 'NewStockList',
  initialState,

  extraReducers: {
    [getNewStockList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getNewStockList.fulfilled]: (state, action) => {
      return {
        loading: false,
        newStock: action.payload,
      };
    },
    [getNewStockList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export default newStockSlice.reducer;
