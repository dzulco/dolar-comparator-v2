import React, { useEffect, useState } from "react";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

const pageContent = {
  acerca: {
    title: "Acerca de DolarComparador",
    description: "Conocé cómo DolarComparador reúne y compara las cotizaciones del dólar en Argentina.",
    sections: [
      {
        heading: "Qué hacemos",
        paragraphs: [
          "DolarComparador reúne distintas cotizaciones del dólar en Argentina para que puedas consultarlas y compararlas en un mismo lugar, de forma simple y gratuita.",
          "La información se obtiene de servicios públicos de cotizaciones. No compramos ni vendemos moneda extranjera y no intervenimos en operaciones.",
        ],
      },
      {
        heading: "Nuestro objetivo",
        paragraphs: [
          "Buscamos que los valores de referencia sean fáciles de encontrar y comparar. Las cotizaciones pueden cambiar durante el día y variar según el proveedor o la entidad.",
        ],
      },
    ],
  },
  contacto: {
    title: "Contacto",
    description: "Contactá a DolarComparador para consultas, sugerencias o problemas con las cotizaciones.",
    sections: [
      {
        heading: "Escribinos",
        paragraphs: [
          "Si encontrás un problema, querés compartir una sugerencia o tenés una consulta sobre el sitio, podés escribirnos por correo electrónico.",
        ],
        email: "contacto@dolarcomparador.com.ar",
      },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    description: "Conocé cómo DolarComparador trata la navegación, el almacenamiento local y los servicios externos.",
    sections: [
      {
        heading: "Información y almacenamiento local",
        paragraphs: [
          "DolarComparador no solicita cuentas ni datos personales para consultar las cotizaciones. El sitio guarda en el almacenamiento local de tu navegador la preferencia de tema claro u oscuro.",
        ],
      },
      {
        heading: "Servicios externos",
        paragraphs: [
          "Para obtener las cotizaciones, tu navegador se conecta con DolarApi y CriptoYa. Al abrir enlaces externos, como Cafecito, se aplican las políticas del servicio correspondiente. Esos sitios pueden recibir datos técnicos habituales de una conexión web.",
        ],
      },
      {
        heading: "Cambios y consultas",
        paragraphs: [
          "Esta información puede actualizarse si cambia el funcionamiento del sitio. Si tenés preguntas sobre privacidad, escribinos desde la sección de contacto.",
        ],
      },
    ],
  },
  legales: {
    title: "Aviso legal",
    description: "Leé el aviso legal sobre las cotizaciones informativas y la calculadora de DolarComparador.",
    sections: [
      {
        heading: "Carácter informativo",
        paragraphs: [
          "Las cotizaciones publicadas son referencias obtenidas de proveedores externos. Pueden tener demoras, diferencias o errores y no necesariamente coinciden con el precio disponible al momento de una operación.",
          "La calculadora ofrece resultados estimados a partir de los valores mostrados; condiciones, comisiones e impuestos pueden variar según cada operación.",
        ],
      },
      {
        heading: "Sin asesoramiento ni operaciones",
        paragraphs: [
          "DolarComparador no realiza operaciones de cambio ni brinda asesoramiento financiero, legal o de inversión. Verificá los valores y condiciones con el proveedor correspondiente antes de tomar decisiones.",
        ],
      },
    ],
  },
  "origen-datos": {
    title: "Origen de los datos",
    description: "Consultá las fuentes públicas utilizadas por DolarComparador para mostrar las cotizaciones.",
    sections: [
      {
        heading: "Fuentes de cotizaciones",
        paragraphs: ["Consultamos los valores publicados por estas fuentes:"],
        links: [
          { label: "DolarApi", href: "https://dolarapi.com/" },
          { label: "CriptoYa", href: "https://criptoya.com/" },
        ],
      },
    ],
  },
};

export default function InfoPage({ page }) {
  const content = pageContent[page];
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    document.title = `${content.title} | DolarComparador`;
    const url = `https://dolarcomparador.com.ar/${page}`;

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", content.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${content.title} | DolarComparador`);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", content.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", url);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", `${content.title} | DolarComparador`);

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute("content", content.description);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#101712" : "#fbfcf9");
  }, [content.description, content.title, page, theme]);

  return (
    <main className="page-shell">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")}
      />
      <article className="info-page">
        <a className="info-back-link" href="/">← Volver a las cotizaciones</a>
        <p className="eyebrow section-eyebrow">DOLARCOMPARADOR</p>
        <h1>{content.title}</h1>
        <div className="info-page-content">
          {content.sections.map((section) => (
            <section className="info-page-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.email && <a href={`mailto:${section.email}`}>{section.email}</a>}
              {section.links && (
                <ul>
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  );
}
