import { db } from "./db.js";

export function createBook({ title, author, year, thumbnailUrl, coverUrl }) {
    return db.prepare(`
        INSERT INTO books(title, author, year, thumbnailUrl, coverUrl)
        VALUES (:title, :author, :year, :thumbnailUrl, :coverUrl)
        RETURNING id, title, author, year, thumbnailUrl, coverUrl
    `).get({ title, author, year, thumbnailUrl, coverUrl });
}

export function searchBooks(q, page, pageSize) {
    return db.prepare(`
        SELECT id, title, author, year, thumbnailUrl, coverUrl FROM books
        WHERE title LIKE :pattern OR author LIKE :pattern
        LIMIT :limit OFFSET :offset
    `).all({ pattern: `%${q}%`, limit: pageSize, offset: (page - 1) * pageSize });
}

// Placeholder: this will need to change when we add search
function countBooks() {
    return db.prepare(`
        SELECT count(*) AS count FROM books
    `).get().count;
}

// Placeholder: this will need to change when we add search
export function countPages(pageSize) {
    return Math.ceil(countBooks() / pageSize);
}
