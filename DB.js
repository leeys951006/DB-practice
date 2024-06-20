const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./mydatabase.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT');

  db.run("INSERT INTO books (title, author) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald')");
  db.run("INSERT INTO books (title, author) VALUES ('To kill a Mockingbird', 'Harper Lee')");
  db.run("INSERT INTO books (title, author) VALUES ('1984', 'George Orwell')");

  db.each('SELECT id, title, author FROM books', (err, row) => {
    if (err) {
      console.err(err.message);
      return;
    }
    console.log(`${row.id} - ${row.title} by ${row.author}`);
  });
});

db.close();
