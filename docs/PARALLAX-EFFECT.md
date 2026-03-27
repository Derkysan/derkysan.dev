# Efecto Parallax en la Web

## ¿Qué es el parallax?

El efecto parallax crea una ilusión de profundidad haciendo que distintos elementos se muevan a velocidades diferentes en respuesta al cursor del usuario (o al giroscopio en dispositivos móviles). Cuanto más "al fondo" se percibe un elemento, menos se desplaza; cuanto más "al frente", más se mueve.

La librería de referencia es [parallax.js](https://github.com/wagerfield/parallax), creada por Matthew Wagerfield. Donde no hay giroscopio disponible, usa la posición del cursor como input.

---

## Cómo funciona el motor

El movimiento de cada capa se calcula con esta fórmula en cada frame de animación:

```
offset = input_position × depth × scalar
```

Hay tres parámetros principales que controlan el efecto:

### `depth`
El multiplicador por capa. Va de `0.0` (sin movimiento) a `1.0` (movimiento máximo). Una capa con `depth="0.1"` apenas se mueve; una con `depth="0.8"` tiene un desplazamiento amplio.

### `scalar`
Amplifica cuánto se mueve todo. El valor por defecto es `10.0`. Aumentarlo produce un efecto más dramático; reducirlo lo hace más sutil.

### `friction`
Controla el easing (la inercia). El valor por defecto es `0.1`. A `1.0` las capas siguen el cursor de forma instantánea. Valores bajos (~`0.05`) dan una sensación más flotante y orgánica.

---

## Escena multi-capa con parallax.js

La librería trabaja con un elemento contenedor (`scene`) y sus hijos directos como capas independientes.

### Instalación

Via CDN:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
```

Via npm:
```bash
npm install parallax-js
```

### Estructura HTML

```html
<div id="scene">
  <div data-depth="0.1"><!-- Fondo: nubes, gradientes --></div>
  <div data-depth="0.4"><!-- Plano medio: montañas, elementos secundarios --></div>
  <div data-depth="0.8"><!-- Frente: personaje, CTA principal --></div>
</div>
```

Cada capa necesita obligatoriamente un atributo `data-depth`. El resto de opciones son opcionales.

### Inicialización en JavaScript

```javascript
const scene = document.getElementById('scene');
const parallax = new Parallax(scene, {
  scalarX: 10,
  scalarY: 10,
  frictionX: 0.1,
  frictionY: 0.1,
  hoverOnly: true,     // solo activa sobre el elemento, no toda la ventana
  relativeInput: true, // input relativo al scene, no al viewport
});
```

### Opciones de configuración

| Opción | Tipo | Default | Descripción |
|---|---|---|---|
| `scalarX` / `scalarY` | float | `10.0` | Amplificador del movimiento |
| `frictionX` / `frictionY` | float (0–1) | `0.1` | Inercia / easing del movimiento |
| `invertX` / `invertY` | boolean | `true` | Invierte la dirección del movimiento |
| `limitX` / `limitY` | int / false | `false` | Límite máximo de desplazamiento en px |
| `hoverOnly` | boolean | `false` | Solo activo mientras el cursor esté sobre el scene |
| `relativeInput` | boolean | `false` | Input relativo al scene en lugar de al viewport |
| `clipRelativeInput` | boolean | `false` | Recorta el input a los bordes del scene |
| `originX` / `originY` | float (0–1) | `0.5` | Origen del input (0.5 = centro) |

### Métodos disponibles en tiempo de ejecución

```javascript
parallax.enable();          // activa una instancia desactivada
parallax.disable();         // pausa el efecto
parallax.destroy();         // destruye la instancia completamente
parallax.friction(0.2, 0.2);
parallax.scalar(15, 15);
parallax.limit(false, 30);
parallax.invert(true, false);
parallax.origin(0.5, 0.5);
```

---

## Parallax en un solo elemento (sin librería)

Para aplicar el efecto a un único elemento flotante dentro de su contenedor padre, es más limpio implementarlo directamente en JS vanilla. La lógica es la misma: mapear la posición del cursor relativa al contenedor y aplicarla como `transform: translate()` con un lerp (interpolación lineal) para el easing.

### Implementación reutilizable

```javascript
function attachParallax(container, element, options = {}) {
  const {
    intensity = 20,   // máximo desplazamiento en px
    ease = 0.1,       // fricción: 0.05 lento-flotante, 0.2 rápido-preciso
    invert = false,   // true = el elemento "huye" del cursor
    rotate = false,   // inclinación 3D sutil
  } = options;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let raf;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function loop() {
    currentX = lerp(currentX, targetX, ease);
    currentY = lerp(currentY, targetY, ease);

    const rx = rotate ? currentY * 0.5 : 0;
    const ry = rotate ? -currentX * 0.5 : 0;

    element.style.transform =
      `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)
       rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

    raf = requestAnimationFrame(loop);
  }

  container.addEventListener('mousemove', e => {
    const r = container.getBoundingClientRect();
    // Normalizar posición del cursor a [-1, 1] desde el centro
    const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    const sign = invert ? -1 : 1;
    targetX = nx * intensity * sign;
    targetY = ny * intensity * sign;
  });

  container.addEventListener('mouseleave', () => {
    // Vuelve al centro suavemente al salir
    targetX = 0;
    targetY = 0;
  });

  loop();

  return () => cancelAnimationFrame(raf); // función de cleanup
}
```

### Uso

```javascript
const card = document.querySelector('.card');

const cleanup = attachParallax(card, card.querySelector('.floating-icon'), {
  intensity: 24,
  ease: 0.08,
  rotate: true,
});

// Para destruir el efecto:
// cleanup();
```

### CSS necesario

```css
.container {
  position: relative;
  perspective: 600px; /* necesario si se usa rotate: true */
}

.floating-element {
  will-change: transform;        /* eleva al GPU desde el inicio */
  transform-style: preserve-3d;  /* necesario para rotaciones 3D */
}
```

---

## Los tres parámetros clave del elemento flotante

### `intensity`
Cuántos píxeles se desplaza el elemento cuando el cursor está en el extremo del contenedor. Para elementos pequeños dentro de un card, valores entre **10–25px** se sienten naturales. Más de 40px parece errático salvo que el contenedor sea muy grande.

### `ease`
La fracción del camino que recorre el elemento cada frame (aplicado con `lerp`). A `0.1` tarda unos 20 frames en llegar (suave, orgánico). A `0.25` responde rápido pero con inercia. A `1.0` sigue al cursor sin ningún delay.

| Valor | Sensación |
|---|---|
| `0.04 – 0.07` | Muy flotante, casi líquido |
| `0.08 – 0.12` | Natural, orgánico (recomendado) |
| `0.15 – 0.25` | Rápido, responsivo |
| `> 0.4` | Casi instantáneo, poca inercia |

### `rotate`
La inclinación 3D es opcional pero refuerza la ilusión de profundidad. Requiere `perspective` en el contenedor para que se perciba correctamente.

---

## Buenas prácticas

**Rendimiento** — Usa siempre `will-change: transform` en los elementos que van a animarse. Esto le indica al navegador que los eleve a su propia capa de composición en la GPU, evitando repaints costosos.

**`hoverOnly: true`** — Recomendado para secciones embebidas en páginas largas. Sin esto, el parallax reacciona al cursor en cualquier punto del viewport, lo que puede sentirse invasivo o confuso.

**`relativeInput: true`** — Hace que el input sea relativo al `scene` en lugar de a la ventana completa. Ideal para secciones de hero o cards con parallax acotado.

**Accesibilidad** — Respeta la preferencia del usuario para reducir movimiento:

```css
@media (prefers-reduced-motion: reduce) {
  .floating-element {
    transition: none !important;
    animation: none !important;
    will-change: auto;
  }
}
```

```javascript
const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  attachParallax(container, element, { intensity: 20, ease: 0.1 });
}
```

**Profundidad coherente** — Asigna los `data-depth` de forma que haya diferencia visible entre capas. Valores muy próximos entre sí (p.ej. `0.3`, `0.32`, `0.35`) producen un efecto casi imperceptible.

---

## Referencias

- [Repositorio oficial parallax.js](https://github.com/wagerfield/parallax)
- [Demo oficial](https://matthew.wagerfield.com/parallax/)
- [parallax.js en cdnjs](https://cdnjs.com/libraries/parallax)
- [MDN: `requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [MDN: `will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
