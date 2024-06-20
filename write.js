const sqlite3 = require('sqlite3').verbose();
const dbPath = './students.db';
let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER, department TEXT)'
  );

  db.run("INSERT INTO students (name, age, department) VALUES ('Alice', 20, 'Computer Science')");
  db.run("INSERT INTO students (name, age, department) VALUES ('Bob', 22, 'Engineering')");
  db.run("INSERT INTO students (name, age, department) VALUES ('Charlie', 21, 'Mathematics')");
  db.run("INSERT INTO students (name, age, department) VALUES ('David', 19, 'Physics')");
});

db.close();
