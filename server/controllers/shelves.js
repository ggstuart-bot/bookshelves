import { createShelf, getShelves } from "../models/shelves.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";
import { myShelfView } from "../views/myShelf.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}

// Placeholder: this will need to change when we add shelf pages
export function createShelfController(ctx) {
    const { validated } = ctx;
    createShelf({ title: validated.title });
    return redirect("/shelves");
}

export function shelfController(ctx) {
    const { data: { shelf } } = ctx;
    ctx.data.title = shelf.title;
    return render(myShelfView, ctx);
}
