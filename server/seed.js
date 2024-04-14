import Database from "better-sqlite3";
const db = new Database("guestbook.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
  )
`);

const insertMessage = db.prepare(
  "INSERT INTO messages (username, message) VALUES (?, ?)"
);
const messages = [
  { username: "Adam", message: "Congrats!" },
  { username: "Lisa", message: "Best wishes!" },
  { username: "Cathy", message: "Enjoy your achieve!" },
];
messages.forEach((message) => {
  insertMessage.run(message.username, message.message);
});

db.close();
