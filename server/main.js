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
import { Router } from "./tools/router.js";
import { withLogs } from "./middleware/logging.js";
import { withErrors } from "./middleware/errors.js";
import { withValidation } from "./middleware/validation.js";
import { shelfSchema } from "./schema/shelf.js";
import { createUserController, signupFormController, userController } from "./controllers/users.js";
import { userSchema } from "./schema/user.js";
import {
    alreadySignedInRedirectController,
    signinController,
    signinFormController,
    signinRedirectController,
    signoutController,
} from "./controllers/sessions.js";
import { signinSchema } from "./schema/signin.js";
import { withSession } from "./middleware/session.js";
import { requireGuest, requirePermission, requireUser } from "./middleware/access.js";
import { canUseShelf, canViewShelf, canViewUser } from "./tools/permissions.js";
import { withBook, withShelf, withTargetUser } from "./middleware/resources.js";

const validateNewShelf = withValidation(shelfSchema, myShelvesController);
const validateEditShelf = withValidation(shelfSchema, shelfController);
const validateNewUser = withValidation(userSchema, signupFormController);
const validateSignin = withValidation(signinSchema, signinFormController);

const mustBeSignedIn = requireUser(signinRedirectController);
const mustBeSignedOut = requireGuest(alreadySignedInRedirectController);
const mayViewUser = requirePermission(canViewUser, "targetUser", notFoundController);
const mayViewShelf = requirePermission(canViewShelf, "shelf", notFoundController);
const mayUseShelf = requirePermission(canUseShelf, "shelf", notFoundController);

const app = new Router();

app.use(withLogs);
app.use(withErrors);
app.use(withSession);

app.get("/assets/*", staticController);
app.get("/", homeController);
app.get("/books", booksController);
app.get("/books/:bookId", withBook, bookController);

app.get("/signup", mustBeSignedOut, signupFormController);
app.post("/signup", mustBeSignedOut, validateNewUser, createUserController);
app.get("/signin", mustBeSignedOut, signinFormController);
app.post("/signin", mustBeSignedOut, validateSignin, signinController);
app.post("/signout", signoutController);

app.get("/shelves", mustBeSignedIn, myShelvesController);
app.post("/shelves", mustBeSignedIn, validateNewShelf, createShelfController);
app.get("/shelves/:shelfId", withShelf, mayViewShelf, shelfController);
app.post(
    "/shelves/:shelfId/edit",
    mustBeSignedIn,
    withShelf,
    mayUseShelf,
    validateEditShelf,
    editShelfController,
);
app.post("/shelves/:shelfId/delete", mustBeSignedIn, withShelf, mayUseShelf, deleteShelfController);
app.post(
    "/shelves/:shelfId/books/:bookId/add",
    mustBeSignedIn,
    withShelf,
    withBook,
    mayUseShelf,
    addBookController,
);
app.post(
    "/shelves/:shelfId/books/:bookId/delete",
    mustBeSignedIn,
    withShelf,
    withBook,
    mayUseShelf,
    removeBookController,
);
app.get("/users/:userId", withTargetUser, mayViewUser, userController);

export function server(request) {
    const url = new URL(request.url);
    const headers = new Headers();
    const ctx = { request, url, data: {}, headers };
    return app.handle(ctx);
}
