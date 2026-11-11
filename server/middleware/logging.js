// Placeholder: this will need to change when we add flash messages and sessions
export async function withLogs(ctx, next) {
    const { url, request } = ctx;
    console.log("\n============================");
    console.log(`${request.method} ${url.pathname}`);
    const response = await next(ctx);
    if (ctx.error) console.log("[error]", ctx.error);
    console.log("RESPONSE", response.status);
    console.log("============================");

    return response;
}
