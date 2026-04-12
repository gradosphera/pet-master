(function () {
  try {
    if (localStorage.getItem("pet-master-theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (e) {}
})();

/**
 * Пути к файлам репозитория: локально из /website/ (../…) и плоский деплой GitHub Pages (./…).
 */
(function (global) {
  function encSegments(relPath) {
    return relPath
      .split("/")
      .filter(function (s) {
        return s.length;
      })
      .map(encodeURIComponent)
      .join("/");
  }

  function isNestedWebsite() {
    return /\/website\//.test(global.location.pathname);
  }

  function contentUrl(relPath) {
    relPath = String(relPath || "").replace(/^\/+/, "");
    if (!relPath) return global.location.href;
    var enc = encSegments(relPath);
    if (isNestedWebsite()) {
      return new global.URL("../" + enc, global.location.href).href;
    }
    return new global.URL("./" + enc, global.location.href).href;
  }

  /** База репозитория на GitHub Pages (/repo-name) или ''. */
  function repoBasePath() {
    var p = global.location.pathname;
    var i = p.indexOf("/website/");
    if (i >= 0) return p.slice(0, i) || "";
    var parts = p.split("/").filter(Boolean);
    if (!parts.length) return "";
    var last = parts[parts.length - 1];
    if (last.indexOf(".") !== -1) parts.pop();
    if (!parts.length) return "";
    return "/" + parts.join("/");
  }

  function rewriteMarkdownAssets(html) {
    if (!html) return html;
    return html.replace(/src="\/(files\/[^"]+)"/g, function (_, sub) {
      return 'src="' + contentUrl(sub) + '"';
    });
  }

  global.petPaths = {
    contentUrl: contentUrl,
    isNestedWebsite: isNestedWebsite,
    repoBasePath: repoBasePath,
    rewriteMarkdownAssets: rewriteMarkdownAssets,
  };
})(typeof window !== "undefined" ? window : this);
