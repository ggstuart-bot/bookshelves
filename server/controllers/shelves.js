import { getShelfById, getShelves } from "../models/shelves.js";
import { addThumbnails, getBooksByShelfId } from "../models/shelfBooks.js";
import { render } from "../tools/render.js";
import { NotFoundError } from "../tools/errors.js";
import { myShelvesView } from "../views/myShelves.js";
import { myShelfView } from "../views/myShelf.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = addThumbnails(getShelves());
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
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
    return render(myShelfView, ctx);
}
