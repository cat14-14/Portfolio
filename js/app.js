const clockElements = document.querySelectorAll("[data-clock]");
const openButtons = document.querySelectorAll("[data-open]");
const closeButtons = document.querySelectorAll("[data-close]");
const heroSection = document.getElementById("home");

const formatClock = () => {
  const now = new Date();
  let hour = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const period = hour < 12 ? "AM" : "PM";
  hour = hour % 12 === 0 ? 12 : hour % 12;
  const value = `${period} ${hour}:${minutes}`;
  clockElements.forEach((el) => {
    el.textContent = value;
  });
};

const scrollIntoView = (element) => {
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

const updateHash = (target) => {
  if (!target) return;
  history.replaceState(null, "", `#${target}`);
};

const clearHash = () => {
  history.replaceState(null, "", `${window.location.pathname}`);
};

const findWindow = (id) => document.querySelector(`.retro-window[data-window="${id}"]`);

const openWindow = (id, { scroll = true, updateLocation = true } = {}) => {
  const target = findWindow(id);
  if (!target) return false;
  if (!target.classList.contains("is-open")) {
    target.classList.add("is-open");
    target.setAttribute("aria-hidden", "false");
  }
  if (updateLocation) updateHash(id);
  if (scroll) scrollIntoView(target);
  return true;
};

const closeWindow = (id) => {
  const target = findWindow(id);
  if (!target) return;
  target.classList.remove("is-open");
  target.setAttribute("aria-hidden", "true");

  if (window.location.hash.replace("#", "") === id) {
    clearHash();
  }

  if (heroSection) {
    scrollIntoView(heroSection);
  }
};

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.open;
    if (!id) return;
    openWindow(id);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.close;
    if (!id) return;
    closeWindow(id);
  });
});

const handleHash = () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    openWindow(id, { updateLocation: false });
  }
};

window.addEventListener("hashchange", handleHash);

formatClock();
setInterval(formatClock, 10_000);

handleHash();
