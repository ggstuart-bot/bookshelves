import { createShelf, deleteShelfById, getShelves } from "../models/shelves.js";
import { addThumbnails, getBooksByShelfId } from "../models/shelfBooks.js";
import { SchemaValidationError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { validateSchema } from "../tools/validation.js";
import { shelfSchema } from "../schema/shelf.js";
import { shelvesView } from "../views/shelves.js";
import { shelfView } from "../views/shelf.js";

export function shelvesController(ctx) {
    ctx.data.shelves = addThumbnails(getShelves());
    ctx.data.title = "Shelves";
    return render(shelvesView, ctx);
}

export async function createShelfController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    try {
        const { title } = validateSchema(formData, shelfSchema);
        const shelf = createShelf({ title });
        ctx.flash = `Shelf '${shelf.title}' created`;
        return redirect(`/shelves/${shelf.id}`, ctx);
    } catch (error) {
        if (!(error instanceof SchemaValidationError)) throw error;
        ctx.data.errors = error.errors;
        ctx.data.values = error.values;
        ctx.status = 400;
        return shelvesController(ctx);
    }
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
