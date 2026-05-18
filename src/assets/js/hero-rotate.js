(function () {
  var root = document.querySelector("[data-hero-rotate]");
  if (!root) return;

  var photos = root.querySelectorAll("[data-hero-photo]");
  if (photos.length < 2) return;

  var nameEl = root.querySelector(".hero__cred-name");
  var line2El = root.querySelector(".hero__cred-line2");
  var line3El = root.querySelector(".hero__cred-line3");
  if (!nameEl || !line2El || !line3El) return;

  var profiles = [
    {
      name: "Jonathan Wisniewski",
      line2: "Founder and Principal Facilitator",
      line3: "Executive Coach",
    },
    {
      name: "Denisse Ypiña",
      line2: "Lead Facilitator",
      line3: "Leadership & Corporate Coach",
    },
    {
      name: "Alison Matthey",
      line2: "Facilitator",
      line3: "Leadership Coach",
    },
    {
      name: "Caryn Vincent",
      line2: "Facilitator",
      line3: "Talent Development",
    },
  ];

  var index = 0;

  function show(next) {
    index = next;
    var p = profiles[index];
    nameEl.textContent = p.name;
    line2El.textContent = p.line2;
    line3El.textContent = p.line3;

    photos.forEach(function (img, j) {
      var on = j === index;
      img.classList.toggle("hero__photo--active", on);
      img.setAttribute("aria-hidden", on ? "false" : "true");
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    show(0);
    return;
  }

  show(0);

  window.setInterval(function () {
    show((index + 1) % profiles.length);
  }, 5000);
})();
