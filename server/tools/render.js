import { layout } from "../views/layout.js";

// Placeholder: this will need to change when we add ctx
export function render(content, { status, title } = {}) {
    const headers = new Headers({ "content-type": "text/html" });
    return new Response(layout(content, { title }), { headers, status });
}
