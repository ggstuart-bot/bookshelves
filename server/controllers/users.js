import { createUser } from "../models/users.js";
import { getShelvesByOwnerId } from "../models/shelves.js";
import { addThumbnails } from "../models/shelfBooks.js";
import { signin } from "../tools/authentication.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";
import { userView } from "../views/user.js";

export function signupFormController(ctx) {
    ctx.data.title = "Sign up";
    return render(signupView, ctx);
}

export async function createUserController(ctx) {
    const { validated } = ctx;
    const user = await createUser(validated);
    signin(user.id, ctx);
    ctx.flash = `Welcome, ${user.username}`;
    return redirect("/", ctx);
}

export function userController(ctx) {
    const { data: { targetUser } } = ctx;
    ctx.data.shelves = addThumbnails(getShelvesByOwnerId(targetUser.id));
    ctx.data.title = targetUser.username;
    return render(userView, ctx);
}
