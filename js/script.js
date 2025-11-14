// ===== 시계 업데이트 =====
function updateClock() {
  const el = document.getElementById("clock");
  if (!el) return;

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  el.textContent = `${hours}:${minutes}`;
}

updateClock();
setInterval(updateClock, 30 * 1000);

// ===== 윈도우 열고 닫기 공통 =====
const windows = document.querySelectorAll(".window");
let zCounter = 10;

function openWindow(id) {
  const win = document.getElementById(`window-${id}`);
  if (!win) return;

  win.classList.add("is-open");
  zCounter += 1;
  win.style.zIndex = zCounter.toString();
}

function closeWindow(win) {
  win.classList.remove("is-open");
}

// data-window 속성이 있는 모든 요소가 트리거
const windowOpenTriggers = document.querySelectorAll("[data-window]");
windowOpenTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const target = trigger.getAttribute("data-window");
    openWindow(target);
  });
});

// 닫기 버튼
const closeButtons = document.querySelectorAll(".window-close");
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const win = btn.closest(".window");
    if (win) closeWindow(win);
  });
});

// 윈도우 클릭 시 맨 앞으로
windows.forEach((win) => {
  win.addEventListener("mousedown", () => {
    if (!win.classList.contains("is-open")) return;
    zCounter += 1;
    win.style.zIndex = zCounter.toString();
  });
});

// ESC 누르면 제일 위 윈도우 닫기
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const openWindows = Array.from(windows).filter((w) =>
    w.classList.contains("is-open")
  );
  if (!openWindows.length) return;

  openWindows.sort(
    (a, b) => parseInt(b.style.zIndex || "0") - parseInt(a.style.zIndex || "0")
  );
  closeWindow(openWindows[0]);
});

// ===== Projects – 폴더 클릭 시 내용 변경 =====
const projectData = {
  coduck: {
    title: "CoDuck",
    subtitle: "Innovación en Mantenimiento Web",
    body1:
      "CoDuck es una plataforma pensada para ofrecer soporte y mantenimiento continuo para sitios web pequeños y medianos.",
    body2:
      "Gestión de incidencias, cambios de contenido y mejoras de rendimiento sin contrato largo, todo con una tarifa mensual clara.",
    tags: "WORDPRESS | ELEMENTOR | PHP | JAVASCRIPT | STRIPE",
    preview: "CoDuck marketing site"
  },
  delirium: {
    title: "Delirium",
    subtitle: "Immersive Music Visualizer",
    body1:
      "Delirium es un experimento audiovisual que sincroniza música con escenas 3D generativas en WebGL.",
    body2:
      "Pensado como laboratorio para explorar shaders, postprocesado y experiencias de concierto virtual.",
    tags: "THREE.JS | WEBGL | GLSL | AUDIO API",
    preview: "Real-time WebGL visualizer"
  },
  ucm: {
    title: "UCM Portal",
    subtitle: "Academic Tools for Students",
    body1:
      "Dashboard ligero para centralizar notas, recursos y calendario de clases en una sola vista.",
    body2:
      "Diseñado para reducir la fricción diaria de los estudiantes y ofrecer acceso rápido a lo importante.",
    tags: "REACT | NODE | POSTGRES | AUTH",
    preview: "Student productivity hub"
  },
  madmusic: {
    title: "MadMusic",
    subtitle: "Micro-Site for an Indie Label",
    body1:
      "Landing page sencilla pensada para anunciar lanzamientos, playlists y conciertos de un sello independiente.",
    body2:
      "Equilibrio entre estética editorial y claridad para enlaces de streaming.",
    tags: "NEXT.JS | STYLED COMPONENTS",
    preview: "Indie label microsite"
  },
  hysteria: {
    title: "Hysteria",
    subtitle: "Narrative Web Experience",
    body1:
      "Pequeño site interactivo que mezcla texto, sonido y pequeños puzzles para contar una historia corta.",
    body2:
      "Inspirado en aventuras gráficas, con enfoque en tipografía y atmósfera.",
    tags: "VANILLA JS | AUDIO | STORYTELLING",
    preview: "Interactive fiction page"
  },
  deepdata: {
    title: "Deep Data",
    subtitle: "Analytics for Small Teams",
    body1:
      "Panel analítico compacto que muestra métricas clave sin abrumar al usuario.",
    body2:
      "Ideal como plantilla para futuros proyectos de monitorización de XR o simuladores.",
    tags: "REACT | CHARTS | API DESIGN",
    preview: "Minimal analytics dashboard"
  },
  pragma: {
    title: "Pragma",
    subtitle: "Developer Utilities Suite",
    body1:
      "Colección de pequeñas herramientas web que facilitan tareas repetitivas de desarrollo.",
    body2:
      "Formato de laboratorio personal para probar ideas rápidas y compartirlas.",
    tags: "TYPESCRIPT | TOOLING | UI LIBRARY",
    preview: "Dev tools playground"
  },
  superexpress: {
    title: "Super Express",
    subtitle: "Ultra-Fast Landing Template",
    body1:
      "Plantilla ligera enfocada en tiempos de carga mínimos y legibilidad máxima.",
    body2:
      "Pensada para campañas rápidas donde el rendimiento es crítico.",
    tags: "STATIC HTML | OPTIMIZATION",
    preview: "Performance-focused template"
  }
};

