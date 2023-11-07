import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
  Checkbox,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getEmployeeDetails } from '../Features/employeeDetailsSlice';
import { updateEmployee } from '../Features/updateEmployeeProfileSlice';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
const EmployeeDetailsScreen = () => {
  const {
    loading: detailLoading,
    error: detailError,
    employeeDetails,
  } = useSelector(store => store.employeeDetails);
  const { loading, error, success } = useSelector(
    store => store.updateEmployeeProfile
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    dispatch(getEmployeeDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (employeeDetails) {
      setName(employeeDetails.name || '');
      setEmail(employeeDetails.email || '');
      setIsAdmin(employeeDetails.isAdmin || false);
      setPassword(employeeDetails.password || '');
    }
  }, [employeeDetails]);

  useEffect(() => {
    if (error || success) {
      setUpdateAlert(true);
      setTimeout(() => {
        setUpdateAlert(false);
      }, 3000);
    }
  }, [error, success]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      updateEmployee({
        id: employeeDetails._id,
        name,
        email,
        isAdmin,
        password,
      })
    );
  };

  return (
    <>
      <div className="alert-overlay">
        {updateAlert && (
          <Alert
            ml="388px"
            status={error ? 'error' : success ? 'success' : 'info'}
            className="fade-in-slide-down"
          >
            <AlertIcon />
            <AlertDescription>
              {success
                ? 'Information updated successfully'
                : 'Error occurred while updating'}
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
      >
        <Box p={4}>
          <Heading as="h2" mb={4}>
            Employee Profile
          </Heading>

          <form onSubmit={submitHandler}>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={detailLoading}
              />
            </FormControl>

            <FormControl id="email" mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={detailLoading}
              />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowPassword}
                    icon={showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="isAdmin" mb={4}>
              <Checkbox
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              >
                Is Admin
              </Checkbox>
            </FormControl>

            <Center>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                loadingText="Updating..."
              >
                Update
              </Button>
            </Center>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default EmployeeDetailsScreen;
