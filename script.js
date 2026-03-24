const CONFIG = {
  quinceanera: "Nayeli Gutiérrez",
  textoBienvenida:
    "Con la bendición de Dios y el amor de mi familia, queremos invitarte a celebrar este día tan especial.",
  fechaEvento: "2026-04-11T14:45:00",

  mesEvento: "abril",
  diaNumero: "11",

  introFrase: "Hay momentos que se guardan para siempre en el corazón",

  tituloCeremonia: "Ceremonia religiosa",
  horaMisa: "14:45 hrs",
  lugarMisa: "Iglesia San José de Atocha",
  direccionMisa: "Calles: Mentor Mera & Himno nacional",
  linkMapaMisa: "https://maps.app.goo.gl/cSL7gBG3KUtMXvnN6?g_st=aw",

  horaLugar: "14:45 hrs",
  nombreLugar: "Quinta María Eliza",
  direccionLugar: "Calle: Destacamento Militar “Condor Mirador”",
  linkMapa: "https://maps.app.goo.gl/HjR1zyMvgGSVjATq5",

  dressCode: "Formal elegante",

  fraseQuince:
    "“Hoy celebro no solo un cumpleaños, sino el comienzo de una nueva etapa llena de sueños, ilusiones y momentos inolvidables.”",

  telefonoWhatsApp: "593983990003"
};

const $ = (id) => document.getElementById(id);

function cargarDatos() {
  $("nombrePortada").textContent = CONFIG.quinceanera;
  $("nombrePrincipal").textContent = CONFIG.quinceanera;
  $("textoBienvenida").textContent = CONFIG.textoBienvenida;

  $("introNombre").textContent = CONFIG.quinceanera;
  $("introFrase").textContent = CONFIG.introFrase;

  $("diaNumeroSimple").textContent = CONFIG.diaNumero;
  $("mesEventoSimple").textContent = CONFIG.mesEvento;

  $("tituloCeremonia").textContent = CONFIG.tituloCeremonia;
  $("horaMisa").textContent = CONFIG.horaMisa;
  $("lugarMisa").textContent = CONFIG.lugarMisa;
  $("direccionMisa").textContent = CONFIG.direccionMisa;
  $("btnMapaMisa").href = CONFIG.linkMapaMisa;

  $("horaLugar").textContent = CONFIG.horaLugar;
  $("nombreLugar").textContent = CONFIG.nombreLugar;
  $("direccionLugar").textContent = CONFIG.direccionLugar;
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

  $("floatInvitado").textContent = nombre;

  const mensaje =
    `¡Hola! Confirmo mi asistencia a los 15 de ${CONFIG.quinceanera}. ` +
    `Somos ${nombre} (${personas} ${Number(personas) === 1 ? "persona" : "personas"}).`;

  $("btnConfirmar").href =
    `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;
}

function reproducirMusicaSiSePuede() {
  const musica = $("musicaFondo");
  const btn = $("btnMusica");

  if (!musica || !btn) return;

  musica.play().then(() => {
    btn.classList.remove("oculto");
    btn.classList.add("visible");
    btn.classList.add("playing");
  }).catch(() => {});
}

function reproducirSonidoSobre() {
  const sonido = $("sonidoSobre");
  if (!sonido) return;

  sonido.currentTime = 0;
  sonido.play().catch(() => {});
}

function activarMusica() {
  const musica = $("musicaFondo");
  const btnMusica = $("btnMusica");

  if (!musica || !btnMusica) return;

  btnMusica.addEventListener("click", async () => {
    if (musica.paused) {
      try {
        await musica.play();
        btnMusica.classList.add("playing");
      } catch (error) {}
    } else {
      musica.pause();
      btnMusica.classList.remove("playing");
    }
  });
}

function cerrarIntro() {
  const intro = $("introCinematic");
  if (!intro || intro.classList.contains("hidden")) return;
  intro.classList.add("hidden");
}

function iniciarIntroCinematic() {
  const btnSaltar = $("btnSaltarIntro");
  if (btnSaltar) {
    btnSaltar.addEventListener("click", cerrarIntro);
  }

  setTimeout(cerrarIntro, 5200);
}

function abrirInvitacion() {
  const pantalla = $("pantalla-sobre");
  pantalla.classList.add("abriendo");

  reproducirSonidoSobre();
  reproducirMusicaSiSePuede();

  setTimeout(() => {
    pantalla.style.transform = "translateY(-110%)";
    pantalla.style.opacity = "0";
    document.body.style.overflowY = "auto";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 700);
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
  const elementos = document.querySelectorAll(".reveal, .stagger-group, .photo-full, .photo-final");

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

function activarPetalosInteractivos() {
  const petalos = document.querySelectorAll(".petal");

  function reaccionPetalos() {
    const scrollY = window.scrollY || window.pageYOffset;
    const intensidad = Math.min(scrollY * 0.02, 18);

    petalos.forEach((petalo, index) => {
      const offset = (index % 2 === 0) ? intensidad : -intensidad;
      petalo.style.marginLeft = `${offset}px`;
    });
  }

  reaccionPetalos();
  window.addEventListener("scroll", reaccionPetalos, { passive: true });
}

document.body.style.overflowY = "hidden";

$("btnAbrir").addEventListener("click", abrirInvitacion);

cargarDatos();
cargarInvitadoDesdeURL();
iniciarIntroCinematic();
iniciarContador();
activarAnimacionesScroll();
activarScrollCinematic();
activarPetalosInteractivos();
activarMusica();