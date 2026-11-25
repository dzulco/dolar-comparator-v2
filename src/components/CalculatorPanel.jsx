import React from "react";
import { Calculator, ChevronDown } from "lucide-react";
import { NON_COMPARABLE_CASAS } from "../constants/market.js";
import { formatCurrency, numberFormatter } from "../utils/currency.js";

export default function CalculatorPanel({
  rates,
  selectedRate,
  selectedCasa,
  setSelectedCasa,
  amount,
  setAmount,
  operation,
  setOperation,
}) {
  const parsedAmount = Number(amount.replace(",", "."));
  const convertedAmount =
    selectedRate && Number.isFinite(parsedAmount) && parsedAmount >= 0
      ? operation === "buy"
        ? parsedAmount / selectedRate.venta
        : parsedAmount * selectedRate.compra
      : null;

  return (
    <div className="calculator-panel">
      <div className="panel-heading">
        <span className="panel-icon"><Calculator size={19} /></span>
        <div>
          <p className="eyebrow section-eyebrow">HACÉ TUS CUENTAS</p>
          <h2>Calculá tu cambio</h2>
        </div>
      </div>
      <p className="panel-description">
        Elegí una operación y calculá según la cotización disponible.
      </p>
      <div className="operation-switch" role="group" aria-label="Operación de cambio">
        <button
          type="button"
          className={operation === "buy" ? "operation-button active" : "operation-button"}
          aria-pressed={operation === "buy"}
          onClick={() => {
            setOperation("buy");
            setAmount("100000");
          }}
        >
          Comprar dólares
        </button>
        <button
          type="button"
          className={operation === "sell" ? "operation-button active" : "operation-button"}
          aria-pressed={operation === "sell"}
          onClick={() => {
            setOperation("sell");
            setAmount("100");
          }}
        >
          Vender dólares
        </button>
      </div>
      <div className="calculator-fields">
        <label className="field-label" htmlFor="amount">
          Tenés {operation === "buy" ? "pesos" : "dólares"}
        </label>
        <div className="input-wrap">
          <span className="input-prefix">{operation === "buy" ? "$" : "USD"}</span>
          <input
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-label={`Cantidad de ${operation === "buy" ? "pesos argentinos" : "dólares"}`}
          />
          <span className="input-currency">{operation === "buy" ? "ARS" : "USD"}</span>
        </div>
        <label className="field-label" htmlFor="tipo-dolar">Tipo de dólar</label>
        <div className="select-wrap">
          <select
            id="tipo-dolar"
            value={selectedCasa}
            onChange={(event) => setSelectedCasa(event.target.value)}
            disabled={!rates.length}
          >
            {rates.map((rate) => (
              <option value={rate.casa} key={rate.casa}>{rate.nombre}</option>
            ))}
          </select>
          <ChevronDown size={16} aria-hidden="true" />
        </div>
      </div>
      <div className="calculator-result">
        <div>
          <span>{operation === "buy" ? "Podés comprar" : "Recibís"}</span>
          <strong>
            {convertedAmount === null
              ? "—"
              : operation === "buy"
                ? `USD ${numberFormatter.format(convertedAmount)}`
                : formatCurrency(convertedAmount)}
          </strong>
        </div>
        <div className="result-rate">
          <span>{operation === "buy" ? "Compra a" : "Vende a"}</span>
          <strong>
            {selectedRate
              ? formatCurrency(
                  Number(operation === "buy" ? selectedRate.venta : selectedRate.compra),
                )
              : "—"}
          </strong>
        </div>
      </div>
      {selectedRate && NON_COMPARABLE_CASAS.has(selectedRate.casa) && (
        <p className="calculator-disclaimer">
          Cotización informativa, no incluida en la comparación.
        </p>
      )}
    </div>
  );
}
