import { configureStore } from '@reduxjs/toolkit';
import productsListSlice from './Features/productsListSlice';
import loginEmployeeSlice from './Features/loginSlice';
import productUpdateSlice from './Features/productUpdateSlice';
import productDeleteSlice from './Features/productDeleteSlice';
import productCreateSlice from './Features/productCreateSlice';
import employeeDeleteSlice from './Features/employeeDeleteSlice';
import employeeListSlice from './Features/employeeListSlice';
import employeeCreateSlice from './Features/employeeCreateSlice';
import updateProfileSlice from './Features/updateProfileSlice';
import updateEmployeeProfileSlice from './Features/updateEmployeeProfileSlice';
import employeeDetailsSlice from './Features/employeeDetailsSlice';
import productSellSlice from './Features/productSellSlice';
import productsSoldSlice from './Features/productsSoldSlice';
import addNewStockSlice from './Features/addNewStockSlice';
import newStockSlice from './Features/newStockSlice';
import addNewExpenseSlice from './Features/addNewExpenseSlice';
import getExpensesSlice from './Features/getExpensesSlice';
const employeeInfoFromStorage = localStorage.getItem('employeeInfo')
  ? JSON.parse(localStorage.getItem('employeeInfo'))
  : null;
const initialState = {
  employeeLogin: {
    employeeInfo: employeeInfoFromStorage,
  },
};
export const store = configureStore({
  reducer: {
    productList: productsListSlice,
    employeeLogin: loginEmployeeSlice,
    productUpdate: productUpdateSlice,
    productDelete: productDeleteSlice,
    productCreate: productCreateSlice,
    employeesList: employeeListSlice,
    employeeDelete: employeeDeleteSlice,
    employeeCreate: employeeCreateSlice,
    updateProfile: updateProfileSlice,
    updateEmployeeProfile: updateEmployeeProfileSlice,
    employeeDetails: employeeDetailsSlice,
    sellProducts: productSellSlice,
    productsSold: productsSoldSlice,
    newStockAdded: addNewStockSlice,
    newStockAvailable: newStockSlice,
    newExpenseAdded: addNewExpenseSlice,
    newExpenseDetails: getExpensesSlice,
  },
  preloadedState: initialState,
});
