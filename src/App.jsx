import React, { useEffect, useMemo, useState } from "react";
import CalculatorPanel from "./components/CalculatorPanel.jsx";
import BestChangePanel from "./components/BestChangePanel.jsx";
import ComparisonTable from "./components/ComparisonTable.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import RateCards from "./components/RateCards.jsx";
import { NON_COMPARABLE_CASAS } from "./constants/market.js";
import { useDollarRates } from "./hooks/useDollarRates.js";

function App() {
  const { rates, loading, error, refreshRates, rateChanges } = useDollarRates();
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [amount, setAmount] = useState("100000");
  const [operation, setOperation] = useState("buy");
  const [selectedCasa, setSelectedCasa] = useState("");
  const [sortBy, setSortBy] = useState("venta");
  const [sortDirection, setSortDirection] = useState("asc");

  const comparableRates = useMemo(
    () => rates.filter((rate) => !NON_COMPARABLE_CASAS.has(rate.casa)),
    [rates],
  );
  const selectedRate = rates.find((rate) => rate.casa === selectedCasa);
  const bestToBuy = useMemo(
    () => comparableRates.reduce(
      (best, rate) => (!best || rate.venta < best.venta ? rate : best),
      null,
    ),
    [comparableRates],
  );
  const bestToSell = useMemo(
    () => comparableRates.reduce(
      (best, rate) => (!best || rate.compra > best.compra ? rate : best),
      null,
    ),
    [comparableRates],
  );
  const sortedRates = useMemo(
    () => [...comparableRates].sort((a, b) => {
      const difference = Number(a[sortBy]) - Number(b[sortBy]);
      return sortDirection === "asc" ? difference : -difference;
    }),
    [comparableRates, sortBy, sortDirection],
  );

  useEffect(() => {
    if (rates.length > 0 && !rates.some((rate) => rate.casa === selectedCasa)) {
    setSelectedCasa(rates[0].casa);
    }
  }, [rates, selectedCasa]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#101712" : "#fbfcf9");
  }, [theme]);

  function changeSort(column) {
    if (sortBy === column) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDirection(column === "venta" ? "asc" : "desc");
    }
  }

  return (
    <main className="page-shell">
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} />

      {error && (
        <div className="error-banner" role="alert">
          <span>
            {rates.length
              ? "No se pudieron actualizar las cotizaciones. Se muestran los últimos valores disponibles."
              : "No se pudieron cargar las cotizaciones. Revisá tu conexión e intentá de nuevo."}
          </span>
          <button onClick={() => refreshRates()} className="retry-button">Reintentar</button>
        </div>
      )}

      <BestChangePanel bestToBuy={bestToBuy} bestToSell={bestToSell} />

      <section className="rates-section" aria-labelledby="rates-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow section-eyebrow">MERCADO CAMBIARIO</p>
            <h2 id="rates-title">Todas las cotizaciones</h2>
          </div>
        </div>
        <RateCards
          rates={rates}
          bestToBuy={bestToBuy}
          bestToSell={bestToSell}
          rateChanges={rateChanges}
          loading={loading}
        />
        {!loading && rates.length > 0 && (
          <p className="rates-footnote">
            Los valores pueden variar durante el día.
          </p>
        )}
      </section>

      <section className="tools-grid calculator-grid">
        <CalculatorPanel
          rates={rates}
          selectedRate={selectedRate}
          selectedCasa={selectedCasa}
          setSelectedCasa={setSelectedCasa}
          amount={amount}
          setAmount={setAmount}
          operation={operation}
          setOperation={setOperation}
        />
      </section>

      <ComparisonTable
        rates={sortedRates}
        loading={loading}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSort={changeSort}
        bestToBuy={bestToBuy}
        bestToSell={bestToSell}
      />
      <Footer />
    </main>
  );
}

export default App;
