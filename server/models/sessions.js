import { db } from "./db.js";

export function createSession(userId, expires) {
    const id = crypto.randomUUID();
    return db.prepare(`
        INSERT INTO sessions(id, userId, expires)
        VALUES (:id, :userId, :expires)
        RETURNING *;
    `).get({ id, userId, expires: new Date(expires).toISOString() });
}
