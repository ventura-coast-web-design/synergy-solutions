(function () {
  var section = document.querySelector(".services");
  if (!section) return;

  function reveal() {
    section.classList.add("is-visible");
  }

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    typeof IntersectionObserver === "undefined"
  ) {
    reveal();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.06,
      rootMargin: "0px 0px 12% 0px",
    }
  );

  observer.observe(section);
})();
