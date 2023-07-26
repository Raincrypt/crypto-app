import { Badge, HStack, Progress, VStack, Text } from '@chakra-ui/react'
import React from 'react'

const CustomVar = ({high, low}) => {
  return (
    <VStack w={"full"}>
        <Progress value={50} colorScheme='teal' w={"full"}/>
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme='red'/>
            <Text>24 Hour Range</Text>
            <Badge children={high} colorScheme='green'/>
        </HStack>
    </VStack>
  )
}

export default CustomVar