export function cardGrid(cards, emptyMessage) {
    return cards.length ? `<ul class="grid">${cards.join("")}</ul>` : `<p>${emptyMessage}</p>`;
}
