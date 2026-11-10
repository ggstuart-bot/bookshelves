import { db } from "./db.js";

// Placeholder: this will need to change when shelves have owners
export function getShelves() {
    return db.prepare(`SELECT id, title FROM shelves`).all();
}
