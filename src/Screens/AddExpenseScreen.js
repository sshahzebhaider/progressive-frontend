import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Alert,
  AlertIcon,
  Center,
} from '@chakra-ui/react';
import { addNewExpense } from '../Features/addNewExpenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_EXPENSE_RESET } from '../Features/addNewExpenseSlice';

const AddExpenseScreen = () => {
  const dispatch = useDispatch();
  const [expenseData, setExpenseData] = useState({
    expenseName: '',
    description: '',
    amount: '',
  });
  const { loading, error, success } = useSelector(
    store => store.newExpenseAdded
  );

  const handleInputChange = event => {
    const { id, value } = event.target;
    setExpenseData({ ...expenseData, [id]: value });
  };

  const handleExpenseSubmission = event => {
    event.preventDefault();
    dispatch(addNewExpense(expenseData));
  };

  useEffect(() => {
    let alertTimer;

    if (success || error) {
      alertTimer = setTimeout(() => {
        dispatch({ type: ADD_NEW_EXPENSE_RESET });
      }, 3000);
    }

    return () => clearTimeout(alertTimer);
  }, [success, error, dispatch]);

  return (
    <Box
      pos={'absolute'}
      width={'1184px'}
      h={'100vh'}
      border={'1px solid #E2E8F0'}
      mt={'104px'}
      ml={'305px'}
      bg={'white'}
      borderRadius={'20px'}
      padding="24px"
    >
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          An error occurred while adding the expense.
        </Alert>
      )}
      {success && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Expense added successfully!
        </Alert>
      )}
      <form onSubmit={handleExpenseSubmission}>
        <FormControl id="expenseName" isRequired>
          <FormLabel>Expense Name</FormLabel>
          <Input
            type="text"
            id="expenseName"
            placeholder="Enter expense name"
            value={expenseData.expenseName}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="description" mt={4} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            id="description"
            placeholder="Enter description"
            value={expenseData.description}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="amount" mt={4} isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            id="amount"
            placeholder="Enter amount"
            value={expenseData.amount}
            onChange={handleInputChange}
          />
        </FormControl>
        <Center>
          <Button
            colorScheme="blue"
            mt={4}
            type="submit"
            isLoading={loading}
            loadingText="Adding..."
          >
            Add Expense
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default AddExpenseScreen;
