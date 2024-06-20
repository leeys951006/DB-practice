const sqlite3 = require('sqlite3').verbose();
const dbPath = './students.db';
let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  const updateStudentId = 2;
  const newDepartment = 'Information Technology';

  db.run(
    `UPDATE students SET department = ? WHERE id = ?`,
    [newDepartment, updateStudentId],
    function(err) {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(`\nUpdated Bob's department to ${newDepartment}`);

      console.log('\nUpdated student list:');
      db.each('SELECT id, name, age, department FROM students', (err, row) => {
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`Student ID: ${row.id}, Name: ${row.name}, Age: ${row.age}, Department: ${row.department}`);
      });
    }
  );
});

db.close();