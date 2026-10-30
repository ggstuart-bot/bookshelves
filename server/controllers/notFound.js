import { render } from "../tools/render.js";
import { notFoundView } from "../views/notFound.js";

export function notFoundController(ctx) {
    return render(notFoundView, { status: 404, title: "Not found" });
}
