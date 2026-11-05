import { db } from "./db.js";

export function getFileById(id) {
    const row = db.prepare(
        `SELECT name, bytes, type FROM files WHERE id=:id`,
    ).get({ id });
    if (!row) return null;
    return new File([row.bytes], row.name, { type: row.type });
}
