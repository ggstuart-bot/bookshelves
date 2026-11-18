import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { signupView } from "../views/signup.js";

export function signupFormController(ctx) {
    ctx.data.title = "Sign up";
    return render(signupView, ctx);
}

export async function createUserController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    const username = formData.get("username") ?? "";
    ctx.flash = `Ignored registration for '${username}'`;
    return redirect("/signup", ctx);
}
