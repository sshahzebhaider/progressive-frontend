import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewStockList } from '../Features/newStockSlice';

const NewStockScreen = () => {
  const dispatch = useDispatch();
  const { loading, newStock } = useSelector(store => store.newStockAvailable);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getNewStockList());
  }, [dispatch]);

  const handleProductClick = (productsName, newStock) => {
    setSelectedProducts(
      productsName.map((name, index) => ({ name, quantity: newStock[index] }))
    );
    setIsModalOpen(true);
  };

  return (
    <Box>
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
          <Heading fontSize={'20px'} fontWeight={700} fontFamily={'lato'}>
            New Stock Available
          </Heading>

          <Table variant="striped" colorScheme="customColorScheme" mt={'20px'}>
            <Thead>
              <Tr>
                <Th color={'#A0AEC0'}>Employee Name</Th>
                <Th color={'#A0AEC0'} width={'185px'}>
                  Stock Added
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr height="80px">
                  <Td colSpan={2}>Loading...</Td>
                </Tr>
              ) : newStock ? (
                newStock.map((item, index) => (
                  <Tr key={index} height={'80px'} isOpen={isModalOpen}>
                    <Td fontWeight={'bold'}>{item.employeeName}</Td>
                    <Td
                      fontWeight={'bold'}
                      color="blue"
                      cursor="pointer"
                      onClick={() =>
                        handleProductClick(item.productsName, item.newStock)
                      }
                    >
                      {item.newStock.reduce((acc, curr) => acc + curr, 0)}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr height="80px">
                  <Td colSpan={2}>No data available</Td>
                </Tr>
              )}
            </Tbody>
          </Table>

          <Modal onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Detailed Products</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedProducts.length > 0 && (
                  <VStack align="start">
                    {selectedProducts.map((product, index) => (
                      <Box key={index} padding={'5px'}>
                        {product.name} - Stock Added: {product.quantity}
                      </Box>
                    ))}
                  </VStack>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default NewStockScreen;
