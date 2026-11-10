import { createShelf, getShelves } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}

// Placeholder: this will need to change when we add validation
export async function createShelfController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    createShelf({ title: formData.get("title") });
    return myShelvesController(ctx);
}
