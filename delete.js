const sqlite3 = require("sqlite3").verbose();
const dbPath = "./students.db";
let db = new sqlite3.Database(dbPath);

db.serialize(() => {
  const deleteStudentId = 3;

  db.run(`DELETE FROM students WHERE id = ?`, deleteStudentId, function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(`\nDeleted student with ID ${deleteStudentId}`);

    console.log("\nUpdated student list after deletion:");
    db.each("SELECT id, name, age, department FROM students", (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      console.log(
        `Student ID: ${row.id}, Name: ${row.name}, Age: ${row.age}, Department: ${row.department}`
      );
    });
  });
});

db.close();
