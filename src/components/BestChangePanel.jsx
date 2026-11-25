import React from "react";
import { formatCurrency } from "../utils/currency.js";
import DollarIcon from "./DollarIcon.jsx";

function BestChangeOption({ rate, action, price }) {
  return (
    <article className="best-change-option">
      <span className="best-change-action">{action}</span>
      <div className="best-change-value">
        {rate ? <DollarIcon casa={rate.casa} size={19} /> : null}
        <strong>{rate?.nombre || "—"}</strong>
        <b>{rate ? formatCurrency(Number(rate[price])) : "—"}</b>
      </div>
    </article>
  );
}

export default function BestChangePanel({ bestToBuy, bestToSell }) {
  return (
    <section className="best-change" aria-labelledby="best-change-title">
      <div className="best-change-heading">
        <p className="eyebrow section-eyebrow">MEJOR CAMBIO</p>
        <h1 id="best-change-title">Mejores cotizaciones</h1>
      </div>
      <div className="best-change-options">
        <BestChangeOption rate={bestToBuy} action="Para comprar" price="venta" />
        <BestChangeOption rate={bestToSell} action="Para vender" price="compra" />
      </div>
    </section>
  );
}
