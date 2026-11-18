export function requireUser(fallback) {
    return (ctx, next) => {
        if (ctx.user) return next(ctx);
        return fallback(ctx);
    };
}
