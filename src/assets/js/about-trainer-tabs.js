(function () {
  var root = document.querySelector("[data-about-tabs]");
  if (!root) return;

  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  var panels = tabs.map(function (tab) {
    var panelId = tab.getAttribute("aria-controls");
    return panelId ? document.getElementById(panelId) : null;
  });

  function selectTab(index) {
    tabs.forEach(function (tab, i) {
      var selected = i === index;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
      var panel = panels[i];
      if (!panel) return;
      if (selected) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "hidden");
      }
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectTab(index);
    });
  });

  var tablist = root.querySelector('[role="tablist"]');
  if (tablist) {
    tablist.addEventListener("keydown", function (e) {
      var currentIndex = tabs.indexOf(document.activeElement);
      if (currentIndex === -1) return;
      var nextIndex = currentIndex;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % tabs.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        e.preventDefault();
      } else if (e.key === "Home") {
        nextIndex = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        nextIndex = tabs.length - 1;
        e.preventDefault();
      }
      if (nextIndex !== currentIndex) {
        selectTab(nextIndex);
        tabs[nextIndex].focus();
      }
    });
  }
})();
