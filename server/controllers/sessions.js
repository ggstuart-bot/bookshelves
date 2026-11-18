import { render } from "../tools/render.js";
import { signinView } from "../views/signin.js";

export function signinFormController(ctx) {
    ctx.data.title = "Sign in";
    return render(signinView, ctx);
}
