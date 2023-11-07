import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Center } from '@chakra-ui/react';
const Dashboard = () => {
  const { employeeInfo } = useSelector(store => store.employeeLogin);
  return (
    <Center>
      <Box
        fontSize={'30px'}
        ml={'130px'}
        fontWeight={'bold'}
        mt="100px"
        pos={'absolute'}
        color={'white'}
      >
        {employeeInfo && <Box>Welcome {employeeInfo.name}</Box>}
      </Box>
    </Center>
  );
};

export default Dashboard;
