import { NotFoundError, UnexpectedError } from "../tools/errors.js";
import { notFoundController, serverErrorController } from "../controllers/errors.js";

export async function withErrors(ctx, next) {
    try {
        return await next(ctx);
    } catch (error) {
        ctx.error = error;
        if (error instanceof NotFoundError) return notFoundController(ctx);
        ctx.error = new UnexpectedError("Unexpected error", { cause: error });
        return serverErrorController(ctx);
    }
}
