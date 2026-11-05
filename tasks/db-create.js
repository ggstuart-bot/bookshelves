import { db } from "../server/models/db.js";

db.exec("DROP TABLE IF EXISTS sessions");
db.exec("DROP TABLE IF EXISTS shelfBooks");
db.exec("DROP TABLE IF EXISTS shelves");
db.exec("DROP TABLE IF EXISTS books");
db.exec("DROP TABLE IF EXISTS users");

// Placeholder: this will need to change when users have public profiles, admin rights and avatars
db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        hashedPassword TEXT NOT NULL
    )
`);

// Placeholder: this will need to change when shelves can be public
db.exec(`
    CREATE TABLE shelves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        ownerId INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
    )
`);

db.exec(`
    CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        year INTEGER,
        thumbnailUrl TEXT,
        coverUrl TEXT
    )
`);

db.exec(`
    CREATE TABLE shelfBooks (
        shelfId INTEGER NOT NULL REFERENCES shelves(id) ON DELETE CASCADE,
        bookId INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
        PRIMARY KEY (shelfId, bookId)
    )
`);

db.exec(`
    CREATE TABLE sessions (
        id TEXT PRIMARY KEY,
        userId INTEGER NOT NULL,
        expires INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
`);
