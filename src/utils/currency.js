const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});

export const numberFormatter = new Intl.NumberFormat("es-AR", {
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  return arsFormatter.format(value);
}

export function formatDate(value) {
  if (!value) return "Actualizando cotizaciones";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Última actualización disponible";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
