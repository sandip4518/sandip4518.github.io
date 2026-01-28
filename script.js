// ================= THEME TOGGLE =================
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const icon = document.querySelector("#theme-toggle i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  initTypingEffect();        // ✅ looping typing
  initNavigation();
  initProjectFilters();
  initContactForm();
  initScrollAnimation();
  initSkillsAnimation();
});

// ================= LOOPING TYPING EFFECT =================
function initTypingEffect() {
  const h2 = document.querySelector(".hero-content h2");

  const texts = [
    "Data Analyst",
    "Web Developer",
    "BI Developer"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      h2.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 1200);
      }
    } else {
      h2.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? 50 : 80);
  }

  typeLoop();
}

// ================= NAVIGATION =================
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const header = document.querySelector("header");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ================= PROJECT FILTER =================
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;

      projectItems.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// ================= CONTACT FORM =================
function initContactForm() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    form.reset();
  });
}

// ================= SCROLL ANIMATION =================
function initScrollAnimation() {
  const elements = document.querySelectorAll(
    ".section-header, .about-content, .skill-item, .project-item, .contact-content"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ================= SKILLS BAR =================
function initSkillsAnimation() {
  const section = document.getElementById("skills");
  const bars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        bars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => (bar.style.width = width), 200);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}

// ================= DOWNLOAD CV =================
document.getElementById("download-cv").addEventListener("click", () => {
  window.open("/src/Sandip_Yedage_Resume.pdf", "_blank");
});
// ================= END OF SCRIPT =================