import React from "react";
import { Moon, Sun } from "lucide-react";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="DolarComparador, inicio">
        <img className="brand-mark" src="/jaguar.png" alt="" />
        <span>Dolar<span className="brand-light">Comparador</span></span>
      </a>
      <div className="topbar-right">
        <span className="live-indicator"><span /> Cotizaciones en vivo</span>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
          title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
