import { useCallback, useEffect, useState } from "react";
import { RATE_REFRESH_INTERVAL } from "../constants/market.js";
import { fetchDollarData } from "../services/dolarApi.js";

export function useDollarRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastChecked, setLastChecked] = useState(null);
  const [rateChanges, setRateChanges] = useState({});

  const refreshRates = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    setError("");

    try {
      const { rates: nextRates, rateChanges: nextRateChanges } = await fetchDollarData();
      setRateChanges(nextRateChanges);
      setRates(nextRates);
      setLastChecked(new Date());
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudieron cargar las cotizaciones.",
      );
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshRates(true);
    const intervalId = window.setInterval(
      () => refreshRates(),
      RATE_REFRESH_INTERVAL,
    );
    return () => window.clearInterval(intervalId);
  }, [refreshRates]);

  return { rates, loading, error, lastChecked, rateChanges, refreshRates };
}
