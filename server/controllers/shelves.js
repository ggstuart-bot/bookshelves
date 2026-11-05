import { createShelf, getShelves } from "../models/shelves.js";
import { shelfSchema } from "../schema/shelf.js";
import { SchemaValidationError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { validateSchema } from "../tools/validation.js";
import { myShelvesView } from "../views/myShelves.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}

// Placeholder: this will need to change when we add validation middleware and shelf pages
export async function createShelfController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    try {
        const validated = validateSchema(formData, shelfSchema);
        createShelf({ title: validated.title });
        return redirect("/shelves");
    } catch (error) {
        if (!(error instanceof SchemaValidationError)) throw error;
        ctx.data.errors = error.errors;
        ctx.data.values = error.values;
        ctx.status = 400;
        return myShelvesController(ctx);
    }
}
