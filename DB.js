const sqlite3 = require('sqlite3').verbose();
const dbPath = './posts.db';
let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author TEXT)'
  );

  db.run(
    "INSERT INTO posts (title, content, author) VALUES ('Introduction to SQLite', 'SQLite is a lightweight database management system.', 'Alice')"
  );
  db.run(
    "INSERT INTO posts (title, content, author) VALUES ('Node.js Basics', 'Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.', 'Bob')"
  );
  db.run(
    "INSERT INTO posts (title, content, author) VALUES ('Web Development', 'Learn about HTML, CSS, and JavaScript for building websites.', 'Charlie')"
  );
  db.run(
    "INSERT INTO posts (title, content, author) VALUES ('Data Structures', 'Explore different data structures like arrays, linked lists, and trees.', 'David')"
  );

  db.each('SELECT id, title, content, author FROM posts', (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Post ID: ${row.id}, Title: ${row.title}`);
    console.log(`Content: ${row.content}`);
    console.log(`Author: ${row.author}\n`);
  });
});

db.close();
