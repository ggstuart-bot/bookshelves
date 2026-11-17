import { createShelf, getShelfById, getShelves } from "../models/shelves.js";
import { addThumbnails, getBooksByShelfId } from "../models/shelfBooks.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { NotFoundError } from "../tools/errors.js";
import { shelvesView } from "../views/shelves.js";
import { shelfView } from "../views/shelf.js";

export async function shelvesController(ctx) {
    const { request } = ctx;
    if (request.method === "POST") {
        const formData = await request.formData();
        const shelf = createShelf({ title: formData.get("title") });
        return redirect(`/shelves/${shelf.id}`);
    }
    ctx.data.shelves = addThumbnails(getShelves());
    ctx.data.title = "Shelves";
    return render(shelvesView, ctx);
}

export function shelfController(ctx) {
    const { params: { shelfId } } = ctx;
    const shelf = getShelfById(Number(shelfId));
    if (!shelf) {
        throw new NotFoundError(`Shelf ${shelfId} not found`);
    }
    ctx.data.shelf = shelf;
    ctx.data.title = shelf.title;
    ctx.data.books = getBooksByShelfId(shelf.id);
    return render(shelfView, ctx);
}
