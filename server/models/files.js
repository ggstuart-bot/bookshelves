import { db } from "./db.js";

export async function createFile(file) {
    const bytes = await file.bytes();
    const { id } = db.prepare(`
        INSERT INTO files(name, bytes, type)
        VALUES (:name, :bytes, :type)
        RETURNING id
    `).get({ name: file.name, bytes, type: file.type });
    return id;
}
