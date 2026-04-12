(function () {
  var root = document.getElementById("stl-root");
  if (!root) return;

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  /** Пути к превью: docs/img/<папка таксономии>/<имя>.jpg | ..jpg | .png */
  function buildPreviewRelativeUrls(categoryFolder, modelFileName, explicitPreview) {
    if (explicitPreview) {
      if (explicitPreview.indexOf("/") >= 0) return [explicitPreview];
      return ["docs/img/" + categoryFolder + "/" + explicitPreview];
    }
    var without = modelFileName.replace(/\.(stl|3mf|STL|3MF)$/i, "");
    var base = "docs/img/" + categoryFolder + "/";
    var list = [];
    list.push(base + without + ".jpg");
    if (!without.endsWith(".")) list.push(base + without + "..jpg");
    list.push(base + without + ".png");
    return list;
  }

  function modelDownloadHref(repoPath) {
    if (!window.petPaths) {
      return "../" + repoPath.split("/").map(encodeURIComponent).join("/");
    }
    return petPaths.contentUrl(repoPath);
  }

  function thumbSrc(repoPath) {
    if (!window.petPaths) {
      return "../" + repoPath.split("/").map(encodeURIComponent).join("/");
    }
    return petPaths.contentUrl(repoPath);
  }

  function categoryImgFolder(cat) {
    return cat.imgFolder || cat.title;
  }

  function bindPreviewChains(container) {
    container.querySelectorAll("img.stl-thumb-img").forEach(function (img) {
      var raw = img.getAttribute("data-preview-srcs");
      if (!raw) return;
      var urls;
      try {
        urls = JSON.parse(decodeURIComponent(raw));
      } catch (e) {
        return;
      }
      if (!urls || !urls.length) return;
      var i = 0;
      img.addEventListener("error", function () {
        i += 1;
        if (i < urls.length) {
          img.src = urls[i];
        } else {
          img.remove();
        }
      });
    });
  }

  fetch("data/stl-manifest.json")
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (data) {
      var html = "";
      data.categories.forEach(function (cat) {
        var folder = categoryImgFolder(cat);
        html += '<section class="stl-group"><h2>' + escapeHtml(cat.title) + "</h2>";
        html += '<ul class="stl-list stl-list--grid">';
        cat.files.forEach(function (f) {
          var ext = f.name.split(".").pop().toLowerCase();
          var dl = modelDownloadHref(f.path);
          var rels = buildPreviewRelativeUrls(folder, f.name, f.preview);
          var urls = rels.map(function (rel) {
            return thumbSrc(rel);
          });
          var enc = encodeURIComponent(JSON.stringify(urls));
          var alt = "Изометрия: " + f.name;
          html += '<li class="stl-item">';
          html += '<div class="stl-item__thumb">';
          html +=
            '<img class="stl-thumb-img" src="' +
            escapeHtml(urls[0]) +
            '" data-preview-srcs="' +
            enc +
            '" alt="' +
            escapeHtml(alt) +
            '" loading="lazy" width="200" height="150" />';
          html +=
            '<span class="stl-item__thumb-fallback">Нет превью в <code>docs/img/' +
            escapeHtml(folder) +
            "/</code></span>";
          html += "</div>";
          html += '<div class="stl-item__body">';
          html += "<strong>" + escapeHtml(f.name) + "</strong>";
          html += ' <span class="badge">' + escapeHtml(ext) + "</span>";
          html += "</div>";
          html += '<a class="btn btn--primary stl-item__dl" download href="' + escapeHtml(dl) + '">Скачать</a>';
          html += "</li>";
        });
        html += "</ul></section>";
      });
      root.innerHTML = html;
      bindPreviewChains(root);
    })
    .catch(function () {
      root.innerHTML = '<p class="error-box">Не найден манифест моделей.</p>';
    });
})();
