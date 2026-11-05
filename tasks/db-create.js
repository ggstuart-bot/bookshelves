import { db } from "../server/models/db.js";

db.exec("DROP TABLE IF EXISTS shelfBooks");
db.exec("DROP TABLE IF EXISTS shelves");
db.exec("DROP TABLE IF EXISTS books");

// Placeholder: this will need to change when shelves have owners
db.exec(`
    CREATE TABLE shelves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
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
