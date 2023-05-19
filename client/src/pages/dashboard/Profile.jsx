import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    StackDivider,
    Text,
    useColorModeValue, useToast
} from "@chakra-ui/react";
import initialState from "../../../store/store.js";
import {useState} from "react";

const Profile = () => {
    const toast = useToast()
    const {isLoading, registerUser, token,alertStatus, user, showAlert, loginUser, alertText,updateUser,testUser} = initialState()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)
    console.log(testUser)
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (testUser) {
            return toast({
                title : 'test user is readOnly',
                duration : 3000,
                status  : 'error'
            })
        }

        if (!name || !email || !location) {
            return toast({
                title : 'provide all values',
                duration : 3000,
                status : 'error'
            })
        } else {
             updateUser({name,email,lastName,location}).then(() => {
                 return toast({
                     title : `user updated`,
                     duration : 3000,
                     status : `success`,
                 })
             })
        }

    }

    return (
        <Box py={{base: '8', md: '14'}} bg={''}>
            <Stack spacing="5" divider={<StackDivider/>}>
                <Stack
                    direction={{base: 'column', lg: 'column'}}
                    spacing={{base: '5', lg: '8'}}
                    justify="space-between"
                >
                    <Box textAlign={'center'}>
                        <Text fontSize="xl" fontWeight="medium">
                            Profile
                        </Text>
                    </Box>
                    <Box
                        bg="bg-surface"
                        boxShadow={useColorModeValue('sm', 'sm-dark')}
                        borderRadius="lg"
                        maxW={{lg: '3xl'}}
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing="5" px={{base: '4', md: '4'}} py={{base: '5', md: '6'}}>
                                <Stack spacing="6" direction={{base: 'column', md: 'row'}}>
                                    <FormControl id="firstName">
                                        <FormLabel>First Name</FormLabel>
                                        <Input value={name} name={'name'} type={'text'} onChange={(e) => setName(e.target.value)}/>
                                    </FormControl>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input value={lastName} name={'lastName'} type={'text'} onChange={(e) => setLastName(e.target.value)}/>
                                    </FormControl>
                                </Stack>
                                <FormControl id="email">
                                    <FormLabel>Email</FormLabel>
                                    <Input value={email} type={"email"} name={'email'} onChange={(e) => setEmail(e.target.value)}/>
                                </FormControl>
                                <Stack>
                                    <FormControl id="location">
                                        <FormLabel>Location</FormLabel>
                                        <Input value={location} type={'text'} name={'location'} onChange={(e) => setLocation(e.target.value)}/>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Divider/>
                            <Flex direction="row-reverse" py="4" px={{base: '4', md: '6'}}>
                                <Button type={'submit'} onClick={handleSubmit} colorScheme="green">Save
                                </Button>
                            </Flex>
                        </form>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}
export default Profile