import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <InputGroup
      size="md"
      width="200px"
      pos="absolute"
      right={'246px'}
      mt={35}
      borderRadius={'15px'}
      bg={'white'}
    >
      <Input placeholder="Search" />
      <InputRightElement pointerEvents="none">
        <FaSearch color="#A0AEC0" />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
