// 10-fs-sync.js
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');

// Определяем путь к папке и файлу
const dirPath = path.join(__dirname, 'temporary'); // Папка на уровне выше
const filePath = path.join(dirPath, 'fileA.txt');

// Проверяем, существует ли папка, и создаём её, если нет
if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

console.log('start');

// Записываем первую строку в файл fileA.txt (перезаписывая существующее содержимое)
writeFileSync(filePath, 'This is line 1\n');

// Добавляем вторую строку в fileA.txt
writeFileSync(filePath, 'This is line 2\n', { flag: 'a' });

// Добавляем третью строку в fileA.txt
writeFileSync(filePath, 'This is line 3\n', { flag: 'a' });

// Читаем содержимое файла и выводим его в консоль
const content = readFileSync(filePath, 'utf8');
console.log('File content:\n', content);

console.log('done with this task');
console.log('starting the next one');
