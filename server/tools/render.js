import { layout } from "../views/layout.js";

// Placeholder: this will need to change when we add flash messages and sign-in
export function render(view, ctx, { data } = {}) {
    const { status } = ctx;
    const headers = new Headers({ "content-type": "text/html" });
    const content = view({ data });
    const html = layout(content, ctx);
    return new Response(html, { headers, status });
}
