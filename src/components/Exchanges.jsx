import React, { useEffect, useState } from "react";
import axios from "axios";

import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";

import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent.jsx";
import ExchangeCard from "./ExchangeCard";
import SearchBar from "./SearchBar.jsx";
import { debounce } from "../lib/helper.js";

const Exchanges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exchanges, setExchanges] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  const searchFunction = async (e) => {
    setInput(e.target.value);
  };

  if (error) return <ErrorComponent message="Error While Fetching Exchanges" />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent="flex-start" border={"red"} p={"1rem"}>
            <SearchBar
              onKeyDown={debounce(searchFunction, 500)}
              placeholder="Search for an exchange"
            />
          </HStack>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges
              .filter((i) =>
                input === ""
                  ? i
                  : i.name.toLowerCase().includes(input.toLowerCase())
              )
              .map((i) => (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  url={i.url}
                  rank={i.trust_score_rank}
                />
              ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;
