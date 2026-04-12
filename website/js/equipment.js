(function () {
  var tbody = document.querySelector("#csv-table tbody");
  if (!tbody) return;

  function parseCsvLine(line) {
    var result = [];
    var cur = "";
    var inQ = false;
    for (var i = 0; i < line.length; i++) {
      var c = line[i];
      if (c === '"') {
        inQ = !inQ;
      } else if (c === "," && !inQ) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  var csvUrl =
    window.petPaths && petPaths.contentUrl
      ? petPaths.contentUrl("List_hardware_PET_Master.csv")
      : "../List_hardware_PET_Master.csv";

  fetch(csvUrl)
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(function (text) {
      var lines = text.trim().split(/\r?\n/);
      var rows = [];
      for (var i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        var p = parseCsvLine(lines[i]);
        if (p.length >= 2) rows.push(p);
      }
      tbody.innerHTML = rows
        .map(function (p) {
          return (
            "<tr><td>" +
            escapeHtml(p[0]) +
            "</td><td>" +
            escapeHtml(p[1] || "") +
            "</td></tr>"
          );
        })
        .join("");
    })
    .catch(function () {
      tbody.innerHTML =
        '<tr><td colspan="2">Таблица недоступна. Локально запустите сервер из корня репозитория или откройте опубликованный сайт (GitHub Actions).</td></tr>';
    });
})();
