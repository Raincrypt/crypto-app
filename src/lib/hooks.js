import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { server } from "../lib/constants.js";

export const useExchanges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [exchanges, setExchanges] = useState([]);

  const fetchExchanges = useMemo(
    () => async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log("renderring");
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchExchanges();
  }, [fetchExchanges]);

  return {
    exchanges,
    error,
    loading,
  };
};

export const useCoins = () => {
  const [coins, setCoins] = useState([]);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState(false);

  const fetchCoins = useMemo(
    () => async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets`);
        setCoins(data);
        setLoad(false);
      } catch (err) {
        setErr(true);
        setLoad(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  return {
    coins,
    err,
    load,
  };
};
