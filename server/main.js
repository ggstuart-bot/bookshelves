export function server() {
    // Placeholder: this will need to change when we add HTML views
    const headers = new Headers({ "content-type": "text/html" });
    return new Response("<h1>hello world</h1>", { headers });
}
