export function requireUser(fallback) {
    return (ctx, next) => ctx.user ? next(ctx) : fallback(ctx);
}

export function requireGuest(fallback) {
    return (ctx, next) => ctx.user ? fallback(ctx) : next(ctx);
}

export function requirePermission(predicate, key, fallback) {
    return (ctx, next) => predicate(ctx.user, ctx.data[key]) ? next(ctx) : fallback(ctx);
}
