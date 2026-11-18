import { db } from "./db.js";

// Placeholder: this will need to change when shelves can be public
export function createShelf({ title, ownerId }) {
    return db.prepare(`
        INSERT INTO shelves(title, ownerId)
        VALUES (:title, :ownerId)
        RETURNING id, title, ownerId
    `).get({ title, ownerId });
}

// Placeholder: this will need to change when shelves can be public
export function getShelfById(id) {
    return db.prepare(`SELECT id, title, ownerId FROM shelves WHERE id=:id`).get({ id });
}

// Placeholder: this will need to change when shelves can be public
export function getShelvesByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId,
            (SELECT count(*) FROM shelfBooks WHERE shelfId = shelves.id) AS bookCount
        FROM shelves WHERE ownerId=:ownerId
    `).all({ ownerId });
}

// All shelves, with the owner's username for display.
// Placeholder: this will need to change when shelves can be public
export function getShelves() {
    return db.prepare(`
        SELECT shelves.id, title, ownerId, username,
            (SELECT count(*) FROM shelfBooks WHERE shelfId = shelves.id) AS bookCount
        FROM shelves JOIN users ON users.id = shelves.ownerId
    `).all();
}

export function updateShelfTitleById(id, title) {
    return db.prepare(
        `UPDATE shelves SET title=:title WHERE id=:id RETURNING id, title, ownerId`,
    ).get({ id, title });
}

export function deleteShelfById(id) {
    return db.prepare(
        `DELETE FROM shelves WHERE id=:id RETURNING id, title, ownerId`,
    ).get({ id });
}
