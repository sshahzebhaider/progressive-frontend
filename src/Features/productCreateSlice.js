import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const createProduct = createAsyncThunk(
  'createProduct',
  async (NULL, thunkAPI) => {
    try {
      const {
        employeeLogin: { employeeInfo },
      } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${employeeInfo.token}`,
        },
      };
      const { data } = await axios.post(`https://progressive-backend.vercel.app` +`/api/products`, {}, config);
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

const productCreateSlice = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {
    PRODUCT_CREATE_RESET: () => {
      return {};
    },
  },
  extraReducers: {
    [createProduct.pending]: state => {
      return {
        loading: true,
      };
    },

    [createProduct.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    },

    [createProduct.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { PRODUCT_CREATE_RESET } = productCreateSlice.actions;
export default productCreateSlice.reducer;
