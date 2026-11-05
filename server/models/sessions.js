import { db } from "./db.js";

export function createSession(userId, expires) {
    const id = crypto.randomUUID();
    return db.prepare(`
        INSERT INTO sessions(id, userId, expires)
        VALUES (:id, :userId, :expires)
        RETURNING *;
    `).get({ id, userId, expires: new Date(expires).toISOString() });
}

export function getSessionById(id) {
    return db.prepare(
        `SELECT * FROM sessions WHERE id=:id AND expires > :now`,
    ).get({ id, now: new Date().toISOString() });
}
