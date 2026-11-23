import { NotFoundError } from "../tools/errors.js";
import { canChangeAvatar, canViewUser } from "../tools/permissions.js";

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
    if (canChangeAvatar(ctx.user, ctx.data.targetUser)) return next(ctx);
    const { url, request } = ctx;
    throw new NotFoundError(`${request.method} ${url.pathname} is not permitted`);
}

export function mayViewUser(ctx, next) {
    if (canViewUser(ctx.user, ctx.data.targetUser)) return next(ctx);
    const { url, request } = ctx;
    throw new NotFoundError(`${request.method} ${url.pathname} is not permitted`);
}
