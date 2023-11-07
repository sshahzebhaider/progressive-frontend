import React from 'react';
import { Box, Flex, Heading, Icon, useColorModeValue } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const NavItem = ({ to, icon, children, ...rest }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? '#3182ce' : 'transparent'}
        color={isActive ? 'white' : '#A0AEC0'}
        _hover={{
          color: isActive ? 'white' : '#1F2733',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={isActive ? 'white' : '#3182CE'}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default NavItem;
