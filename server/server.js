import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("guestbook.db");

const app = express();

app.use(express.json());
app.use(cors());

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
  )
`);

app.get("/", function (request, response) {
  response.send("Welcome to the guestbook application!");
});

app.post("/message", function (request, response) {
  const { username, message } = request.body;

  const insertMessage = db.prepare(
    "INSERT INTO messages (username, message) VALUES (?, ?)"
  );
  insertMessage.run(username, message);
  response.sendStatus(200);
});

app.get("/message", function (request, response) {
  const userMsgs = db.prepare("SELECT * FROM messages").all();
  response.json(userMsgs);
});

app.listen(8080, function () {
  console.log("App is running on port 8080");
});
