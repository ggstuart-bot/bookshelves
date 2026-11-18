import { hashPassword } from "../tools/hash.js";
import { db } from "./db.js";

// Placeholder: this will need to change when users get more columns
export async function createUser({ username, password }) {
    const hashedPassword = await hashPassword(password);
    return db.prepare(`
        INSERT INTO users(username, hashedPassword)
        VALUES (:username, :hashedPassword)
        RETURNING *
    `).get({ username, hashedPassword });
}
