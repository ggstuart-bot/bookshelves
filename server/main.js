import { homeController } from "./controllers/home.js";
import { bookController, booksController } from "./controllers/books.js";
import { addBookController } from "./controllers/shelfBooks.js";
import {
    createShelfController,
    shelfController,
    shelvesController,
} from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withErrors } from "./middleware/errors.js";

const app = new Router();

app.use(withLogs);
app.use(withErrors);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/books/:bookId", bookController);
app.get("/shelves", shelvesController);
app.post("/shelves", createShelfController);
app.get("/shelves/:shelfId", shelfController);
app.post("/shelves/:shelfId/books/:bookId/add", addBookController);

export function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, data: {}, headers };
    return app.handle(ctx);
}
