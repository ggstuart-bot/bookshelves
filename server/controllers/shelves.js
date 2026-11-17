import { render } from "../tools/render.js";
import { shelvesView } from "../views/shelves.js";

export function shelvesController(ctx) {
    ctx.data.title = "Shelves";
    return render(shelvesView, ctx);
}
