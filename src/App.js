import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
  useLocation,
} from 'react-router-dom';
import SidebarContent from './Components/Dashboard Components/SidebarContent';
import ProductsScreen from './Screens/ProductsScreen';
import LoginScreen from './Screens/LoginScreen';
import EmployeesListScreen from './Screens/EmployeesListScreen';
import AddNewEmployeeScreen from './Screens/AddNewEmployeeScreen';
import PetroleumProductsScreen from './Screens/PetroleumProductsScreen';
import SetPricesScreen from './Screens/SetPrices';
import ProfileUpdateScreen from './Screens/ProfileUpdateScreen';
import EmployeeDetailsScreen from './Screens/EmployeeDetailsScreen';
import SellProductScreen from './Screens/EmployeeScreens/SellProductScreen';
import ConfirmSaleScreen from './Screens/EmployeeScreens/ConfirmSaleScreen';
import SoldProductsScreen from './Screens/SoldProductsScreen';
import SellPetroleumProductsScreen from './Screens/EmployeeScreens/SellPetroleumProductScreen';
import AddStockScreen from './Screens/EmployeeScreens/AddStockScreen';
import AddStockConfirmationScreen from './Screens/EmployeeScreens/AddStockConfirmationScreen';
import AddPetroleumStockScreen from './Screens/EmployeeScreens/AddPetroleumStockScreen';
import NewStockScreen from './Screens/NewStockScreen';
import AddExpenseScreen from './Screens/AddExpenseScreen';
import ViewExpensesScreen from './Screens/ViewExpensesScreen';
import Dashboard from './Screens/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <SidebarContent />
      <main>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/employees" element={<EmployeesListScreen />} />
          <Route path="/addEmployee" element={<AddNewEmployeeScreen />} />
          <Route path="/setPrices" element={<SetPricesScreen />} />
          <Route path="/profile" element={<ProfileUpdateScreen />} />
          <Route path="/sellProduct" element={<SellProductScreen />} />
          <Route
            path="/sellPetroleumProduct"
            element={<SellPetroleumProductsScreen />}
          />
          <Route path="/confirmation" element={<ConfirmSaleScreen />} />
          <Route path="/soldProducts" element={<SoldProductsScreen />} />
          <Route path="/addStock" element={<AddStockScreen />} />
          <Route path="/newStockAdded" element={<NewStockScreen />} />
          <Route path="/addExpense" element={<AddExpenseScreen />} />
          <Route path="/viewExpenses" element={<ViewExpensesScreen />} />
          <Route
            path="/addPetroleumStock"
            element={<AddPetroleumStockScreen />}
          />
          <Route
            path="/addStockConfirmation"
            element={<AddStockConfirmationScreen />}
          />

          <Route
            path="/petroleumProducts"
            element={<PetroleumProductsScreen />}
          />
          <Route
            path="/employeeDetails/:id"
            element={<EmployeeDetailsScreen />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
