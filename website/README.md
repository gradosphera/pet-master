# Сайт документации PET-Мастер

Репозиторий проекта: [github.com/gradosphera/pet-master](https://github.com/gradosphera/pet-master).

**Тема оформления:** в шапке кнопка переключает светлую и тёмную (фон `#1e2337`, зелёные акценты). Выбор сохраняется в `localStorage` (`pet-master-theme`).

## Локальный просмотр (папка `website/` внутри репозитория)

Из **корня** репозитория:

```bash
python -m http.server 8080
```

Откройте: [http://localhost:8080/website/](http://localhost:8080/website/)

Скрипт `js/pet-paths.js` сам подставляет префикс `../` к файлам репозитория (Markdown, CSV, `models/`, `docs/`, `models.zip`).

## GitHub Pages

1. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. После push в ветку `main` запускается **Deploy GitHub Pages** (`.github/workflows/deploy-pages.yml`).
3. В корень публикации копируются: содержимое `website/`, все `*.md` из корня, `List_hardware_PET_Master.csv`, `models/`, `docs/`, при наличии — `files/`, а также **`models.zip`** (скрипт `scripts/zip-models.sh`).
4. Сайт: `https://gradosphera.github.io/pet-master/` (или `https://<org>.github.io/pet-master/` в зависимости от владельца).

Локально без подкаталога `/website/` пути **плоские** (`./README.md`, `./docs/...`) — так же работает опубликованная сборка.

## Фото процесса сборки (`files/img/Процесс сборки станка/`)

Сюда кладутся сюжетные **.webp** для страниц сайта (сборка, мастер-классы, работа станка). В HTML используется атрибут `data-pet-src` — URL подставляет `js/repo-links.js`.

## Превью 3D-деталей (`docs/img/`)

Таксономия совпадает с `models/`: **`docs/img/Основание/`**, **`docs/img/Электроника/`**, **`docs/img/Вал намотки/`**.

- Форматы: **`.jpg`** (основной), при отсутствии — **`.png`**.
- Имя файла обычно совпадает с моделью: расширение `.stl` / `.3mf` заменяется на `.jpg`. Для случаев вроде `…16 шт.stl` и `…16 шт..jpg` на странице перебираются варианты.
- В манифесте у категории поле **`imgFolder`** задаёт подкаталог в `docs/img/` (по умолчанию = `title`).
- У записи файла поле **`preview`**: имя файла в этой папке или полный путь `docs/img/…`.

## Архив моделей

```bash
bash scripts/zip-models.sh
```

Создаёт `models.zip` в корне репозитория (или путь первым аргументом). На GitHub Pages тот же архив кладётся в корень сайта; ссылка — на странице **3D-модели**.

## Обновление каталога STL

После добавления файлов в `models/` обновите `website/data/stl-manifest.json`.
