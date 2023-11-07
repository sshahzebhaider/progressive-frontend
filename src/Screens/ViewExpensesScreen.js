import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../Features/getExpensesSlice';

import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const ViewExpensesScreen = () => {
  const dispatch = useDispatch();
  const { loading, expenses, error } = useSelector(
    store => store.newExpenseDetails
  );

  const [selectedExpense, setSelectedExpense] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  // Calculate the total expenses
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleExpenseClick = expense => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleFilterChange = filter => {
    // Logic for filtering expenses based on 'filter' value (Daily, Weekly, All)
    // Implement the filter logic here
    // Update the expenses list based on the filter selected
    console.log('Filter Selected:', filter);
  };

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
      <HStack justify="space-between" w="100%">
        <Heading fontSize={'20px'} fontWeight={700} fontFamily={'lato'}>
          View Expenses
        </Heading>
        <HStack>
          <Heading fontSize={'20px'} fontWeight={700} fontFamily={'lato'}>
            Total Expenses: Rs. {totalExpenses}
          </Heading>
          <Menu>
            <MenuButton as={Button} colorScheme="blue">
              Filter
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleFilterChange('daily')}>
                Daily
              </MenuItem>
              <MenuItem onClick={() => handleFilterChange('weekly')}>
                Weekly
              </MenuItem>
              <MenuItem onClick={() => handleFilterChange('all')}>All</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>

      <Table variant="striped" colorScheme="customColorScheme" mt={'20px'}>
        <Thead>
          <Tr>
            <Th color={'#A0AEC0'}>Employee Name</Th>
            <Th color={'#A0AEC0'}>Expense Name</Th>
            <Th color={'#A0AEC0'}>Amount</Th>
            <Th color={'#A0AEC0'}>Date</Th>
            <Th color={'#A0AEC0'}>Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr height="80px">
              <Td colSpan={5}>Loading...</Td>
            </Tr>
          ) : expenses ? (
            expenses.map((expense, index) => (
              <Tr
                key={index}
                height={'80px'}
                cursor="pointer"
                onClick={() => handleExpenseClick(expense)}
              >
                <Td fontWeight={'bold'}>{expense.employeeName}</Td>
                <Td fontWeight={'bold'}>{expense.expenseName}</Td>
                <Td fontWeight={'bold'}>Rs. {expense.amount}</Td>
                <Td fontWeight={'bold'}>
                  {new Date(expense.createdAt).toLocaleDateString()}
                </Td>
                <Td fontWeight={'bold'}>
                  {new Date(expense.createdAt).toLocaleTimeString()}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr height="80px">
              <Td colSpan={5}>No data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Expense Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedExpense && (
              <VStack align="start">
                <Box padding={'5px'}>
                  Description: {selectedExpense.description}
                </Box>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ViewExpensesScreen;
