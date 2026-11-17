export function addBookController(ctx) {
    const { params: { shelfId, bookId } } = ctx;
    return new Response(`Add book ${bookId} to shelf ${shelfId}`);
}
