import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  products: [],
  error: '',
};

export const getProductList = createAsyncThunk('getProductList', async () => {
  try {
    const { data } = await axios.get(`https://progressive-backend.vercel.app` +`/api/products`);
    return data;
  } catch (error) {
    return error;
  }
});

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    PRODUCT_LIST_RESET: (state, action) => {
      state.products = state.products.filter(
        product => product._id !== action.payload
      );
    },
  },
  extraReducers: {
    [getProductList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getProductList.fulfilled]: (state, action) => {
      return {
        loading: false,
        products: action.payload,
      };
    },
    [getProductList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { PRODUCT_LIST_RESET } = productListSlice.actions;
export default productListSlice.reducer;
