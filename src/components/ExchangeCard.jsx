import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import React from 'react'

const ExchangeCard = ({id, name, image, url, rank}) => {
  return (
    <a href={url} target='_blank'>
        <VStack 
            w={"52"} 
            shadow={"lg"} 
            p={"8"} 
            borderRadius={"lg"} 
            transition={"all 0.3s"}
            css={
                {
                    "&:hover":{
                        transform: "scale(1.1)"
                    }
                }
            } 
        >
            <Image 
                src={image}
                alt="Exchange Image" 
                w={"10"} 
                h={"10"} 
                objectFit={"contain"}
            />
            <Heading size={"md"} noOfLines={1}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
  )
}

export default ExchangeCard;