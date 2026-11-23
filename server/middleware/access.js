import { NotFoundError } from "../tools/errors.js";

export function requireUser(fallback) {
    return (ctx, next) => {
        if (ctx.user) return next(ctx);
        return fallback(ctx);
    };
}

export function requireGuest(fallback) {
    return (ctx, next) => {
        if (!ctx.user) return next(ctx);
        return fallback(ctx);
    };
}

export function mayUseShelf(ctx, next) {
    if (ctx.user?.id === ctx.data.shelf.ownerId) return next(ctx);
    const { url, request } = ctx;
    throw new NotFoundError(`${request.method} ${url.pathname} is not permitted`);
}

export function mayChangeAvatar(ctx, next) {
    if (ctx.user?.id === ctx.data.targetUser.id) return next(ctx);
    const { url, request } = ctx;
    throw new NotFoundError(`${request.method} ${url.pathname} is not permitted`);
}

export function mayViewUser(ctx, next) {
    if (ctx.user?.id === ctx.data.targetUser.id || ctx.data.targetUser.isPublic) return next(ctx);
    const { url, request } = ctx;
    throw new NotFoundError(`${request.method} ${url.pathname} is not permitted`);
}
