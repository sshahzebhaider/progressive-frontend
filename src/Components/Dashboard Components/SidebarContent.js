import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Icon,
  useColorModeValue,
  Image,
  Menu,
  MenuButton,
  HStack,
  MenuList,
  MenuItem,
  Divider,
  Heading,
} from '@chakra-ui/react';
import {
  FiSettings,
  FiBarChart2,
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiPlus,
  FiPlusSquare,
} from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { logout } from '../../Features/loginSlice';
import NavItem from './NavItem';
import { useNavigate, useLocation, useNavigation } from 'react-router-dom';
import {
  FaCartPlus,
  FaCheckCircle,
  FaDollarSign,
  FaGasPump,
  FaHome,
  FaMoneyBill,
  FaOilCan,
  FaPlusCircle,
  FaShoppingCart,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';
import Breadcrumb from './BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';

const LinkItems = [
  { name: 'Dashboard', icon: FaHome, to: '/dashboard', onlyAdmin: true },
  { name: 'Products', icon: FaShoppingCart, to: '/products', onlyAdmin: true },
  { name: 'Employees List', icon: FaUsers, to: '/employees', onlyAdmin: true },
  {
    name: 'Add New Employee',
    icon: FaUserPlus,
    to: '/addEmployee',
    onlyAdmin: true,
  },
  {
    name: 'Petroleum Products',
    icon: FaGasPump,
    to: '/petroleumProducts',
    onlyAdmin: true,
  },
  {
    name: 'Set Product Prices',
    icon: FaDollarSign,
    to: '/setPrices',
    onlyAdmin: true,
  },
  {
    name: 'Sold Products',
    icon: FaCheckCircle,
    to: '/soldProducts',
    onlyAdmin: true,
  },
  {
    name: 'New Stock',
    icon: FiPlus,
    to: '/newStockAdded',
    onlyAdmin: true,
  },
  {
    name: 'View Expenses',
    icon: FaMoneyBill,
    to: '/viewExpenses',
    onlyAdmin: true,
  },

  {
    name: 'Sell Product',
    icon: FaCartPlus,
    to: '/sellProduct',
    onlyEmployee: true,
  },
  {
    name: 'Sell Petroleum Product',
    icon: FaGasPump,
    to: '/sellPetroleumProduct',
    onlyEmployee: true,
  },
  {
    name: 'Add Stock',
    icon: FaPlusCircle,
    to: '/addStock',
    onlyEmployee: true,
  },
  {
    name: 'Add Petroleum Stock',
    icon: FaOilCan,
    to: '/addPetroleumstock',
    onlyEmployee: true,
  },
  {
    name: 'Add Expense',
    icon: FiPlusSquare,
    to: '/addExpense',
    onlyEmployee: true,
  },
];
const accountItems = [{ name: 'Profile', icon: FiUser, to: '/profile' }];

// ... (your imports remain unchanged)

const SidebarContent = () => {
  const location = useLocation();
  const loginPage = location.pathname === '/';

  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/');
  const [pageName, setPageName] = useState('Dashboard');
  const bgColor = useColorModeValue('white', 'gray.900');
  const { employeeInfo } = useSelector(store => store.employeeLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return loginPage ? null : (
    <>
      <Box>
        <Image
          src={require('../../assets/images/admin-background.png')}
          alt="logo"
          position={'absolute'}
          width="full"
          zIndex={'-1'}
        />
        <Box
          pos={'absolute'}
          border="2px solid white"
          _hover={{ cursor: 'pointer' }}
          right={'75px'}
          mt={'36px'}
        >
          <Menu>
            <MenuButton as={Box} p={'5px'}>
              <HStack color={'white'}>
                <Icon as={AiOutlineUser} />
                <Box>{employeeInfo && employeeInfo.name}</Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>My Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box
          transition="3s ease"
          bg={bgColor}
          border={'1px solid #E2E8F0'}
          borderRadius={'15px'}
          w={260}
          pos="fixed"
          h="672px"
          ml={'16px'}
          mt={'16px'}
          fontFamily={'lato'}
          fontWeight={700}
          fontSize={'15px'}
          boxShadow="2xl" // Add box shadow for a lifted look
        >
          <Flex
            h="20"
            alignItems="center"
            mx="14"
            borderRadius="8px"
            p="0"
          >
            <Box>
              <Heading fontSize="24px" color="#000000">
                Progressive International
              </Heading>
            </Box>
          </Flex>
          <Box mt={1}>
            {employeeInfo.isAdmin
              ? LinkItems.filter(item => item.both || item.onlyAdmin).map(
                  link => (
                    <NavItem
                      key={link.name}
                      icon={link.icon}
                      to={link.to}
                      onClick={() => {
                        setPageName(link.name);
                        setActiveLink(link.to);
                        navigate(link.to);
                      }}
                    >
                      {link.name}
                    </NavItem>
                  )
                )
              : LinkItems.filter(item => item.both || item.onlyEmployee).map(
                  link => (
                    <NavItem
                      key={link.name}
                      icon={link.icon}
                      to={link.to}
                      onClick={() => {
                        setPageName(link.name);
                        setActiveLink(link.to);
                        navigate(link.to);
                      }}
                    >
                      {link.name}
                    </NavItem>
                  )
                )}
            <Divider my={2} borderColor="gray.400" />
            {accountItems.map(link => (
              <NavItem
                key={link.name}
                icon={link.icon}
                to={link.to}
                onClick={() => {
                  setPageName(link.name);
                  setActiveLink(link.to);
                  navigate(link.to);
                }}
              >
                {link.name}
              </NavItem>
            ))}
          </Box>

          <Box>
            <Image
              src={require('../../assets/images/SidebarHelpImage.png')}
              alt="logo"
              width="100px"
              mt={'100px'}
              ml={'75px'}
            />
          </Box>
        </Box>
      </Box>
      <Box
        pos={'absolute'}
        mt={'35px'}
        ml={'316px'}
        fontFamily={'lato'}
        color={'white'}
        fontSize={'sm'}
      >
        {activeLink && (
          <div style={{ display: 'flex', alignItems: 'center', color: 'gray.500' }}>
            Pages /
            <Breadcrumb name={pageName} to={activeLink} />
          </div>
        )}
      </Box>
    </>
  );
};

export default SidebarContent;
