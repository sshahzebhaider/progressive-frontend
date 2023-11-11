import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};
export const addNewExpense = createAsyncThunk(
  'addNewExpense',
  async (expenseDetails, thunkAPI) => {
    // console.log(expenseDetails);
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
        `https://progressive-backend.vercel.app` +`/api/employee/addExpense`,
        expenseDetails,
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

const addNewExpenseSlice = createSlice({
  name: 'NewExpense',
  initialState,
  reducers: {
    ADD_NEW_EXPENSE_RESET: () => {
      return { success: false };
    },
  },
  extraReducers: {
    [addNewExpense.pending]: state => {
      return {
        loading: true,
      };
    },

    [addNewExpense.fulfilled]: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },

    [addNewExpense.rejected]: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});
export const { ADD_NEW_EXPENSE_RESET } = addNewExpenseSlice.actions;
export default addNewExpenseSlice.reducer;
