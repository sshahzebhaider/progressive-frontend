import React from 'react';
import { Drawer, DrawerContent } from '@chakra-ui/react';
import SidebarContent from './SidebarContent';

const DrawerComponent = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size="full"
    >
      <DrawerContent>
        <SidebarContent onClose={onClose} />
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
