import React from "react";
import { ArrowDownUp } from "lucide-react";
import { formatCurrency } from "../utils/currency.js";
import DollarIcon from "./DollarIcon.jsx";

export default function ComparisonTable({
  rates,
  loading,
  sortBy,
  sortDirection,
  onSort,
  bestToBuy,
  bestToSell,
}) {
  return (
    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="section-heading table-heading">
        <div>
          <p className="eyebrow section-eyebrow">LADO A LADO</p>
          <h2 id="comparison-title">Compará en detalle</h2>
        </div>
        <span className="table-caption"><ArrowDownUp size={14} /> Cotizaciones comparables</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">TIPO DE DÓLAR</th>
              <th scope="col">
                <button className="sort-button" onClick={() => onSort("venta")}>
                  COMPRA A {sortBy === "venta" && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </button>
              </th>
              <th scope="col">
                <button className="sort-button" onClick={() => onSort("compra")}>
                  VENDE A {sortBy === "compra" && <span>{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </button>
              </th>
              <th scope="col">BRECHA</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.casa}>
                <th scope="row">
                  <DollarIcon casa={rate.casa} size={13} />
                  {rate.nombre}
                  <span className="table-badges">
                    {rate.casa === bestToBuy?.casa && (
                      <span className="table-badge">Mejor para comprar</span>
                    )}
                    {rate.casa === bestToSell?.casa && (
                      <span className="table-badge sell-badge">Mejor para vender</span>
                    )}
                  </span>
                </th>
                <td className="sale-price">{formatCurrency(Number(rate.venta))}</td>
                <td>{formatCurrency(Number(rate.compra))}</td>
                <td className="gap-price">
                  {formatCurrency(Number(rate.venta) - Number(rate.compra))}
                </td>
              </tr>
            ))}
            {loading && rates.length === 0 && (
              <tr><td className="empty-row" colSpan="4">Cargando cotizaciones...</td></tr>
            )}
            {!loading && rates.length === 0 && (
              <tr><td className="empty-row" colSpan="4">No hay cotizaciones comparables por el momento.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
