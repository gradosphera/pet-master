(function () {
  var path = window.location.pathname || "";

  function link(href, label, matchers) {
    var active = matchers.some(function (m) {
      if (typeof m === "string") return path.indexOf(m) !== -1;
      return m.test(path);
    });
    return (
      '<a href="' +
      href +
      '"' +
      (active ? ' class="is-active"' : "") +
      ">" +
      label +
      "</a>"
    );
  }

  var logoSvg = '<img src="logo.svg" alt="PET‑Мастер" style="display:block;">';

  var themeBtn =
    '<button type="button" class="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Включить тёмную тему" title="Светлая / тёмная тема">' +
    '<svg class="theme-toggle__icon theme-toggle__icon--moon" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>' +
    "</svg>" +
    '<svg class="theme-toggle__icon theme-toggle__icon--sun" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="4.5" fill="currentColor"/>' +
    '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8l1.8-1.8M18 6l1.8-1.8"/>' +
    "</svg>" +
    "</button>";

  var html =
    '<header class="site-header">' +
    '<div class="site-header__inner">' +
    '<a class="logo" href="index.html">' +
    logoSvg +
    '<span class="logo__wordmark">PET-Мастер</span></a>' +
    '<div class="site-header__tools">' +
    '<nav class="nav" aria-label="Основное меню">' +
    link("index.html", "Главная", ["index.html", /\/website\/?$/]) +
    link("equipment.html", "Комплектующие", ["equipment.html"]) +
    link("models.html", "3D-модели", ["models.html"]) +
    link("docs.html", "Документы", ["docs.html", "doc.html"]) +
    '<a class="nav-external" href="https://github.com/gradosphera/pet-master" target="_blank" rel="noopener noreferrer">GitHub</a>' +
    "</nav>" +
    themeBtn +
    "</div>" +
    "</div>" +
    "</header>";

  var el = document.getElementById("site-nav");
  if (el) el.outerHTML = html;
})();
