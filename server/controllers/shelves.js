import { createShelf, getShelves } from "../models/shelves.js";
import { ValidationError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { maxLength, minLength, required } from "../tools/validators.js";
import { myShelvesView } from "../views/myShelves.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}

// Placeholder: this will need to change when we add schemas and shelf pages
export async function createShelfController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    const title = formData.get("title") ?? "";
    try {
        for (const validate of [required, minLength(3), maxLength(25)]) {
            validate("Title", title);
        }
    } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        ctx.data.errors = { title: error.message };
        ctx.data.values = { title };
        ctx.status = 400;
        return myShelvesController(ctx);
    }
    createShelf({ title });
    return redirect("/shelves");
}
