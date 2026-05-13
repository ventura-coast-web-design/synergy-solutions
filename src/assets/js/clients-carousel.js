(function () {
  var root = document.querySelector("[data-clients-carousel]");
  if (!root) return;

  var viewport = root.querySelector(".clients-carousel__viewport");
  var track = root.querySelector(".clients-carousel__track");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  if (!viewport || !track || !prevBtn || !nextBtn) return;

  var originals = Array.prototype.slice.call(track.querySelectorAll(".clients-carousel__slide"));
  var n = originals.length;
  if (n === 0) return;

  var MIN_SET_WIDTH = 48;
  var setWidth = 0;
  var correcting = false;
  var settleTimer = 0;

  function cloneSlide(slide) {
    var node = slide.cloneNode(true);
    node.setAttribute("aria-hidden", "true");
    node.classList.add("clients-carousel__slide--clone");
    return node;
  }

  var leadFrag = document.createDocumentFragment();
  originals.forEach(function (slide) {
    leadFrag.appendChild(cloneSlide(slide));
  });
  track.insertBefore(leadFrag, track.firstChild);

  originals.forEach(function (slide) {
    track.appendChild(cloneSlide(slide));
  });

  /**
   * One “page” of logos = middle originals block, measured on the track
   * (scrollLeft space from first original to just past last original).
   */
  function measureSetWidth() {
    var items = track.querySelectorAll(".clients-carousel__slide");
    if (items.length < 3 * n) return 0;
    var first = items[n];
    var last = items[2 * n - 1];
    return last.offsetLeft + last.offsetWidth - first.offsetLeft;
  }

  function slideStep() {
    var items = track.querySelectorAll(".clients-carousel__slide");
    var slide = items[n];
    if (!slide) return 0;
    var gapRaw = getComputedStyle(track).gap || getComputedStyle(track).columnGap;
    var gap = parseFloat(gapRaw) || 0;
    return slide.getBoundingClientRect().width + gap;
  }

  /** Instant steps avoid long smooth scrolls crossing clone bands mid-flight. */
  function scrollOpts() {
    return { behavior: "auto" };
  }

  /**
   * Only reposition when scroll has settled (not on every scroll tick).
   * Map scrollLeft into the middle originals band [setWidth, 2*setWidth).
   */
  function normalize() {
    if (correcting || setWidth < MIN_SET_WIDTH) return;

    var w = setWidth;
    var left = viewport.scrollLeft;
    var next = left;
    var guard = 0;

    while (next >= 2 * w && guard < 24) {
      next -= w;
      guard++;
    }
    guard = 0;
    while (next < w && guard < 24) {
      next += w;
      guard++;
    }

    if (Math.abs(next - left) < 1) return;

    correcting = true;
    viewport.scrollLeft = next;
    correcting = false;
  }

  function scheduleNormalize() {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(normalize, 140);
  }

  function scrollNext() {
    var step = slideStep();
    if (step <= 0) return;
    viewport.scrollBy({ left: step, ...scrollOpts() });
    scheduleNormalize();
  }

  function scrollPrev() {
    var step = slideStep();
    if (step <= 0) return;
    viewport.scrollBy({ left: -step, ...scrollOpts() });
    scheduleNormalize();
  }

  function remeasure() {
    var measured = measureSetWidth();
    if (measured < MIN_SET_WIDTH) {
      setWidth = 0;
      return;
    }
    setWidth = measured;
    if (!correcting) {
      normalize();
    }
  }

  viewport.addEventListener("scroll", scheduleNormalize, { passive: true });

  viewport.addEventListener(
    "scrollend",
    function () {
      clearTimeout(settleTimer);
      normalize();
    },
    { passive: true }
  );

  window.addEventListener("load", function () {
    remeasure();
  });
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      remeasure();
    }, 120);
  });

  function init() {
    remeasure();
    if (setWidth >= MIN_SET_WIDTH) {
      correcting = true;
      viewport.scrollLeft = setWidth;
      correcting = false;
    }
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(init);
  });

  prevBtn.addEventListener("click", scrollPrev);
  nextBtn.addEventListener("click", scrollNext);
})();
