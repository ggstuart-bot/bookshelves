import { homeController } from "./controllers/home.js";
import { bookController, booksController } from "./controllers/books.js";
import { createShelfController, myShelvesController } from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withErrors } from "./middleware/errors.js";
import { withValidation } from "./middleware/validation.js";
import { shelfSchema } from "./schema/shelf.js";
import { withBook } from "./middleware/resources.js";

const validateNewShelf = withValidation(shelfSchema, myShelvesController);

const app = new Router();

app.use(withLogs);
app.use(withErrors);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/books/:bookId", withBook, bookController);
app.get("/shelves", myShelvesController);
app.post("/shelves", validateNewShelf, createShelfController);

export function server(request) {
    const url = new URL(request.url);
    const ctx = { request, url, data: {} };
    return app.handle(ctx);
}
