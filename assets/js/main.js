const navToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.dataset.open !== "true";
    nav.dataset.open = String(open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.textContent = open ? "Close" : "Menu";
  });

  nav.addEventListener("click", () => {
    nav.dataset.open = "false";
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.textContent = "Menu";
  });
}

document.querySelectorAll("img").forEach((image) => {
  const markLoaded = () => image.closest(".photo-frame, .cover-frame")?.classList.remove("missing-image");
  const markMissing = () => {
    const frame = image.closest(".photo-frame, .cover-frame");
    if (!frame) return;
    frame.classList.add("missing-image");
    frame.dataset.missing = `Add ${image.getAttribute("src")}`;
    image.hidden = true;
  };

  if (image.complete) {
    image.naturalWidth ? markLoaded() : markMissing();
  } else {
    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", markMissing, { once: true });
  }
});

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal], .section-heading");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

requestAnimationFrame(() => document.querySelector(".hero")?.classList.add("hero-ready"));

// Email links: a mailto link does nothing for visitors without a mail app,
// so every email link also copies the address and says so.
let toastTimer;
const showToast = (message) => {
  let toast = document.querySelector(".site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "site-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4500);
};

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (fallbackError) {
      copied = false;
    }
    field.remove();
    return copied;
  }
};

const announceEmail = async (address) => {
  const copied = await copyText(address);
  showToast(copied ? `Email address copied: ${address}` : `Email: ${address}`);
};

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener("click", () => {
    announceEmail(decodeURIComponent(link.getAttribute("href").slice(7).split("?")[0]));
  });
});

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", () => announceEmail(button.dataset.copyEmail));
});

// Gallery zoom: click a photograph to view it full screen; click anywhere to close.
// Only galleries marked with data-zoom (the work project pages) get this.
const zoomGalleries = document.querySelectorAll("[data-zoom]");

if (zoomGalleries.length) {
  const zoomView = document.createElement("div");
  const zoomImage = document.createElement("img");
  let zoomSource = null;
  let zoomTimer;

  zoomView.className = "zoom-view";
  zoomView.hidden = true;
  zoomView.tabIndex = -1;
  zoomView.setAttribute("role", "dialog");
  zoomView.setAttribute("aria-modal", "true");
  zoomView.setAttribute("aria-label", "Enlarged photograph. Click anywhere or press Escape to close.");
  zoomView.append(zoomImage);
  document.body.append(zoomView);

  const closeZoom = () => {
    if (zoomView.hidden) return;
    zoomView.classList.remove("is-visible");
    document.documentElement.classList.remove("zoom-open");
    clearTimeout(zoomTimer);
    zoomTimer = setTimeout(() => {
      zoomView.hidden = true;
      zoomImage.removeAttribute("src");
    }, reducedMotion ? 0 : 180);
    zoomSource?.focus({ preventScroll: true });
  };

  const openZoom = (frame) => {
    const image = frame.querySelector("img");
    if (!image || !image.naturalWidth) return;
    clearTimeout(zoomTimer);
    zoomSource = frame;
    zoomImage.src = image.currentSrc || image.src;
    zoomImage.alt = image.alt;
    zoomView.hidden = false;
    document.documentElement.classList.add("zoom-open");
    requestAnimationFrame(() => zoomView.classList.add("is-visible"));
    zoomView.focus({ preventScroll: true });
  };

  zoomView.addEventListener("click", closeZoom);
  zoomView.addEventListener("keydown", (event) => {
    if (["Escape", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      closeZoom();
    }
  });

  zoomGalleries.forEach((gallery) => {
    gallery.classList.add("zoom-ready");
    gallery.querySelectorAll(".photo-frame").forEach((frame) => {
      frame.tabIndex = 0;
      frame.setAttribute("role", "button");
      frame.setAttribute("aria-label", `Enlarge: ${frame.querySelector("img")?.alt || "photograph"}`);
      frame.addEventListener("click", () => openZoom(frame));
      frame.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openZoom(frame);
        }
      });
    });
  });
}
