import { getShelves } from "../models/shelves.js";
import { render } from "../tools/render.js";
import { myShelvesView } from "../views/myShelves.js";

export function myShelvesController(ctx) {
    ctx.data.shelves = getShelves();
    ctx.data.title = "Shelves";
    return render(myShelvesView, ctx);
}
