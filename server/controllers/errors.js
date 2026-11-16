import { render } from "../tools/render.js";
import { errorView } from "../views/error.js";

export function notFoundController(ctx) {
    ctx.status = 404;
    ctx.data.title = "Not found";
    ctx.data.message = "The requested resource was not found.";
    return render(errorView, ctx);
}
