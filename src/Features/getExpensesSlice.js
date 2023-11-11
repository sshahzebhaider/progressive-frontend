import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  expenses: [],
  error: '',
};

export const getExpenses = createAsyncThunk(
  'expenses/getExpenses',
  async () => {
    try {
      const { data } = await axios.get(`https://progressive-backend.vercel.app` +'/api/admin/expenses');
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getExpensesSlice = createSlice({
  name: 'Expenses',
  initialState,
  reducers: {},

  extraReducers: {
    [getExpenses.pending]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [getExpenses.fulfilled]: (state, action) => {
      return {
        ...state,
        loading: false,
        expenses: action.payload,
      };
    },
    [getExpenses.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default getExpensesSlice.reducer;
