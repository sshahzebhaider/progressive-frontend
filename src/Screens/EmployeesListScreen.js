import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  Menu,
  MenuButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'; // Import the FaEdit icon
import SearchBar from '../Components/SearchBar';
import { getEmployeeList } from '../Features/employeeListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { EMPLOYEE_LIST_RESET } from '../Features/employeeListSlice';
import { deleteEmployee } from '../Features/employeeDeleteSlice';

const formatDate = date => {
  const dateObject = new Date(date);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-US', options);
  return formattedDate;
};

const EmployeesListScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, employees } = useSelector(
    store => store.employeesList
  );
  const {
    error: deleteError,
    loading: deleteLoading,
    success: deleteSuccess,
  } = useSelector(store => store.employeeDelete);

  useEffect(() => {
    dispatch(getEmployeeList());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteEmployee(deleteId));
    dispatch(EMPLOYEE_LIST_RESET(deleteId));
    onClose();
  };
  const handleModal = id => {
    onOpen();
    setDeleteId(id);
  };

  const handleEmployeeDetails = id => {
    navigate(`/employeeDetails/${id}`);
  };

  return (
    <Box>
      <SearchBar />

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
        <Box padding={'24px'}>
          <HStack spacing={'800px'}>
            <Heading fontSize={'20px'} fontWeight={700} fontFamily={'lato'}>
              Employees List
            </Heading>

            <Button
              as={RouterLink}
              to={'/addEmployee'}
              bg={'#3182ce'}
              color={'white'}
              _hover={{ bg: '#2D75B7' }}
              _active={{ bg: '#2D75B7' }}
            >
              {' '}
              <Icon as={FaPlus} fontSize={'14px'} />
              <Box p={'3px'}> Add New Employee</Box>
            </Button>
          </HStack>
          <Table variant="striped" colorScheme="customColorScheme" mt={'20px'}>
            <Thead>
              <Tr>
                <Th color={'#A0AEC0'}>Name</Th>
                <Th color={'#A0AEC0'}>Role</Th>
                <Th color={'#A0AEC0'}>Employed</Th>
                <Th color={'#A0AEC0'}>Delete</Th>
              </Tr>
            </Thead>{' '}
            <Tbody>
              {loading ? (
                <Tr height="80px">
                  <Td colSpan={8}>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <Spinner color="white" />
                    </Flex>
                  </Td>
                </Tr>
              ) : (
                employees.map((item, index) => (
                  <Tr
                    key={index}
                    height={'80px'}
                    cursor={'pointer'}
                    onClick={() => handleEmployeeDetails(item._id)}
                  >
                    <Td>
                      <VStack alignItems={'flex-start'}>
                        <Box fontWeight={'700'}>{item.name}</Box>
                        <Box fontSize={'14px'}>{item.email}</Box>
                      </VStack>
                    </Td>{' '}
                    <Td fontWeight={'500'}>{item.role}</Td>
                    <Td fontWeight={'500'}>{formatDate(item.employed)}</Td>
                    <Td>
                      <Box _hover={{ cursor: 'pointer ' }}>
                        <FaTrash onClick={() => handleModal(item._id)} />
                      </Box>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>{' '}
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to remove this employee?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack ml={'125px'}>
              <Button
                color={'white'}
                _hover={{ bg: '#2D75B7' }}
                _active={{ bg: '#2D75B7' }}
                bg={'#3182ce'}
                width={'80px'}
                onClick={handleDelete}
              >
                {deleteLoading ? <Spinner /> : <Box>Yes</Box>}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeesListScreen;
