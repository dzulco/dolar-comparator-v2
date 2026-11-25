import React from "react";
import { ArrowDown, ArrowDownUp, ArrowRight, ArrowUp } from "lucide-react";
import { formatCurrency } from "../utils/currency.js";

export default function HighlightsPanel({ bestToBuy, bestToSell }) {
  return (
    <div className="highlights-panel">
      <div className="panel-heading">
        <span className="panel-icon highlight-icon"><ArrowDownUp size={19} /></span>
        <div>
          <p className="eyebrow section-eyebrow">A PRIMERA VISTA</p>
          <h2>Encontrá tu mejor cambio</h2>
        </div>
      </div>
      <div className="highlight-item">
        <span className="highlight-symbol buy-symbol"><ArrowDown size={17} /></span>
        <div className="highlight-copy">
          <span>El más barato para comprar</span>
          <strong>{bestToBuy ? bestToBuy.nombre : "—"}</strong>
        </div>
        <strong className="highlight-value">
          {bestToBuy ? formatCurrency(Number(bestToBuy.venta)) : "—"}
        </strong>
      </div>
      <div className="highlight-item">
        <span className="highlight-symbol sell-symbol"><ArrowUp size={17} /></span>
        <div className="highlight-copy">
          <span>El que más paga al vender</span>
          <strong>{bestToSell ? bestToSell.nombre : "—"}</strong>
        </div>
        <strong className="highlight-value">
          {bestToSell ? formatCurrency(Number(bestToSell.compra)) : "—"}
        </strong>
      </div>
      <div className="highlight-tip">
        <span>Dato útil</span>
        <p><b>Vende a</b> es lo que recibís al vender dólares. <b>Compra a</b> es lo que pagás para comprarlos.</p>
        <ArrowRight size={16} />
      </div>
    </div>
  );
}
