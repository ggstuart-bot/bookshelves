import { hashPassword } from "../tools/hash.js";
import { db } from "./db.js";

export function getUserByUsername(username) {
    return db.prepare(
        `SELECT * FROM users WHERE username=:username`,
    ).get({ username });
}

// Placeholder: this will need to change when users get more columns
export function getUserById(id) {
    return db.prepare(`SELECT id, username FROM users WHERE id=:id`).get({ id });
}

export function updateUserAvatarById(id, avatarId) {
    return db.prepare(
        `UPDATE users SET avatarId=:avatarId WHERE id=:id`,
    ).run({ id, avatarId });
}

// Placeholder: this will need to change when users get more columns
export async function createUser({ username, password }) {
    const hashedPassword = await hashPassword(password);
    return db.prepare(`
        INSERT INTO users(username, hashedPassword)
        VALUES (:username, :hashedPassword)
        RETURNING *
    `).get({ username, hashedPassword });
}

export function usernameExists(username) {
    return Boolean(
        db.prepare(`
            SELECT 1 FROM users
            WHERE username=:username
        `).get({ username }),
    );
}
