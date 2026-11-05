import { layout } from "../views/layout.js";

// Placeholder: this will need to change when we add flash messages and sign-in
export function render(view, ctx) {
    const { headers, status } = ctx;
    headers.set("content-type", "text/html");
    const content = view(ctx);
    const html = layout(content, ctx);
    return new Response(html, { headers, status });
}
