import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../Features/productsListSlice';

const SellProductScreen = () => {
  const { error, loading, products } = useSelector(store => store.productList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productQuantities, setProductQuantities] = useState(
    products &&
      products.map(product => ({
        productId: product._id,
        name: product.name,
        quantity: 0,
        price: product.price,
      }))
  );

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);
  useEffect(() => {
    if (products) {
      setProductQuantities(
        products
          .filter(
            item =>
              item.name !== 'Petrol' &&
              item.name !== 'High Octane' &&
              item.name !== 'Diesel'
          )
          .map(product => ({
            productId: product._id,
            name: product.name,
            quantity: 0,
            price: product.price,
          }))
      );
    }
  }, [products]);

  const handleQuantityChange = (index, newQuantity) => {
    setProductQuantities(prevQuantities => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = {
        ...updatedQuantities[index],
        quantity: newQuantity,
      };
      return updatedQuantities;
    });
  };
  const handleProceed = () => {
    const allQuantitiesZero = productQuantities.every(
      product => product.quantity === 0
    );

    if (allQuantitiesZero) {
      alert('Please increase the quantity to proceed.');
    } else {
      navigate('/confirmation', { state: productQuantities });
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
            Sell Product
          </Heading>
        </HStack>

        <Table variant="striped" colorScheme="customColorScheme" mt={'20px'}>
          <Thead>
            <Tr>
              <Th color={'#A0AEC0'}>Name</Th>
              <Th color={'#A0AEC0'} textAlign="center">
                Quantity
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {productQuantities.map((item, index) => (
              <Tr key={index} height={'80px'}>
                <Td>
                  <Box fontWeight={'bold'}>{item.name}</Box>
                </Td>
                <Td>
                  <HStack justifyContent="center">
                    <Button
                      bg={'#D3D3D3'}
                      onClick={() =>
                        handleQuantityChange(
                          index,
                          Math.max(item.quantity - 1, 0)
                        )
                      }
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={e =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value) || 0
                        )
                      }
                      w="60px"
                      textAlign="center"
                    />
                    <Button
                      bg={'#D3D3D3'}
                      onClick={() =>
                        handleQuantityChange(index, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
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
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default SellProductScreen;
