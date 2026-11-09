import { createUser } from "../models/users.js";
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
    ctx.flash = `User '${user.username}' created`;
    return redirect("/signin", ctx);
}

// Placeholder: this will need to change when we add public shelves to user pages
export function userController(ctx) {
    const { data: { targetUser } } = ctx;
    ctx.data.title = targetUser.username;
    return render(userView, ctx);
}
