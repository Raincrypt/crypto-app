import { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";

export const useExchanges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exchanges, setExchanges] = useState([]);

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

  return {
    exchanges,
    error,
    loading,
  };
};

export const useCoins = ({currency, page, load}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(load);
  const [error, setError] = useState(false);

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

  return {
    coins,
    error,
    loading,
  };
};
