import React from "react";
import {
  Banknote,
  Bitcoin,
  Building2,
  ChartCandlestick,
  CircleDollarSign,
  CreditCard,
  Landmark,
} from "lucide-react";

const iconByCasa = {
  oficial: Landmark,
  blue: Banknote,
  bolsa: ChartCandlestick,
  contadoconliqui: Building2,
  cripto: Bitcoin,
  tarjeta: CreditCard,
  mayorista: Building2,
};

export default function DollarIcon({ casa, size = 15 }) {
  const Icon = iconByCasa[casa] || CircleDollarSign;
  return (
    <span className={`dollar-icon dollar-icon-${casa || "default"}`} aria-hidden="true">
      <Icon size={size} strokeWidth={1.8} />
    </span>
  );
}
