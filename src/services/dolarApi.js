const DOLAR_API_URL = "https://dolarapi.com/v1/dolares";
const CRIPTOYA_URL = "https://criptoya.com/api";
const MEP_COMMISSION = 0.01;

async function fetchJson(url, sourceName) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`${sourceName} respondió con el estado ${response.status}.`);
  }
  return response.json();
}

async function fetchDolarApiRate(casa) {
  const rate = await fetchJson(`${DOLAR_API_URL}/${casa}`, "DolarApi");
  if (
    !rate ||
    typeof rate !== "object" ||
    !Number.isFinite(Number(rate.compra)) ||
    !Number.isFinite(Number(rate.venta))
  ) {
    throw new Error(`DolarApi devolvió datos inválidos para ${casa}.`);
  }
  return rate;
}

export async function fetchDollarData() {
  const [oficial, mep, ccl, tarjeta, criptoYa, daiArs, daiUsd] = await Promise.all([
    fetchDolarApiRate("oficial"),
    fetchDolarApiRate("bolsa"),
    fetchDolarApiRate("contadoconliqui"),
    fetchDolarApiRate("tarjeta"),
    fetchJson(`${CRIPTOYA_URL}/dolar`, "CriptoYa"),
    fetchJson(`${CRIPTOYA_URL}/decrypto/dai/ars`, "CriptoYa"),
    fetchJson(`${CRIPTOYA_URL}/decrypto/dai/usd`, "CriptoYa"),
  ]);

  if (
    !Number.isFinite(Number(criptoYa?.blue?.bid)) ||
    !Number.isFinite(Number(criptoYa?.blue?.ask)) ||
    !Number.isFinite(Number(daiArs?.bid)) ||
    !Number.isFinite(Number(daiArs?.ask)) ||
    !Number.isFinite(Number(daiUsd?.bid)) ||
    !Number.isFinite(Number(daiUsd?.ask))
  ) {
    throw new Error("CriptoYa devolvió datos inválidos para Blue o Cripto.");
  }

  const mepCompra = Number(mep.compra) * (1 - MEP_COMMISSION);
  const mepVenta = Number(mep.venta) * (1 + MEP_COMMISSION);
  const criptoCompra = Number(daiArs.bid) / Number(daiUsd.ask);
  const criptoVenta = Number(daiArs.ask) / Number(daiUsd.bid);

  const rates = [
    { ...oficial, nombre: "Oficial" },
    {
      casa: "blue",
      nombre: "Blue",
      compra: Number(criptoYa.blue.bid),
      venta: Number(criptoYa.blue.ask),
    },
    { ...mep, casa: "bolsa", nombre: "MEP", compra: mepCompra, venta: mepVenta },
    { ...ccl, casa: "contadoconliqui", nombre: "CCL" },
    { casa: "cripto", nombre: "Cripto", compra: criptoCompra, venta: criptoVenta },
    { ...tarjeta, nombre: "Tarjeta" },
  ];

  const variations = {
    oficial: criptoYa?.oficial?.variation,
    blue: criptoYa?.blue?.variation,
    bolsa: criptoYa?.mep?.al30?.ci?.variation,
    contadoconliqui: criptoYa?.ccl?.al30?.ci?.variation,
    cripto: criptoYa?.cripto?.usdt?.variation,
    tarjeta: criptoYa?.tarjeta?.variation,
  };

  const rateChanges = {};
  Object.entries(variations).forEach(([casa, variation]) => {
    if (variation === null || variation === undefined || variation === "") return;
    if (!Number.isFinite(Number(variation))) {
      throw new Error(`CriptoYa devolvió una variación inválida para ${casa}.`);
    }
    rateChanges[casa] = Number(variation);
  });

  return { rates, rateChanges };
}
