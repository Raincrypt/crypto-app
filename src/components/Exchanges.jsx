import { Container, HStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { debounce } from "../lib/helper.js";
import { useExchanges } from "../lib/hooks.js";
import ErrorComponent from "./ErrorComponent.jsx";
import ExchangeCard from "./ExchangeCard";
import Loader from "./Loader";
import SearchBar from "./SearchBar.jsx";

const Exchanges = () => {
  const [input, setInput] = useState("");

  const {error, exchanges, loading} = useExchanges();

  const searchFunction = async (e) => {
    setInput(e.target.value);
  };

  if (error) return <ErrorComponent message="Error While Fetching Exchanges" />;

  return (
    <Container maxW={"container.xl"} minHeight={"100vh"} paddingBottom={"2rem"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent="flex-start" border={"red"} p={"1rem"}>
            <SearchBar
              onKeyDown={debounce(searchFunction, 800)}
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
