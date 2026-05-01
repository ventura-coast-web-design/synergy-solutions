(function () {
  var root = document.querySelector("[data-clients-carousel]");
  if (!root) return;

  var viewport = root.querySelector(".clients-carousel__viewport");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  if (!viewport || !prevBtn || !nextBtn) return;

  function slideStep() {
    var slide = viewport.querySelector(".clients-carousel__slide");
    if (!slide) return 0;
    var gap = parseFloat(getComputedStyle(viewport).gap) || 0;
    return slide.getBoundingClientRect().width + gap;
  }

  function scrollByDirection(dir) {
    viewport.scrollBy({ left: dir * slideStep(), behavior: "smooth" });
  }

  prevBtn.addEventListener("click", function () {
    scrollByDirection(-1);
  });
  nextBtn.addEventListener("click", function () {
    scrollByDirection(1);
  });
})();
