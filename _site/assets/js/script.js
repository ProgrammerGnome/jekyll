document.addEventListener("DOMContentLoaded", function () {

  /* ===== SMOOTH SCROLL BLOG → HOME ===== */
  if (
    typeof window.SITE_ROOT === "string" &&
    window.location.pathname !== window.SITE_ROOT
  ) {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  /* ===== NAV TOGGLE ===== */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }

  /* ===== PARTICLES ===== */
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
          enable: true,
          speed: 2
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" }
        }
      },
      retina_detect: true
    });
  }

  /* ==== SEARCH ==== */
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  let postsIndex = [];

  fetch(window.SEARCH_INDEX_URL)
    .then(response => response.json())
    .then(data => {
      postsIndex = data;
    })
    .catch(err => {
      console.error("Search index load failed", err);
    });

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      searchResults.innerHTML = "";

      if (query.length < 2) return;

      const results = postsIndex.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );

      results.forEach(post => {
        const li = document.createElement("li");
        li.className = "blog-item";
        li.innerHTML = `
          <h3 class="blog-title">
            <a href="${post.url}">${post.title}</a>
          </h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <small class="blog-date">Közzétéve: ${post.date}</small>
        `;
        searchResults.appendChild(li);
      });
    });
  }
});

/* ==== Scrolling ==== */
const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
