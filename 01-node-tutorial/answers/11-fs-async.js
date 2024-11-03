const { writeFile, existsSync, mkdirSync } = require("fs");
const path = require("path");

console.log("at start");

// Определяем путь к папке и файлу
const dirPath = path.join(__dirname, "temporary");
const filePath = path.join(dirPath, "fileB.txt");

// Проверяем, существует ли папка, и создаём её, если нет
if (!existsSync(dirPath)) {
  mkdirSync(dirPath, { recursive: true });
}

// Записываем первую строку в fileB.txt
writeFile(filePath, "This is line 1\n", (err) => {
  console.log("at point 1");
  if (err) {
    console.log("Error:", err);
  } else {
    // Добавляем вторую строку в fileB.txt
    writeFile(filePath, "This is line 2\n", { flag: "a" }, (err) => {
      console.log("at point 2");
      if (err) {
        console.log("Error:", err);
      } else {
        // Добавляем третью строку в fileB.txt
        writeFile(filePath, "This is line 3\n", { flag: "a" }, (err) => {
          console.log("at point 3");
          if (err) {
            console.log("Error:", err);
          }
        });
      }
    });
  }
});

console.log("at end");
