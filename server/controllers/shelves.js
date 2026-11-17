import { getShelves } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { shelvesView } from "../views/shelves.js";
import { shelfView } from "../views/shelf.js";

export function shelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(shelvesView, ctx);
}

export function shelfController(ctx) {
    return render(shelfView, ctx);
}
