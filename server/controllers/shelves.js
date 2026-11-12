import {
    createShelf,
    deleteShelfById,
    getShelves,
    updateShelfTitleById,
} from "../models/shelves.js";
import { addThumbnails, getBooksByShelfId } from "../models/shelfBooks.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";
import { myShelfView } from "../views/myShelf.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = addThumbnails(getShelves());
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}

export function createShelfController(ctx) {
    const { validated } = ctx;
    const shelf = createShelf({ title: validated.title });
    ctx.flash = `Shelf '${shelf.title}' created`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}

export function shelfController(ctx) {
    const { data: { shelf } } = ctx;
    ctx.data.title = shelf.title;
    ctx.data.books = getBooksByShelfId(shelf.id);
    return render(myShelfView, ctx);
}

export function editShelfController(ctx) {
    const { validated, data: { shelf: { id } } } = ctx;
    const shelf = updateShelfTitleById(id, validated.title);
    ctx.flash = `Shelf renamed to '${shelf.title}'`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}

export function deleteShelfController(ctx) {
    const { data: { shelf: { id } } } = ctx;
    const shelf = deleteShelfById(id);
    ctx.flash = `Shelf '${shelf.title}' deleted`;
    return redirect("/shelves", ctx);
}
