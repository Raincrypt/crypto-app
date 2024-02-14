import { Link } from "react-router-dom";
import { HStack, Button } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"} spacing={'2rem'}>
      <Button variant={"unstyled"} color={"white"} _hover={{ color: 'yellow' }}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"} _hover={{ color: 'yellow' }}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"} _hover={{ color: 'yellow' }}>
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  )
}

export default Header