const sqlite3 = require('sqlite3').verbose();

const dbPath = './users.db';

let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');

  db.run("INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')");
  db.run("INSERT INTO users (name, email) VALUES ('Bob', 'bob@example.com')");
  db.run("INSERT INTO users (name, email) VALUES ('Charlie', 'charlie@example.com')");

  db.each('SELECT id, name, email FROM users', (err, row) => {
    if (err) {
      console.err(err.message);
      return;
    }
    console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`);
  });
});
