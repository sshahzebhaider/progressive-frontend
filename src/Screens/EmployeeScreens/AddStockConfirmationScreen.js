import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellProducts } from '../../Features/productSellSlice';
import { ADD_NEW_STOCK_RESET } from '../../Features/addNewStockSlice';
import { addNewStock } from '../../Features/addNewStockSlice';
const AddStockConfirmationScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productQuantities = location.state.filter(
    product => product.newStock > 0
  );
  console.log(productQuantities);
  const { error, loading, success } = useSelector(store => store.newStockAdded);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleAddStock = () => {
    dispatch(addNewStock(productQuantities));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
        dispatch(ADD_NEW_STOCK_RESET());
        navigate('/addStock');
      }, 3000);

      setSuccessAlert(true);

      return () => clearTimeout(timer);
    }
  }, [success, navigate, dispatch]);

  return (
    <Box>
      <div className="alert-overlay">
        {successAlert && (
          <Alert ml="388px" status="success" className={'fade-in-slide-down'}>
            <AlertIcon />
            <AlertDescription>Stock Added</AlertDescription>
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
        fontFamily={'lato'}
      >
        <Center>
          <VStack>
            <Center>
              <Flex alignItems="center">
                <Box>
                  <Image
                    src={require('../../assets/images/logo1.png')}
                    alt="logo"
                    width="100px"
                    height="70px"
                    mt="20px"
                  />
                </Box>
                <Box mt={'10px'} fontFamily={'bitter'}>
                  Progressive Internationals
                </Box>
              </Flex>
            </Center>
            <Box
              border={'2px solid gray'}
              width={'700px'}
              borderRadius={'10px'}
            >
              <VStack align={'start'} padding={4}>
                {productQuantities.map(product => (
                  <Box
                    display="grid"
                    gridTemplateColumns="minmax(200px, 1fr) auto"
                    columnGap={300}
                    key={product.name}
                  >
                    <Box fontWeight="bold">{product.name}</Box>
                    <Box textAlign="right" fontWeight="bold">
                      New Stock: {product.newStock}
                    </Box>
                  </Box>
                ))}
                <Divider borderColor="gray.400" />
              </VStack>
            </Box>
            <HStack>
              <Button width={'140px'}>Cancel</Button>
              <Button
                _hover={'#4E67CC'}
                _active={'#4E67CC'}
                bg={'#4E67CC'}
                color={'white'}
                width={'140px'}
                onClick={handleAddStock}
                isLoading={loading}
              >
                Add
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
};

export default AddStockConfirmationScreen;
