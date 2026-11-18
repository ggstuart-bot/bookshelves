import { getCookies } from "@std/http";
import { getUserById } from "../models/users.js";

export function withSession(ctx, next) {
    const { request } = ctx;
    const { userId } = getCookies(request.headers);
    ctx.user = userId && getUserById(userId);
    return next(ctx);
}
