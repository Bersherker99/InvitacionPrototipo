const CONFIG = {
  quinceanera: "Nayeli Gutiérrez",
  textoBienvenida:
    "Con la bendición de Dios y el amor de mi familia, queremos invitarte a celebrar este día tan especial.",
  fechaEvento: "2026-04-11T16:00:00",

  mesEvento: "ABRIL",
  diaSemana: "SÁBADO",
  diaNumero: "11",
  fraseFecha: "“Este día quedará para siempre en mi corazón”",

  horaMisa: "15:00 hrs",
  lugarMisa: "Iglesia de Atocha",

  horaLugar: "16:00 hrs",
  nombreLugar: "Quinta / Salón de eventos",
  linkMapa: "https://maps.google.com",

  dressCode: "Formal elegante",

  fraseQuince:
    "“Hoy celebro no solo un cumpleaños, sino el comienzo de una nueva etapa llena de sueños, ilusiones y momentos inolvidables.”",

  telefonoWhatsApp: "593900000000"
};

const $ = (id) => document.getElementById(id);

function cargarDatos() {
  $("nombrePortada").textContent = CONFIG.quinceanera;
  $("nombrePrincipal").textContent = CONFIG.quinceanera;
  $("textoBienvenida").textContent = CONFIG.textoBienvenida;

  $("mesEvento").textContent = CONFIG.mesEvento;
  $("diaSemana").textContent = CONFIG.diaSemana;
  $("diaNumero").textContent = CONFIG.diaNumero;
  $("fraseFecha").textContent = CONFIG.fraseFecha;

  $("horaMisa").textContent = CONFIG.horaMisa;
  $("lugarMisa").textContent = CONFIG.lugarMisa;

  $("horaLugar").textContent = CONFIG.horaLugar;
  $("nombreLugar").textContent = CONFIG.nombreLugar;
  $("btnMapa").href = CONFIG.linkMapa;

  $("dressCode").textContent = CONFIG.dressCode;
  $("fraseQuince").textContent = CONFIG.fraseQuince;

  document.title = `Mis 15 - ${CONFIG.quinceanera}`;
}

function cargarInvitadoDesdeURL() {
  const params = new URLSearchParams(window.location.search);

  const nombre = params.get("nombre") || "Invitado Especial";
  const personas = params.get("personas") || "1";

  $("nombreInvitado").textContent = nombre;
  $("numeroPersonas").textContent =
    `${personas} ${Number(personas) === 1 ? "persona" : "personas"}`;

  const mensaje = `¡Hola! Confirmo mi asistencia a los 15 de ${CONFIG.quinceanera}. Somos ${nombre} (${personas} ${Number(personas) === 1 ? "persona" : "personas"}).`;

  $("btnConfirmar").href =
    `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
}

function abrirInvitacion() {
  const pantalla = $("pantalla-sobre");
  pantalla.style.transform = "translateY(-110%)";
  document.body.style.overflowY = "auto";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function iniciarContador() {
  const fechaObjetivo = new Date(CONFIG.fechaEvento).getTime();

  function actualizar() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
      $("dias").textContent = "00";
      $("horas").textContent = "00";
      $("minutos").textContent = "00";
      $("segundos").textContent = "00";
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    $("dias").textContent = String(dias).padStart(2, "0");
    $("horas").textContent = String(horas).padStart(2, "0");
    $("minutos").textContent = String(minutos).padStart(2, "0");
    $("segundos").textContent = String(segundos).padStart(2, "0");
  }

  actualizar();
  setInterval(actualizar, 1000);
}

function activarAnimacionesScroll() {
  const elementos = document.querySelectorAll(".reveal, .stagger-group");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.22
  });

  elementos.forEach((elemento) => observer.observe(elemento));
}

function activarScrollCinematic() {
  const secciones = document.querySelectorAll(".parallax-section");

  function actualizarParallax() {
    const viewportH = window.innerHeight;

    secciones.forEach((seccion) => {
      const rect = seccion.getBoundingClientRect();
      const centro = rect.top + rect.height / 2;
      const distanciaCentro = centro - viewportH / 2;

      const desplazamiento = distanciaCentro * -0.035;
      seccion.style.transform = `translateY(${desplazamiento}px)`;
    });
  }

  actualizarParallax();
  window.addEventListener("scroll", actualizarParallax, { passive: true });
  window.addEventListener("resize", actualizarParallax);
}

document.body.style.overflowY = "hidden";
$("btnAbrir").addEventListener("click", abrirInvitacion);

cargarDatos();
cargarInvitadoDesdeURL();
iniciarContador();
activarAnimacionesScroll();
activarScrollCinematic();