import { db } from "./db.js";

export function createShelf({ title }) {
    return db.prepare(`
        INSERT INTO shelves(title)
        VALUES (:title)
        RETURNING id, title
    `).get({ title });
}

// Placeholder: this will need to change when shelves have owners
export function getShelves() {
    return db.prepare(`SELECT id, title FROM shelves`).all();
}
