import {Avatar, Box, Button, HStack, Text, useToast} from '@chakra-ui/react'
export const UserProfile = (props) => {
    const navigate = useNavigate()
    const toast = useToast()
    const { name, image, email } = props
    function logOutHandler() {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('location')
        toast({
            title : `logged out`,
            status : 'success',
            isClosable : true,
            duration : 3000
        })
        setTimeout(() => {
            navigate(0)
        },1000)
    }

    return (
        <Box>
            <HStack spacing="3" ps="2">
                <Avatar name={name} src={image} boxSize="10" />
                <Box>
                    <Text fontWeight="medium" fontSize="md">
                        {name}
                    </Text>
                    <Text color="muted" fontSize="sm">
                        {email}
                    </Text>
                </Box>
            </HStack>
            <Box display={'flex'} justifyContent={'center'}>
                <Button onClick={logOutHandler} variant={'solid'} mt={'3'} px={'12'} colorScheme={'red'}>Logout</Button>
            </Box>

        </Box>

)
}



import * as React from 'react'
import {useNavigate} from "react-router-dom";
