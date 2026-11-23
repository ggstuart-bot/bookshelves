import { db } from "./db.js";

export function createShelf({ title, ownerId, isPublic = 0 }) {
    return db.prepare(`
        INSERT INTO shelves(title, ownerId, isPublic)
        VALUES (:title, :ownerId, :isPublic)
        RETURNING id, title, ownerId
    `).get({ title, ownerId, isPublic });
}

export function getShelfById(id) {
    return db.prepare(
        `SELECT id, title, ownerId, isPublic FROM shelves WHERE id=:id`,
    ).get({ id });
}

export function getShelvesByOwnerId(ownerId) {
    return db.prepare(`
        SELECT id, title, ownerId, isPublic,
            (SELECT count(*) FROM shelfBooks WHERE shelfId = shelves.id) AS bookCount
        FROM shelves WHERE ownerId=:ownerId
    `).all({ ownerId });
}

// All shelves, with the owner's username for display.
// Placeholder: this will need to change when shelves can be public
export function getShelves() {
    return db.prepare(`
        SELECT shelves.id, title, ownerId, username, avatarId,
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
