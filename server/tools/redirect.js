// Placeholder: this will need to change when we add flash messages
export function redirect(location, ctx) {
    const { headers } = ctx;
    headers.set("location", location);
    return new Response(null, { headers, status: 303 });
}
