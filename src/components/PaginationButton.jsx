import { Button } from "@chakra-ui/react";
import React from "react";
import { delay } from "../lib/constants";
import { throttle } from "../lib/helper";

const PaginationButton = ({ text, onClick }) => {
  return (
    <Button
      bgColor={"blackAlpha.900"}
      color={"white"}
      onClick={throttle(onClick, delay)}
    >
      {text}
    </Button>
  );
};

export default PaginationButton;
