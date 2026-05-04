# ViajesMundo — Sitio Web de Turismo

**Alumno:** Condori Augusto René
**Año:** 2026  
**Institución:** UNJu 
**Materia:** Programación y Servicios Web

---

## De qué se trata

ViajesMundo es un sitio web de una agencia de turismo ficticia. Tiene 6 páginas:
la principal (Home), Destinos, Agencias, Precios, Blog y Contacto.

El objetivo era aplicar HTML5 semántico, CSS3 avanzado y JavaScript sin librerías externas. Aplicando conocimientos de la materia y de otras materias donde se vieron temas similares.

---

## Decisiones de diseño

Se uso variables css, para estandarizar las propiedades como colores, medidas, etc.

**Dark mode:** Implementado cambiando variables CSS desde JavaScript. No se reescriben
estilos, solo se pisan las variables en `body.dark-mode`. El sistema recuerda la preferencia
del usuario en localStorage.

**Tipografía:** Sacadas de Google Fonts. Inter para texto general y Playfair Display para
títulos.

**Header fijo con glassmorphism:** El encabezado usa `backdrop-filter: blur()` para crear
el efecto de vidrio esmerilado. Se queda visible mientras el usuario scrollea.

**Responsive:** Todo el sitio funciona en mobile y desktop. El menú hamburguesa en mobile
usa JavaScript mínimo, y los submenús se convierten en acordeones en lugar de desplegables
flotantes con hover como en la parte desktop, para evitar que se salgan de pantalla.

---

## Cosas técnicas destacables

Se trato de usar el minimo javascript sin dejar de darle una buena imagen con efectos, trancisiones y componentes tipicos de sitios, esto usando css con algunas propiedades y valores nuevos o que no conocia hasta el momento.

- **Filtros de destinos y blog sin JavaScript** — funcionan solo con CSS usando inputs
  radio ocultos y el selector `:checked ~ elemento`. Sin js extra.

- **Carrusel de testimonios CSS-only** — mismo mecanismo: radios ocultos mueven el
  track horizontalmente con `transform: translateX`.

- **Cards de agentes con efecto flip 3D** — usan `transform-style: preserve-3d` y
  `backface-visibility: hidden` en CSS puro. Al pasar el cursor se da vuelta la card.

- **Contadores animados** — arrancan cuando el elemento entra al viewport gracias al
  `IntersectionObserver` de JavaScript. Usan easing tipo `easeOutExpo`.

- **Scroll reveal** — los elementos aparecen con una animación suave al hacer scroll,
  también con `IntersectionObserver`.

- **Tabla de precios con tooltips CSS** — usando el atributo `data-tooltip` y el
  pseudo-elemento `::after` con `content: attr(data-tooltip)`.

Se considero hacer ciertos componentes o animaciones, como la animacion de entrada de los elementos al hacer scroll, o el carrusel de testimonios, con librerias, al igual que otras muchas cosas mas, pero se termino haciendo con solo lo visto en clase.
---

