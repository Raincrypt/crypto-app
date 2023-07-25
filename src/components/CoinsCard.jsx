import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const CoinsCard = ({id, name, image, price, symbol, currencySymbol = '₹'}) => {

    return (
        <Link to={`/coin/${id}`}>
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
                <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
                <Text noOfLines={1}>{name}</Text>
                <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : 'N.A'}</Text>
            </VStack>
        </Link>
    )
}

export default CoinsCard;