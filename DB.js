const sqlite3 = require('sqlite3').verbose();
const dbPath = './orders.db';
let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, quantity INTEGER)'
  );

  db.run('INSERT INTO orders (product_id, quantity) VALUES (1, 2)');
  db.run('INSERT INTO orders (product_id, quantity) VALUES (2, 3)');
  db.run('INSERT INTO orders (product_id, quantity) VALUES (3, 1)');
  db.run('INSERT INTO orders (product_id, quantity) VALUES (4, 4)');

  db.each('SELECT id, product_id, quantity FROM orders', (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`Order ID: ${row.id}, Product ID: ${row.product_id}, Quantity: ${row.quantity}`);
  });
});

db.close();
