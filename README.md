# ПЗ 5 — To-Do List (Прикладне програмування КН3)

Веб-додаток для керування списком справ: базовий сервер на **Express.js**,
шаблонізатор **Pug** (макет `layout.pug` з `block title`/`block content` та
дочірній шаблон `tasks.pug`), REST API з імітацією бази даних.

## Команди

```bash
npm install   # встановити залежності (express, pug)
node server.js
```

## Маршрути

| Метод  | Шлях               | Операція      | Код |
|--------|--------------------|---------------|-----|
| GET    | /api/tasks         | Read All      | 200 |
| POST   | /api/tasks         | Create        | 201 |
| PUT    | /api/tasks/:id     | Update Status | 200/404 |
| DELETE | /api/tasks/:id     | Delete        | 204 |
| GET    | /tasks             | сторінка (Pug) | 200 |

## Структура

- `server.js` — Express-сервер: `express.json()`, Pug, API та сторінки
- `views/layout.pug` — базовий макет (block title, block content)
- `views/tasks.pug` — список справ (each + if → «Виконано» закресленим)
