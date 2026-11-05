export function requireUser(fallback) {
    return (ctx, next) => ctx.user ? next(ctx) : fallback(ctx);
}
