#!/usr/bin/env bash
# Архив каталога models/ для публикации на сайте (models.zip в корне сборки).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$ROOT/models.zip}"
mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
(cd "$ROOT" && zip -r -q "$OUT" models)
