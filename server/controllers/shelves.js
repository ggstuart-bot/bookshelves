import { createShelf, deleteShelfById, getShelves } from "../models/shelves.js";
import { addThumbnails, getBooksByShelfId } from "../models/shelfBooks.js";
import { ValidationError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { validateField } from "../tools/validation.js";
import { shelvesView } from "../views/shelves.js";
import { shelfView } from "../views/shelf.js";
import { maxLength, minLength, required } from "../tools/validators.js";

export function shelvesController(ctx) {
    ctx.data.shelves = addThumbnails(getShelves());
    ctx.data.title = "Shelves";
    return render(shelvesView, ctx);
}

export async function createShelfController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    const title = formData.get("title") ?? "";
    try {
        validateField("Title", title, [required, minLength(3), maxLength(25)]);
    } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        ctx.data.errors = { title: error.message };
        ctx.status = 400;
        return shelvesController(ctx);
    }
    const shelf = createShelf({ title });
    ctx.flash = `Shelf '${shelf.title}' created`;
    return redirect(`/shelves/${shelf.id}`, ctx);
}

export function shelfController(ctx) {
    const { data: { shelf } } = ctx;
    ctx.data.title = shelf.title;
    ctx.data.books = getBooksByShelfId(shelf.id);
    return render(shelfView, ctx);
}

export function deleteShelfController(ctx) {
    const { data: { shelf: { id } } } = ctx;
    const shelf = deleteShelfById(id);
    ctx.flash = `Shelf '${shelf.title}' deleted`;
    return redirect("/shelves", ctx);
}
