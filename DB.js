const sqlite3 = require('sqlite3').verbose();
const dbPath = './products.db';
let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, stock INTEGER)'
  );

  db.run("INSERT INTO products (name, price, stock) VALUES ('Laptop', 1200.00, 10)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('Phone', 800.00, 15)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('Tablet', 500.00, 20)");
  db.run("INSERT INTO products (name, price, stock) VALUES ('Headphones', 100.00, 30)");

  db.each('SELECT id, name, price, stock FROM products', (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Product ID: ${row.id}, Name: ${row.name}, Price: $${row.price}, Stock: ${row.stock}`);
  });
});

db.close();
