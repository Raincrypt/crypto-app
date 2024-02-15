import React, { useEffect, useState } from "react";
import axios from "axios";

import { server } from "../index";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";

import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent.jsx";
import CoinsCard from "./CoinsCard";
import SearchBar from "./SearchBar.jsx";
import { debounce } from "../lib/helper.js";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [input, setInput] = useState("");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const searchFunction = async (e) => {
    setInput(e.target.value);
  };

  if (error) return <ErrorComponent message="Error While Fetching Coins" />;

  return (
    <Container maxW={"container.xl"} justifyContent={"space-between"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent="space-between">
            <SearchBar placeholder="Search for coins" onKeyDown={debounce(searchFunction, 500)}/>
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value="inr">INR (₹)</Radio>
                <Radio value="usd">USD ($)</Radio>
                <Radio value="eur">EUR (€)</Radio>
              </HStack>
            </RadioGroup>
          </HStack>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.filter((i) =>
                input === ""
                  ? i
                  : i.name.toLowerCase().includes(input.toLowerCase())
              ).map((i) => (
              <CoinsCard
                id={i.id}
                key={i.id}
                name={i.name}
                image={i.image}
                price={i.current_price}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack width={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
