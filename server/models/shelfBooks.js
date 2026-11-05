import { db } from "./db.js";

export function addBookToShelf(shelfId, bookId) {
    return db.prepare(
        `INSERT OR IGNORE INTO shelfBooks(shelfId, bookId) VALUES (:shelfId, :bookId)`,
    ).run({ shelfId, bookId });
}
