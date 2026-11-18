import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signinView } from "../views/signin.js";

export function signinFormController(ctx) {
    ctx.data.title = "Sign in";
    return render(signinView, ctx);
}

export function signinController(ctx) {
    const { validated: { username } } = ctx;
    ctx.flash = `Ignored sign in for '${username}'`;
    return redirect("/signin", ctx);
}
