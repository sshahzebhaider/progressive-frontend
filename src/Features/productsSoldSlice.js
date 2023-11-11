import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  productsSold: [],
  error: '',
};

export const getProductsSoldList = createAsyncThunk(
  'getSoldProductList',
  async () => {
    try {
      const { data } = await axios.get(`https://progressive-backend.vercel.app` +`/api/products/soldProducts`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const productsSoldListSlice = createSlice({
  name: 'SoldProductList',
  initialState,

  extraReducers: {
    [getProductsSoldList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getProductsSoldList.fulfilled]: (state, action) => {
      return {
        loading: false,
        soldProducts: action.payload,
      };
    },
    [getProductsSoldList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { PRODUCT_SOLD_RESET } = productsSoldListSlice.actions;
export default productsSoldListSlice.reducer;
