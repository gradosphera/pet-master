/**
 * Ссылки data-pet-root и изображения data-pet-src / source[data-pet-srcset]
 * — пути относительно корня репозитория (files/, docs/, …).
 */
(function () {
  function fix() {
    if (!window.petPaths) return;
    document.querySelectorAll("a[data-pet-root]").forEach(function (el) {
      var rel = el.getAttribute("data-pet-root");
      if (rel) el.setAttribute("href", petPaths.contentUrl(rel));
    });
    document.querySelectorAll("img[data-pet-src]").forEach(function (img) {
      var rel = img.getAttribute("data-pet-src");
      if (rel) {
        img.setAttribute("src", petPaths.contentUrl(rel));
        img.removeAttribute("data-pet-src");
      }
    });
    document.querySelectorAll("source[data-pet-srcset]").forEach(function (src) {
      var rel = src.getAttribute("data-pet-srcset");
      if (rel) {
        src.setAttribute("srcset", petPaths.contentUrl(rel));
        src.removeAttribute("data-pet-srcset");
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fix);
  else fix();
})();
