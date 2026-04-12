(function () {
  function apply(theme) {
    var root = document.documentElement;
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("pet-master-theme", theme === "dark" ? "dark" : "light");
    } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      var isDark = theme === "dark";
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
    }
  }

  function syncButton() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-pressed", isDark ? "true" : "false");
    btn.setAttribute("aria-label", isDark ? "Включить светлую тему" : "Включить тёмную тему");
  }

  function init() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    syncButton();
    btn.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      apply(dark ? "light" : "dark");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
