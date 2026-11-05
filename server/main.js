import { homeController } from "./controllers/home.js";
import { booksController } from "./controllers/books.js";
import { createShelfController, myShelvesController } from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withValidation } from "./middleware/validation.js";
import { shelfSchema } from "./schema/shelf.js";

const validateNewShelf = withValidation(shelfSchema, myShelvesController);

const app = new Router();

app.use(withLogs);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/shelves", myShelvesController);
app.post("/shelves", validateNewShelf, createShelfController);

export async function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, data: {} };

    try {
        return await app.handle(ctx);
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log("Not found:", error.message);
            return notFoundController(ctx);
        }
        throw error;
    }
}
