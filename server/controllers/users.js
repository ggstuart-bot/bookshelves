import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";

export function signupFormController(ctx) {
    ctx.data.title = "Sign up";
    return render(signupView, ctx);
}

export function createUserController(ctx) {
    const { validated } = ctx;
    ctx.flash = `Ignored registration for '${validated.username}'`;
    return redirect("/signup", ctx);
}
