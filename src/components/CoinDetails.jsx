import { Text, Image, Box, Container, HStack, Radio, RadioGroup, VStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"

import {server} from '../index'
import Loader from "./Loader"
import ErrorComponent from "./ErrorComponent";
import CustomVar from "./CustomVar"

const CoinDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = (currency === "inr") ? "₹" : (currency === "eur") ? "€": "$";

  const params = useParams();
  useEffect(() => {
    const fetchCoin = async () => {
      try{
        const {data} = await axios.get(`${server}/coins/${params.id}`)
        setCoin(data)
        setLoading(false)
        console.log(data)
    }
    catch(error){
        setError(true)
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id]);

  if(error) return <ErrorComponent message="Error While Fetching Coin"/>

  return (
    <Container maxWidth={"xl"}>
      {
        loading ? <Loader/> : (
          <>


            <Box width={"full"} borderWidth={1}>
              {params.id}
            </Box>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value='inr'>INR (₹)</Radio>
                <Radio value='usd'>USD ($)</Radio>
                <Radio value='eur'>EUR (€)</Radio>
              </HStack>
            </RadioGroup>

            <VStack
              spacing={"4"}
              p={"16"}
              alignItems={"flex-start"}
              >
              <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
                Last Updated on {" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image 
                src={coin.image.large} 
                w={"16"}
                h={"16"}
                objectFit={"contain"} 
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow 
                      type={coin.market_data.price_change_percentage_24h > 0 ? "increase": "decrease"}
                    />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge 
                fontSize={"2x1"}
                bgColor={"blackAlpha.900"}
                color={"white"}
              >
                {`#${coin.market_cap_rank}`}
              </Badge>

              <CustomVar 
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />

              <Box w={"full"} p={"4"}>
                <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
                <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
                <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
              </Box>

            </VStack>
          </>
        )
      }
    </Container>
  )
}

const Item = ({title, value}) => {
  <>
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
      <Text>{value}</Text>
    </HStack>
  </>
}

export default CoinDetails;