import { homeController } from "./controllers/home.js";
import { bookController, booksController } from "./controllers/books.js";
import { addBookController, removeBookController } from "./controllers/shelfBooks.js";
import {
    createShelfController,
    deleteShelfController,
    shelfController,
    shelvesController,
} from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { createUserController, signupFormController } from "./controllers/users.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withErrors } from "./middleware/errors.js";
import { withBook, withShelf } from "./middleware/resources.js";

const app = new Router();

app.use(withLogs);
app.use(withErrors);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/books/:bookId", withBook, bookController);
app.get("/signup", signupFormController);
app.post("/signup", createUserController);
app.get("/shelves", shelvesController);
app.post("/shelves", createShelfController);
app.get("/shelves/:shelfId", withShelf, shelfController);
app.post("/shelves/:shelfId/delete", withShelf, deleteShelfController);
app.post("/shelves/:shelfId/books/:bookId/add", withShelf, withBook, addBookController);
app.post("/shelves/:shelfId/books/:bookId/delete", withShelf, withBook, removeBookController);

export function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, data: {}, headers };
    return app.handle(ctx);
}
