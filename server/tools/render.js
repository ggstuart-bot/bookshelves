import { layout } from "../views/layout.js";

// Placeholder: this will need to change when we add flash messages and sign-in
export function render(content, { status } = {}) {
    const headers = new Headers({ "content-type": "text/html" });
    return new Response(layout(content), { headers, status });
}
