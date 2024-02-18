import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup
} from "@chakra-ui/react";
import { server, totalPages } from "../lib/constants.js";

import { debounce } from "../lib/helper.js";
import CoinsCard from "./CoinsCard";
import ErrorComponent from "./ErrorComponent.jsx";
import Loader from "./Loader";
import PaginationButton from "./PaginationButton.jsx";
import SearchBar from "./SearchBar.jsx";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [input, setInput] = useState("");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  const fetchCoins = useMemo(
    () => async () => {
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
    },
    [currency, page]
  );

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const searchFunction = async (e) => {
    setInput(e.target.value);
  };

  if (error) return <ErrorComponent message="Error While Fetching Coins" />;

  return (
    <Container
      maxW={"container.xl"}
      justifyContent={"space-between"}
      minHeight={"100vh"}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent="space-between">
            <SearchBar
              placeholder="Search for coins"
              onKeyDown={debounce(searchFunction, 800)}
            />
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value="inr">INR (₹)</Radio>
                <Radio value="usd">USD ($)</Radio>
                <Radio value="eur">EUR (€)</Radio>
              </HStack>
            </RadioGroup>
          </HStack>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins
              .filter((i) =>
                input === ""
                  ? i
                  : i.name.toLowerCase().includes(input.toLowerCase())
              )
              .map((i) => (
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

          <HStack w={"100%"} p={"2"} justifyContent={"center"}>
            <HStack p={"8"} w={"fit-content"}>
              {page !== 1 && (
                <PaginationButton text="prev" onClick={prevPage} />
              )}

              {page > 2 && (
                <PaginationButton
                  text={page - 2}
                  onClick={() => {
                    setPage((prev) => prev - 2);
                  }}
                />
              )}
              {page > 1 && (
                <PaginationButton
                  text={page - 1}
                  onClick={() => {
                    setPage((prev) => prev - 1);
                  }}
                />
              )}

              {/* Current Page */}
              <Box
                paddingBlock={"2"}
                paddingInline={"4"}
                borderRadius="md"
                bgColor={"blackAlpha.500"}
                color={"yellow"}
              >
                {page}
              </Box>

              {page < totalPages - 1 && (
                <PaginationButton
                  text={page + 1}
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                />
              )}
              {page < totalPages - 2 && (
                <PaginationButton
                  text={page + 2}
                  onClick={() => {
                    setPage((prev) => prev + 2);
                  }}
                />
              )}

              {page !== totalPages && (
                <PaginationButton text="next" onClick={nextPage} />
              )}
            </HStack>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
