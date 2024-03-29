import React from 'react';
import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    useBreakpointValue, Flex, useColorModeValue, Stack, Heading, Divider, useColorMode,
} from '@chakra-ui/react';
import {HamburgerIcon, MoonIcon, SunIcon} from '@chakra-ui/icons';
import {NavButton} from "./NavButton.jsx";
import {FiBarChart2, FiBookmark, FiCheckSquare, FiHome, FiUsers} from "react-icons/fi";
import {UserProfile} from "./UserProfile.jsx";
import { Link } from "react-router-dom";
import initialState from "../../store/store.js";

const Sidebar = () => {
    const {user} = initialState()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box position={'sticky'} top={2}>
            <Box maxW="2xl" mx="auto" px={{ base: '', sm: '8' }}>
                <Box mt={'4'} display="flex" alignItems="center">
                    {isMobile ? (
                        <Button
                            onClick={onOpen}
                            size="md"
                            fontSize="lg"
                            variant="ghost"
                            colorScheme="blue"
                            leftIcon={<HamburgerIcon />}
                        >
                        </Button>
                    ) :  <Flex as="section" bg="bg-canvas">
                        <Flex
                            flex="1"
                            bg="bg-surface"
                            maxW={{ base: 'full', sm: 'xs' }}
                            py={{ base: '6', sm: '8' }}
                            px={{ base: '4', sm: '6' }}
                        >
                            <Stack justify="space-between" spacing="2" width={'400px'}>
                                <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
                                    <Heading>JOBIFY</Heading>
                                    <Stack spacing="4">
                                        <Button onClick={toggleColorMode}>
                                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                                        </Button>
                                        <Link to={'/'}>
                                        <NavButton label="Home" icon={FiHome} />
                                        </Link>
                                        <Link to={'all-jobs'}>
                                        <NavButton label="All jobs" icon={FiBarChart2} aria-current="page" />
                                        </Link>
                                        <Link to={'add-job'}>
                                        <NavButton label="Add job" icon={FiCheckSquare} />
                                        </Link>
                                        <Link to={'profile'}>
                                        <NavButton label="Profile" icon={FiBookmark} />
                                        </Link>
                                    </Stack>
                                    <Divider />
                                    <UserProfile
                                        name={user.name}
                                        email={user.email}
                                    />
                                </Stack>
                            </Stack>
                        </Flex>
                    </Flex>}
                </Box>
            </Box>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Flex as="section" bg="bg-canvas">
                            <Flex
                                flex="1"
                                bg="bg-surface"
                                boxShadow={useColorModeValue('sm', 'sm-dark')}
                                maxW={{ base: 'full', sm: 'xs' }}
                                py={{ base: '6', sm: '8' }}
                                px={{ base: '4', sm: '6' }}
                            >
                                <Stack justify="space-between" spacing="1">
                                    <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
                                        <Heading>JOBIFY</Heading>
                                        <Stack spacing="4">
                                            <Button onClick={toggleColorMode}>
                                                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                                            </Button>
                                            <Link to={'/'}>
                                                <NavButton label="Home" icon={FiHome} />
                                            </Link>
                                            <Link to={'all-jobs'}>
                                                <NavButton label="All jobs" icon={FiBarChart2} aria-current="page" />
                                            </Link>
                                            <Link to={'add-job'}>
                                                <NavButton label="Add job" icon={FiCheckSquare} />
                                            </Link>
                                            <Link to={'profile'}>
                                                <NavButton label="Profile" icon={FiBookmark} />
                                            </Link>
                                        </Stack>
                                        <Divider />
                                        <UserProfile
                                            name={user.name}
                                            email={user.email}
                                        />
                                    </Stack>
                                </Stack>
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
