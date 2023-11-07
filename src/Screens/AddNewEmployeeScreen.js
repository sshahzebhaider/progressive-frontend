import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Select,
  ChakraProvider,
  extendTheme,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { EMPLOYEE_CREATE_RESET } from '../Features/employeeCreateSlice';
import { createEmployee } from '../Features/employeeCreateSlice';
const AddNewEmployeeScreen = () => {
  const dispatch = useDispatch();
  const [successAlert, setSuccessAlert] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    role: 'developer',
    employed: '',
    isAdmin: false,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setEmployeeData({ ...employeeData, [name]: newValue });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Employee Data:', employeeData);
    dispatch(createEmployee(employeeData));
  };

  const {
    error: createEmployeeError,
    loading: createEmployeeLoading,
    success: createEmployeeSuccess,
    product: createdEmployee,
  } = useSelector(store => store.employeeCreate);

  useEffect(() => {
    if (createEmployeeSuccess) {
      setSuccessAlert(true);

      const timeout = setTimeout(() => {
        setSuccessAlert(false);
        dispatch(EMPLOYEE_CREATE_RESET());
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setSuccessAlert(false);
    }
  }, [createEmployeeSuccess, dispatch]);

  useEffect(() => {
    if (createEmployeeError) {
      setSuccessAlert(true);

      const timeout = setTimeout(() => {
        setSuccessAlert(false);
        dispatch(EMPLOYEE_CREATE_RESET());
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setSuccessAlert(false);
    }
  }, [createEmployeeError, dispatch]);

  return (
    <>
      <div className="alert-overlay">
        {(successAlert || createEmployeeError) && (
          <Alert
            ml="388px"
            status={createEmployeeError ? 'error' : 'info'}
            className={
              successAlert || createEmployeeError ? 'fade-in-slide-down' : ''
            }
          >
            <AlertIcon />
            <AlertDescription>
              {createEmployeeError
                ? 'Error! Email already registered'
                : 'Employeed Added Successfully'}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <Box
        pos={'absolute'}
        width={'1184px'}
        h={'100vh'}
        border={'1px solid #E2E8F0'}
        mt={'104px'}
        ml={'305px'}
        bg={'white'}
        borderRadius={'20px'}
        p={4}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Employee Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Employee Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={employeeData.role}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employees">Employee</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Employment Date</FormLabel>
            <Input
              type="date"
              name="employed"
              value={employeeData.employed}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Is Admin?</FormLabel>
            <Checkbox
              name="isAdmin"
              isChecked={employeeData.isAdmin}
              onChange={handleChange}
            >
              Admin
            </Checkbox>
          </FormControl>
          <Center>
            <Button
              bg={'#3182ce'}
              _hover={{ bg: '#2D75B7' }}
              _active={{ bg: '#2D75B7' }}
              mt={4}
              colorScheme="teal"
              type="submit"
              isLoading={createEmployeeLoading}
              loadingText="Adding..."
            >
              {'Submit'}
            </Button>
          </Center>
        </form>
      </Box>
    </>
  );
};

export default AddNewEmployeeScreen;
