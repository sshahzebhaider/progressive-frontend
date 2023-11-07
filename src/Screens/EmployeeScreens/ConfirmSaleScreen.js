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
import { PRODUCT_SELL_RESET } from '../../Features/productSellSlice';
const ConfirmSaleScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productQuantities = location.state.filter(
    product => product.quantity > 0
  );
  const { error, loading, success } = useSelector(store => store.sellProducts);
  const [successAlert, setSuccessAlert] = useState(false);
  const handleSell = () => {
    dispatch(sellProducts(productQuantities));
  };
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccessAlert(false);
        dispatch(PRODUCT_SELL_RESET());
        navigate('/sellProduct');
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
            <AlertDescription>Products Sold</AlertDescription>
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
              width={'650px'}
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
                      Rs. {product.price * product.quantity}
                    </Box>
                    <Box fontSize={14} color="gray">
                      Qty. {product.quantity}
                    </Box>
                  </Box>
                ))}
                <Divider borderColor="gray.400" />
                <HStack spacing={'400px'}>
                  <Box fontWeight={'600'}>Total Amount</Box>
                  <Box fontWeight="600">
                    Rs.{' '}
                    {productQuantities.reduce(
                      (acc, cur) => acc + cur.price * cur.quantity,
                      0
                    )}
                  </Box>
                </HStack>
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
                onClick={handleSell}
                isLoading={loading}
              >
                Sell
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </Box>
  );
};

export default ConfirmSaleScreen;
