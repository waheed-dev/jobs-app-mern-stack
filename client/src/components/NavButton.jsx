import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import React from 'react'



export const NavButton = (props) => {
    const { icon, label } = props
    return (
        <Button variant="ghost" justifyContent="start">
            <HStack spacing="3">
                <Icon as={icon} boxSize="6" color="subtle" />
                <Text>{label}</Text>
            </HStack>
        </Button>
    )
}
