import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../Features/productsListSlice';

const AddPetroleumStockScreen = () => {
  const dispatch = useDispatch();
  const { loading, products } = useSelector(store => store.productList);
  const navigate = useNavigate();
  const [productQuantities, setProductQuantities] = useState([]);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && products) {
      // Update productQuantities when products are available and loading ends
      setProductQuantities(
        products
          .filter(
            p =>
              p.name === 'Petrol' ||
              p.name === 'High Octane' ||
              p.name === 'Diesel'
          )
          .map(product => ({
            productId: product._id,
            name: product.name,
            newStock: 0,
          }))
      );
    }
  }, [loading, products]);

  const handleStockChange = (index, newStock) => {
    setProductQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        newStock: newStock,
      };
      return updatedQuantities;
    });
  };

  const handleAddStock = () => {
    const allQuantitiesZero = productQuantities.every(
      product => product.newStock === 0
    );

    if (allQuantitiesZero) {
      alert('Please increase the Stock quantity to proceed.');
    } else {
      navigate('/addStockConfirmation', { state: productQuantities });
    }
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
    >
      <Box padding={'24px'}>
        <HStack spacing={'800px'}>
          <Heading fontSize={'20px'} fontWeight={700} fontFamily={'lato'}>
            Add Stock
          </Heading>
        </HStack>

        <Table variant="striped" colorScheme="customColorScheme" mt={'20px'}>
          <Thead>
            <Tr>
              <Th color={'#A0AEC0'}>Name</Th>
              <Th color={'#A0AEC0'}>New Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr height="80px">
                <Td colSpan={2}>
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
              productQuantities.map((item, index) => (
                <Tr key={index} height={'80px'}>
                  <Td>
                    <Box fontWeight={'bold'}>{item.name}</Box>
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={item.newStock}
                      onChange={e =>
                        handleStockChange(index, parseInt(e.target.value) || 0)
                      }
                      w="60px"
                      textAlign="center"
                    />
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
        <Center>
          <Button
            bg={'#687EFF'}
            color={'white'}
            mt={'10px'}
            size={'lg'}
            _hover={'#4E67CC'}
            _active={'#4E67CC'}
            onClick={handleAddStock}
          >
            Add Stock
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default AddPetroleumStockScreen;
