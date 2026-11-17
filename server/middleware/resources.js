import { getShelfById } from "../models/shelves.js";
import { NotFoundError } from "../tools/errors.js";

export function withShelf(ctx, next) {
    const { params: { shelfId } } = ctx;
    const shelf = getShelfById(Number(shelfId));
    if (!shelf) {
        throw new NotFoundError(`Shelf ${shelfId} not found`);
    }
    ctx.data.shelf = shelf;
    return next(ctx);
}
