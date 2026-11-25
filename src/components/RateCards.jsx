import React from "react";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import { NON_COMPARABLE_CASAS } from "../constants/market.js";
import { formatCurrency } from "../utils/currency.js";
import DollarIcon from "./DollarIcon.jsx";

export default function RateCards({ rates, bestToBuy, bestToSell, rateChanges, loading }) {
  return (
    <div className="rate-grid">
      {loading && rates.length === 0
        ? Array.from({ length: 4 }, (_, index) => (
            <div className="rate-card skeleton" key={index} />
          ))
        : rates.map((rate, index) => (
            <article
              className={`rate-card ${index === 0 ? "featured-card" : ""}`}
              key={rate.casa}
            >
              <div className="rate-card-top">
                <DollarIcon casa={rate.casa} />
                <span className="rate-name">{rate.nombre}</span>
                <div className="rate-badges">
                  {rate.casa === bestToBuy?.casa && (
                    <span className="best-tag">
                      <Check size={11} /> Mejor para comprar
                    </span>
                  )}
                  {rate.casa === bestToSell?.casa && (
                    <span className="best-tag sell-tag">
                      <Check size={11} /> Mejor para vender
                    </span>
                  )}
                  {NON_COMPARABLE_CASAS.has(rate.casa) && (
                    <span className="informative-tag">Informativo</span>
                  )}
                  {Object.prototype.hasOwnProperty.call(rateChanges, rate.casa)
                    && Number.isFinite(Number(rateChanges[rate.casa])) && (
                      <span className={`movement-tag ${Number(rateChanges[rate.casa]) === 0 ? "movement-equal" : Number(rateChanges[rate.casa]) > 0 ? "movement-up" : "movement-down"}`}>
                        {Number(rateChanges[rate.casa]) === 0
                          ? "="
                          : Number(rateChanges[rate.casa]) > 0
                            ? <><ArrowUp size={10} />+{Number(rateChanges[rate.casa]).toFixed(2)}%</>
                            : <><ArrowDown size={10} />{Number(rateChanges[rate.casa]).toFixed(2)}%</>}
                      </span>
                    )}
                </div>
              </div>
              <div className="rate-prices">
                <div className="price-column">
                  <span>VENDE A</span>
                  <strong>{formatCurrency(Number(rate.compra))}</strong>
                </div>
                <div className="price-divider" />
                <div className="price-column">
                  <span>COMPRA A</span>
                  <strong>{formatCurrency(Number(rate.venta))}</strong>
                </div>
              </div>
            </article>
          ))}
    </div>
  );
}
