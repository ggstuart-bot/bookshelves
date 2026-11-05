import { homeController } from "./controllers/home.js";
import { bookController, booksController } from "./controllers/books.js";
import { addBookController, removeBookController } from "./controllers/shelfBooks.js";
import {
    createShelfController,
    deleteShelfController,
    editShelfController,
    myShelvesController,
    shelfController,
} from "./controllers/shelves.js";
import { staticController } from "./controllers/static.js";
import { notFoundController } from "./controllers/notFound.js";
import { NotFoundError } from "./tools/errors.js";
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withValidation } from "./middleware/validation.js";
import { shelfSchema } from "./schema/shelf.js";
import { createUserController, signupFormController } from "./controllers/users.js";
import { userSchema } from "./schema/user.js";
import { signinController, signinFormController } from "./controllers/sessions.js";
import { signinSchema } from "./schema/signin.js";
import { withBook, withShelf } from "./middleware/resources.js";

const validateNewShelf = withValidation(shelfSchema, myShelvesController);
const validateEditShelf = withValidation(shelfSchema, shelfController);
const validateNewUser = withValidation(userSchema, signupFormController);
const validateSignin = withValidation(signinSchema, signinFormController);

const app = new Router();

app.use(withLogs);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/books/:bookId", withBook, bookController);

app.get("/signup", signupFormController);
app.post("/signup", validateNewUser, createUserController);
app.get("/signin", signinFormController);
app.post("/signin", validateSignin, signinController);

app.get("/shelves", myShelvesController);
app.post("/shelves", validateNewShelf, createShelfController);
app.get("/shelves/:shelfId", withShelf, shelfController);
app.post("/shelves/:shelfId/edit", withShelf, validateEditShelf, editShelfController);
app.post("/shelves/:shelfId/delete", withShelf, deleteShelfController);
app.post("/shelves/:shelfId/books/:bookId/add", withShelf, withBook, addBookController);
app.post("/shelves/:shelfId/books/:bookId/delete", withShelf, withBook, removeBookController);

export async function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, data: {}, headers };

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
