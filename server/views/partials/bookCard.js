export const DEFAULT_COVER = "/assets/default-cover.svg";

export function bookCard(book) {
    const cover = book.coverUrl ?? DEFAULT_COVER;
    return `
        <li class="card book">
            <img class="cover" src="${cover}" alt="" width="200" height="300" loading="lazy">
            <div>
                <h2>${book.title}</h2>
                <p>${book.author} (${book.year})</p>
            </div>
        </li>
    `;
}
