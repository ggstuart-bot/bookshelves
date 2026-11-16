import { getShelves } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";
import { myShelfView } from "../views/myShelf.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}

export function shelfController(ctx) {
    const { data: { shelf } } = ctx;
    ctx.data.title = shelf.title;
    return render(myShelfView, ctx);
}
