(function () {
  var params = new URLSearchParams(window.location.search);
  var mdFile = params.get("md");
  var title = params.get("title") || (mdFile ? mdFile.replace(/\.md$/i, "") : "") || "Документ";
  var displayTitle = title.replace(/\.md$/i, "");
  var tabTitle = displayTitle + " — PET-Мастер";
  if (document.getElementById("doc-title")) {
    document.getElementById("doc-title").textContent = tabTitle;
  }
  document.title = tabTitle;
  var h = document.getElementById("doc-heading");
  if (h) h.textContent = displayTitle;

  if (!mdFile) {
    document.getElementById("doc-content").innerHTML =
      '<p class="error-box">Не указан файл. Вернитесь в <a href="docs.html">раздел документов</a>.</p>';
    return;
  }

  if (!window.petPaths) {
    document.getElementById("doc-content").innerHTML =
      '<p class="error-box">Не загружен pet-paths.js</p>';
    return;
  }

  var url = petPaths.contentUrl(mdFile);

  fetch(url)
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(function (text) {
      if (typeof marked !== "undefined" && marked.parse) {
        var raw = marked.parse(text);
        raw = petPaths.rewriteMarkdownAssets(raw);
        document.getElementById("doc-content").innerHTML = '<div class="prose">' + raw + "</div>";
      } else {
        document.getElementById("doc-content").textContent = text;
      }
    })
    .catch(function () {
      document.getElementById("doc-content").innerHTML =
        '<p class="error-box">Не удалось загрузить файл. Локально: сервер из корня репозитория, URL <code>/website/doc.html?md=…</code>. На GitHub Pages включите Actions (см. <code>website/README.md</code>).</p>';
    });
})();
