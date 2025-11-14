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

// ===== Projects 폴더 데이터 =====
const projectData = {
  "Presidium-systems": {
    title: "Presidium-systems",
    subtitle: "XR/VR Staff Training Suite",
    body1:
      "산업용 장비 교육을 위한 XR·VR 시뮬레이터입니다. 유지보수 트러블슈팅, 프로시저 리허설, 원격 협업까지 지원하도록 설계했습니다.",
    body2:
      "Unity(C#) 기반으로 동작하며 OpenXR 파이프라인과 전용 CMS로 콘텐츠를 빠르게 갱신합니다. 실제 R&D 현장에서 운영 중입니다.",
    tags: "UNITY | OPENXR | XR UX | CMS",
    preview: "Presidium OS · XR Suite"
  },
  CodeCache: {
    title: "CodeCache",
    subtitle: "Snippet Knowledge Board",
    body1:
      "반복적으로 사용하는 코드와 디자인 토큰을 시각적으로 정리한 보드입니다. Drag & drop과 태그 검색으로 팀이 같은 레퍼런스를 공유할 수 있습니다.",
    body2:
      "Next.js + Supabase로 구현해 어디서든 브라우저만 있으면 접근할 수 있으며, WebXR 실험을 빠르게 문서화할 때 사용합니다.",
    tags: "NEXT.JS | SUPABASE | DESIGN SYSTEM",
    preview: "CodeCache Workspace"
  },
  "Octet-rule": {
    title: "Octet-rule Lab",
    subtitle: "Interactive Chemistry Sim",
    body1:
      "옥텟 규칙을 WebXR 상호작용으로 학습하는 실험실입니다. 원자를 올바르게 배치하면 결합이 형성되고 잘못된 조합은 즉시 피드백합니다.",
    body2:
      "교육용 태블릿과 HMD에서 동시에 동작하도록 설계했으며 튜토리얼과 반응형 UI를 포함합니다.",
    tags: "WEBXR | THREE.JS | EDUCATION",
    preview: "Octet Rule Playground"
  },
  "Email-Cleaner": {
    title: "Email Cleaner",
    subtitle: "Inbox Automation Flow",
    body1:
      "프로젝트 구독 메일과 유지보수 알림을 자동으로 분류해 주는 도구입니다. 특정 키워드/도메인을 감지하면 Notion DB로 정리합니다.",
    body2:
      "React + Firebase로 제작했으며 XR 장비 유지보수 알림을 깔끔하게 관리하는 데 쓰이고 있습니다.",
    tags: "REACT | FIREBASE | AUTOMATION",
    preview: "Inbox Detox Flow"
  },
  "Seat-Picker": {
    title: "Seat Picker",
    subtitle: "XR Lab Reservation",
    body1:
      "XR 실험실 좌석과 장비를 예약하는 인터페이스입니다. 접근성 패턴(키보드·스크린리더)을 반영해 누구나 쉽게 예약할 수 있습니다.",
    body2:
      "CSS Grid와 Vanilla JS로 구성돼 가볍게 동작하며 실제 스튜디오 방문객 예약 시스템에 적용했습니다.",
    tags: "ACCESSIBILITY | VANILLA JS | UX",
    preview: "Reservation Interface"
  },
  "Subscription D-Day": {
    title: "Subscription D-Day",
    subtitle: "License Timeline Tracker",
    body1:
      "Unity, Adobe, 서버 호스팅 등 구독 만료일을 타임라인으로 한눈에 볼 수 있는 보드입니다.",
    body2:
      "React Charts로 시각화했고 만료 7일 전 Slack 알림을 자동 발송합니다.",
    tags: "REACT | D3 | NOTIFICATION BOT",
    preview: "Billing Timeline Board"
  },
  "To-Do List": {
    title: "XR Ops To-Do",
    subtitle: "Daily Ops Checklist",
    body1:
      "XR 연구 장비 점검, 콘텐츠 업데이트, 미팅 준비 등을 태그 기반으로 정리한 체크리스트입니다.",
    body2:
      "PWA 형태로 만들어 모바일에서도 바로 사용 가능하며 오프라인 상태에서도 데이터가 보존됩니다.",
    tags: "PWA | LOCALFORAGE | TASK MANAGEMENT",
    preview: "Daily Ops Checklist"
  },
  superexpress: {
    title: "Super Express",
    subtitle: "Retro Landing Template",
    body1:
      "레트로 OS 감성의 랜딩 템플릿으로 빠른 로딩과 고정폭 타이포로 개인 작업을 돋보이게 합니다.",
    body2:
      "정적 HTML/CSS로 구성돼 배포가 간단하며 다국어 텍스트 스왑 기능을 포함합니다.",
    tags: "STATIC SITE | PERFORMANCE | MULTI-LANG",
    preview: "Retro Landing"
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
setProject("Presidium-systems");

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
