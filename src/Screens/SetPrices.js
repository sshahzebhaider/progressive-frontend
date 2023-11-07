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
  useDisclosure,
  Alert,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'; // Import the FaEdit icon
import SearchBar from '../Components/SearchBar';
import { getProductList } from '../Features/productsListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../Features/productUpdateSlice';

import { PRODUCT_CREATE_RESET } from '../Features/productCreateSlice';
const SetPricesScreen = () => {
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedValues, setEditedValues] = useState({}); // Store edited values here
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [successAlert, setSuccessAlert] = useState(false);
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(store => store.productList);

  const {
    error: updateError,
    loading: updateLoading,
    product: updatedProduct,
    success,
  } = useSelector(store => store.productUpdate);

  const {
    error: createProductError,
    loading: createProductLoading,
    success: createProductSuccess,
    product: createdProduct,
  } = useSelector(store => store.productCreate);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const handleEdit = id => {
    setEditMode(true);
    setEditId(id);

    const selectedItem = products.find(item => item._id === id);
    setEditedValues({
      name: selectedItem.name,
      previousStock: selectedItem.previousStock,
      newStock: selectedItem.newStock,
      sale: selectedItem.sale,
      remainingBalance: selectedItem.remainingBalance,
      price: selectedItem.price,
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditId(null);
  };

  const handleSubmit = () => {
    setEditMode(false);
    dispatch(
      updateProduct({
        id: editId,
        name: editedValues.name,
        previousStock: editedValues.previousStock,
        newStock: editedValues.newStock,
        sale: editedValues.sale,
        remainingBalance: editedValues.remainingBalance,
        price: editedValues.price,
      })
    );

    setEditId(null);
  };

  const handleInputChange = (key, value) => {
    if (key !== 'name' && typeof value === 'string' && value !== '') {
      value = parseInt(value);
    }

    setEditedValues(prevValues => ({
      ...prevValues,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (success) {
      setSuccessAlert(true);

      const timeout = setTimeout(() => {
        setSuccessAlert(false);
      }, 3000);

      // Cleanup the timeout when the component unmounts or when the alert is hidden
      return () => clearTimeout(timeout);
    } else {
      // Set successAlert to false if success becomes false
      setSuccessAlert(false);
    }
  }, [dispatch, success]);
  useEffect(() => {
    if (createProductSuccess) {
      setSuccessAlert(true);

      const timeout = setTimeout(() => {
        setSuccessAlert(false);
        dispatch(PRODUCT_CREATE_RESET());
      }, 3000);

      // Cleanup the timeout when the component unmounts or when the alert is hidden
      return () => clearTimeout(timeout);
    } else {
      // Set successAlert to false if success becomes false
      setSuccessAlert(false);
    }
  }, [createProductSuccess, dispatch]);

  return (
    <Box>
      <div className="alert-overlay">
        {(successAlert || createProductSuccess) && (
          <Alert
            ml="388px"
            status="info"
            className={
              success || createProductSuccess ? 'fade-in-slide-down' : ''
            }
          >
            <AlertIcon />
            <AlertDescription>
              {success ? 'Product Updated' : 'New Product Added'}
            </AlertDescription>
          </Alert>
        )}
      </div>
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
              Set Product Prices
            </Heading>
          </HStack>
          <Table variant="striped" colorScheme="customColorScheme" mt={'20px'}>
            <Thead>
              <Tr>
                <Th color={'#A0AEC0'}>Name</Th>
                <Th color={'#A0AEC0'}>Current Price</Th>
                <Th color={'#A0AEC0'}>Change Price</Th>
              </Tr>
            </Thead>
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
                products.map((item, index) => (
                  <Tr key={index} height={'80px'}>
                    <Td>
                      <Box>
                        {updatedProduct && updatedProduct._id === item._id
                          ? updatedProduct.name
                          : item.name}
                      </Box>
                    </Td>

                    <Td>
                      {' '}
                      {editMode && editId === item._id ? (
                        <Input
                          width={'100px'}
                          type="number"
                          size={'sm'}
                          value={editedValues.price}
                          borderColor={'#dc916e'}
                          focusBorderColor={'#dc916e'}
                          onChange={e =>
                            handleInputChange('price', e.target.value)
                          }
                        />
                      ) : (
                        <Box fontWeight={'bold'}>
                          Rs.{' '}
                          {updatedProduct && updatedProduct._id === item._id
                            ? updatedProduct.price
                            : item.price}
                        </Box>
                      )}
                    </Td>
                    <Td>
                      {editMode && editId === item._id ? (
                        <HStack>
                          <Box _hover={{ cursor: 'pointer !important' }}>
                            <FaTimes
                              color="red"
                              _hover={{ cursor: 'pointer' }}
                              onClick={handleCancel}
                            />
                          </Box>
                          <Box _hover={{ cursor: 'pointer ' }}>
                            <FaCheck color="green" onClick={handleSubmit} />
                          </Box>
                        </HStack>
                      ) : (
                        <HStack>
                          <Box _hover={{ cursor: 'pointer ' }}>
                            <FaEdit onClick={() => handleEdit(item._id)} />
                          </Box>
                        </HStack>
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>{' '}
        </Box>
      </Box>
    </Box>
  );
};

export default SetPricesScreen;
