// ПЗ 5. To-Do List: Express.js + Pug
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// --- Налаштування Pug як шаблонізатора ---
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// ОБОВ'ЯЗКОВО: парсинг тіла POST/PUT-запитів у форматі JSON
app.use(express.json());

// --- Сховище даних (імітація бази даних) ---
let tasks = [
  { id: 1, title: 'Вивчити Express.js', completed: true },
  { id: 2, title: 'Створити шаблони у Pug', completed: false },
  { id: 3, title: 'Написати звіт', completed: false },
];
let nextId = 4;

// ================== API-маршрути ==================

// Read All
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Потрібне поле 'title'" });
  }
  const task = { id: nextId++, title, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// Update Status (toggle completed)
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ error: `Задачу з id=${id} не знайдено` });
  }
  task.completed = !task.completed;
  res.status(200).json(task);
});

// Delete
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === before) {
    return res.status(404).json({ error: `Задачу з id=${id} не знайдено` });
  }
  res.status(204).send();
});

// ================== сторінки UI ==================

// Список задач (шаблон на Pug)
app.get('/tasks', (req, res) => {
  res.render('tasks', { title: 'To-Do List', tasks });
});

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
