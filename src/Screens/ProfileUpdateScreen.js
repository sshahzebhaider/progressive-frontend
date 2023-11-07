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
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateUserProfile } from '../Features/updateProfileSlice';

const ProfileUpdateScreen = () => {
  const { employeeInfo } = useSelector(store => store.employeeLogin);
  const {
    loading,
    error,
    success,
    employeeInfo: updatedEmployeeInfo,
  } = useSelector(store => store.updateProfile);
  const [name, setName] = useState(employeeInfo.name);
  const [email, setEmail] = useState(employeeInfo.email);
  const [password, setPassword] = useState(employeeInfo.password);
  const [confirmPassword, setConfirmPassword] = useState(employeeInfo.password);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
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
    if (password !== confirmPassword) {
      setPasswordAlert(true);
      setTimeout(() => {
        setPasswordAlert(false);
      }, 3000);
    } else {
      dispatch(
        updateUserProfile({ id: employeeInfo._id, name, email, password })
      );
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="alert-overlay">
        {(passwordAlert || updateAlert) && (
          <Alert
            ml="388px"
            status={error ? 'error' : success ? 'success' : 'info'}
            className="fade-in-slide-down"
          >
            <AlertIcon />
            <AlertDescription>
              {error
                ? 'This email is already registered'
                : success
                ? 'Information updated successfully'
                : 'Passwords do not match'}
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
          {employeeInfo.isAdmin ? (
            <Heading as="h2" mb={4}>
              Admin Profile
            </Heading>
          ) : (
            <Heading as="h2" mb={4}>
              Employee Profile
            </Heading>
          )}

          <form onSubmit={submitHandler}>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={e => setName(e.target.value)}
                {...(!employeeInfo.isAdmin && { isDisabled: true })}
              />
            </FormControl>

            <FormControl id="email" mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                {...(!employeeInfo.isAdmin && { isDisabled: true })}
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

            <FormControl id="confirmPassword" mb={4}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowConfirmPassword}
                    icon={
                      showConfirmPassword ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )
                    }
                  />
                </InputRightElement>
              </InputGroup>
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

export default ProfileUpdateScreen;
