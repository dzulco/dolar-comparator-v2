import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <a className="brand footer-brand" href="/" aria-label="DolarComparador, inicio">
          <img className="brand-mark" src="/jaguar.png" alt="" />
          <span>Dolar<span className="brand-light">Comparador</span></span>
        </a>
        <a
          className="cafecito-link"
          href="https://cafecito.app/dolarcomparador"
          target="_blank"
          rel="noreferrer"
          aria-label="Invitame un Cafecito"
        >
          <span aria-hidden="true">♥</span>
          <span className="cafecito-label">Invitame un Cafecito</span>
        </a>
        <span className="footer-note">
          Hecho en Argentina <span className="argentina-flag" role="img" aria-label="Bandera argentina">
            <span />
          </span>
        </span>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DolarComparador. Todos los derechos reservados.</p>
        <nav className="footer-links" aria-label="Enlaces legales">
          <a href="/acerca">Acerca de</a>
          <a href="/contacto">Contacto</a>
          <a href="/privacidad">Privacidad</a>
          <a href="/legales">Legales</a>
          <a href="/origen-datos">Origen de los datos</a>
        </nav>
      </div>
    </footer>
  );
}
