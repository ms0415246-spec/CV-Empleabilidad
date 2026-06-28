// ===============================
// MÉTODO ADEP - script.js
// ===============================

// Navbar cambia al hacer scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("navbar-scroll");
  } else {
    navbar.classList.remove("navbar-scroll");
  }
});


// Animaciones al aparecer
const elementos = document.querySelectorAll(
  ".seccion, .plan-card, .beneficio-card, .pilar-card, .modalidad-card"
);

const mostrarElemento = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("mostrar");
    }
  });
}, {
  threshold: 0.2
});

elementos.forEach(elemento => {
  mostrarElemento.observe(elemento);
});


// Contadores animados
const contadores = document.querySelectorAll(".estadisticas h3");

const animarContador = (contador) => {
  const textoOriginal = contador.innerText;
  const numeroObjetivo = parseInt(textoOriginal.replace(/\D/g, ""));

  if (isNaN(numeroObjetivo)) return;

  let numeroActual = 0;
  const incremento = numeroObjetivo / 80;

  const actualizar = () => {
    numeroActual += incremento;

    if (numeroActual < numeroObjetivo) {
      if (textoOriginal.includes("%")) {
        contador.innerText = Math.floor(numeroActual) + "%";
      } else if (textoOriginal.includes("+")) {
        contador.innerText = "+" + Math.floor(numeroActual);
      } else {
        contador.innerText = Math.floor(numeroActual);
      }

      requestAnimationFrame(actualizar);
    } else {
      contador.innerText = textoOriginal;
    }
  };

  actualizar();
};

const observerContador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      observerContador.unobserve(entry.target);
    }
  });
});

contadores.forEach(contador => {
  observerContador.observe(contador);
});


// Botón volver arriba
const botonArriba = document.createElement("button");

botonArriba.innerHTML = "↑";
botonArriba.className = "btn-arriba";

document.body.appendChild(botonArriba);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    botonArriba.classList.add("visible");
  } else {
    botonArriba.classList.remove("visible");
  }
});

botonArriba.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// Menú activo según la sección
const secciones = document.querySelectorAll("section[id]");
const enlaces = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let actual = "";

  secciones.forEach(seccion => {
    const top = seccion.offsetTop - 140;
    const alto = seccion.clientHeight;

    if (window.scrollY >= top && window.scrollY < top + alto) {
      actual = seccion.getAttribute("id");
    }
  });

  enlaces.forEach(link => {
    link.classList.remove("activo");

    if (link.getAttribute("href") === "#" + actual) {
      link.classList.add("activo");
    }
  });
});


// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(ancla => {
  ancla.addEventListener("click", function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute("href"));

    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

console.log("Página Método ADEP cargada correctamente.");