const folderItems = document.querySelectorAll(".folder-item");
const projectTitleEl = document.getElementById("project-title");
const projectSubtitleEl = document.getElementById("project-subtitle");
const projectBody1El = document.getElementById("project-body-1");
const projectBody2El = document.getElementById("project-body-2");
const projectTagsEl = document.getElementById("project-tags");
const projectPreviewLabelEl = document.getElementById("project-preview-label");

function setProject(key) {
  const data = projectData[key];
  if (!data) return;

  projectTitleEl.textContent = data.title;
  projectSubtitleEl.textContent = data.subtitle;
  projectBody1El.textContent = data.body1;
  projectBody2El.textContent = data.body2;
  projectTagsEl.textContent = data.tags;
  projectPreviewLabelEl.textContent = data.preview;
}

folderItems.forEach((item) => {
  item.addEventListener("click", () => {
    folderItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    const key = item.getAttribute("data-project");
    setProject(key);
  });
});

// 초기 상태
setProject("coduck");

// ===== Settings – 테마/모션/그리드 강도 =====
const themeToggle = document.getElementById("toggle-theme");
const motionToggle = document.getElementById("toggle-motion");
const gridRange = document.getElementById("grid-strength");

function applyPreferences() {
  const prefs = JSON.parse(localStorage.getItem("portfolioPrefs") || "{}");
  if (prefs.darkMode) {
    document.body.classList.add("theme-dark");
    if (themeToggle) themeToggle.checked = true;
  }
  if (prefs.reducedMotion) {
    document.body.classList.add("reduced-motion");
    if (motionToggle) motionToggle.checked = true;
  }
  if (typeof prefs.gridStrength === "number") {
    document.documentElement.style.setProperty(
      "--grid-opacity",
      (prefs.gridStrength / 100).toString()
    );
    if (gridRange) gridRange.value = String(prefs.gridStrength);
  }
}

function savePreferences() {
  const prefs = {
    darkMode: document.body.classList.contains("theme-dark"),
    reducedMotion: document.body.classList.contains("reduced-motion"),
    gridStrength: gridRange ? Number(gridRange.value) : 40
  };
  localStorage.setItem("portfolioPrefs", JSON.stringify(prefs));
}

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("theme-dark", themeToggle.checked);
    savePreferences();
  });
}

if (motionToggle) {
  motionToggle.addEventListener("change", () => {
    document.body.classList.toggle("reduced-motion", motionToggle.checked);
    savePreferences();
  });
}

if (gridRange) {
  gridRange.addEventListener("input", () => {
    document.documentElement.style.setProperty(
      "--grid-opacity",
      (gridRange.value / 100).toString()
    );
    savePreferences();
  });
}

// 첫 로드 시 적용
applyPreferences();
