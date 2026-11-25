# DolarComparador

Aplicación web para comparar cotizaciones del dólar en Argentina. Los datos se obtienen directamente de [DolarApi](https://dolarapi.com/).

## Requisitos

- Node.js 18 o superior
- npm

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

La aplicación consulta `https://dolarapi.com/v1/dolares` al abrirse y actualiza las cotizaciones cada cinco minutos. También permite actualizarlas manualmente. DolarApi informa valores agregados por tipo de cambio, no precios individuales por banco o fintech.

## Estructura

- `src/components/`: tarjetas, calculadora, destacados y tabla comparativa.
- `src/hooks/`: carga y actualización periódica de cotizaciones.
- `src/services/`: integración y validación de respuestas de DolarApi.
- `src/constants/`: configuración de mercados y actualización.
- `src/utils/`: formato de importes y fechas.
