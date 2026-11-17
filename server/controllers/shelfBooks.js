import { redirect } from "../tools/redirect.js";

export function addBookController(ctx) {
    const { params: { shelfId, bookId } } = ctx;
    ctx.flash = `Ignored request to add book ${bookId} to shelf ${shelfId}`;
    return redirect(`/books/${bookId}`, ctx);
}
