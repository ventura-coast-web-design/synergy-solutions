(function () {
  var mdQuery = window.matchMedia("(min-width: 768px)");

  function navToggle(nav) {
    return nav.querySelector("button[aria-controls]");
  }

  function closeNav(nav) {
    var toggle = navToggle(nav);
    if (!toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    var otherOpen =
      document.querySelector(".nav-home.is-open, .nav-inner.is-open") !== null;
    if (!otherOpen) {
      document.body.classList.remove("site-nav-open");
    }
  }

  function openNav(nav) {
    document.querySelectorAll(".nav-home, .nav-inner").forEach(function (n) {
      if (n !== nav) {
        closeNav(n);
      }
    });
    var toggle = navToggle(nav);
    if (!toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("site-nav-open");
  }

  function closeAll() {
    document.querySelectorAll(".nav-home, .nav-inner").forEach(closeNav);
  }

  function setup(navSelector) {
    var nav = document.querySelector(navSelector);
    if (!nav) return;
    var toggle = navToggle(nav);
    if (!toggle) return;
    var panelId = toggle.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav(nav);
      } else {
        openNav(nav);
      }
    });

    panel.addEventListener("click", function (e) {
      if (e.target === panel) {
        closeNav(nav);
      }
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNav(nav);
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAll();
    }
  });

  window.addEventListener(
    "resize",
    function () {
      if (mdQuery.matches) {
        closeAll();
      }
    },
    { passive: true }
  );

  setup(".nav-home");
  setup(".nav-inner");
})();
