import { Text, Image, Box, Container, HStack, Radio, RadioGroup, VStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Button } from '@chakra-ui/react'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"

import {server} from '../index'
import Loader from "./Loader"
import ErrorComponent from "./ErrorComponent";
import CustomVar from "./CustomVar"
import ItemStock from "./ItemStock"
import Chart from "./Chart"

const CoinDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coin, setCoin] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArr, setChartArr] = useState([]);

  const currencySymbol = (currency === "inr") ? "₹" : (currency === "eur") ? "€": "$";

  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try{

        //for chart
        const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setChartArr(chartData.prices)

        const {data} = await axios.get(`${server}/coins/${params.id}`)
        setCoin(data)
        setLoading(false)
    }
    catch(error){
        setError(true)
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id, currency, days]);

  if(error) return <ErrorComponent message="Error While Fetching Coin"/>

  return (
    <Container maxWidth={"container.xl"}>
      {
        loading ? <Loader/> : (
          <>


            <Box width={"full"} borderWidth={1}>
              <Chart currency={currency} days={days} arr={chartArr}/>
            </Box>

            <HStack padding={"4"} overflowX={"auto"}>
              {
                btns.map((i)=>(
                  <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
                ))
              }
            </HStack>

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
                <ItemStock title={"Max Supply"} value={coin.market_data.max_supply}/>
                <ItemStock title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
                <ItemStock title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
                <ItemStock title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
              </Box>

            </VStack>
          </>
        )
      }
    </Container>
  )
}



export default CoinDetails;