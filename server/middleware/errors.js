import { NotFoundError } from "../tools/errors.js";
import { notFoundController } from "../controllers/errors.js";

export async function withErrors(ctx, next) {
    try {
        return await next(ctx);
    } catch (error) {
        ctx.error = error;
        if (error instanceof NotFoundError) return notFoundController(ctx);
        throw error;
    }
}
