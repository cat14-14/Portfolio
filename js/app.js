const clockElements = document.querySelectorAll("[data-clock]");
const openButtons = document.querySelectorAll("[data-window-target]");
const closeButtons = document.querySelectorAll("[data-window-close]");
const windowLayer = document.querySelector("[data-window-layer]");
const panels = document.querySelectorAll(".window-panel");

const setClock = () => {
  const now = new Date();
  let hour = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const period = hour < 12 ? "AM" : "PM";
  hour = hour % 12 === 0 ? 12 : hour % 12;
  const value = `${period} ${hour}:${minutes}`;
  clockElements.forEach((el) => (el.textContent = value));
};

const updateLayerState = () => {
  if (!windowLayer) return;
  const hasOpen = document.querySelector(".window-panel.is-open");
  windowLayer.classList.toggle("is-active", Boolean(hasOpen));
};

const showPanel = (id) => {
  const panel = document.querySelector(`.window-panel[data-window="${id}"]`);
  if (!panel) return;

  panels.forEach((item) => {
    if (item !== panel) {
      item.classList.remove("is-open");
      item.setAttribute("aria-hidden", "true");
    }
  });

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  updateLayerState();

  if (typeof panel.focus === "function") {
    try {
      panel.focus({ preventScroll: true });
    } catch {
      panel.focus();
    }
  }

  history.replaceState(null, "", `#${id}`);
};

const closePanel = (id) => {
  if (id === "all") {
    panels.forEach((panel) => {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
    });
  } else {
    const panel = document.querySelector(`.window-panel[data-window="${id}"]`);
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  }

  updateLayerState();
  history.replaceState(null, "", window.location.pathname);
};

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.windowTarget;
    if (!id) return;
    showPanel(id);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.windowClose;
    if (!id) return;
    closePanel(id);
  });
});

const overlay = document.querySelector(".window-overlay");
overlay?.addEventListener("click", () => closePanel("all"));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanel("all");
  }
});

const openHashPanel = () => {
  const id = window.location.hash.replace("#", "");
  if (!id) return;
  showPanel(id);
};

window.addEventListener("hashchange", openHashPanel);

setClock();
setInterval(setClock, 10_000);
openHashPanel();
