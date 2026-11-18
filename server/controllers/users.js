import { ValidationError } from "../tools/errors.js";
import { redirect } from "../tools/redirect.js";
import { render } from "../tools/render.js";
import { validateSchema } from "../tools/validation.js";
import { userSchema } from "../schema/user.js";
import { signupView } from "../views/signup.js";

export function signupFormController(ctx) {
    ctx.data.title = "Sign up";
    return render(signupView, ctx);
}

export async function createUserController(ctx) {
    const { request } = ctx;
    const formData = await request.formData();
    try {
        const { username } = validateSchema(formData, userSchema);
        ctx.flash = `Ignored registration for '${username}'`;
        return redirect("/signup", ctx);
    } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        ctx.status = 400;
        return signupFormController(ctx);
    }
}
