import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  employees: [],
  error: '',
};

export const getEmployeeList = createAsyncThunk('getEmployeeList', async () => {
  try {
    const { data } = await axios.get(`https://progressive-backend.vercel.app` +`/api/admin`);
    return data;
  } catch (error) {
    return error;
  }
});

export const employeeListSlice = createSlice({
  name: 'employeeList',
  initialState,
  reducers: {
    EMPLOYEE_LIST_RESET: (state, action) => {
      state.employees = state.employees.filter(
        employee => employee._id !== action.payload
      );
    },
    // PRODUCT_UPDATE_RESET: (state, action) => {
    //   const updatedProduct = action.payload; // This should be the updated product data received from the API
    //   const updatedIndex = state.products.findIndex(
    //     product => product._id === updatedProduct._id
    //   );

    //   if (updatedIndex !== -1) {
    //     state.products[updatedIndex] = updatedProduct;
    //   }
    // },
  },
  extraReducers: {
    [getEmployeeList.pending]: state => {
      return {
        loading: true,
      };
    },
    [getEmployeeList.fulfilled]: (state, action) => {
      return {
        loading: false,
        employees: action.payload,
      };
    },
    [getEmployeeList.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { EMPLOYEE_LIST_RESET } = employeeListSlice.actions;
export default employeeListSlice.reducer;
