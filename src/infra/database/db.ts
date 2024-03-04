import path from 'path';
import sqlite3 from 'sqlite3';
import { User } from "../../app/models/user"

const dbPath = path.resolve(__dirname, '../users.db');
const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
  )
`);

async function addUsers(user: User): Promise<void> {
  return new Promise((resolve, reject) => {
    const { name, email } = user;
    db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

async function getLastId(): Promise<number> {
  return new Promise((resolve, reject) => {
    db.get("SELECT MAX(id) AS lastId FROM users", (err, row) => {
      if (err) {
        reject(err);
      } else {
        const lastInsertedId = row ? row.lastId : null;
        console.log(`Último ID inserido: ${lastInsertedId}`);
        resolve(lastInsertedId);
      }
    });
  });
}

async function getUsers(): Promise<User[]> {
  let query = 'SELECT * FROM users WHERE 1=1';

  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getUserIdByEmail(email: string): Promise<number | null> {
  return new Promise((resolve, reject) => {
    db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row ? row.id : null);
      }
    });
  });
}

export {
  addUsers,
  getUsers,
  getUserIdByEmail,
  getLastId
};
