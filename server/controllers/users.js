import { createUser, updateUserIsPublicById } from "../models/users.js";
import { unpublishShelvesByOwnerId } from "../models/shelves.js";
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

export function profileController(ctx) {
    return redirect(`/users/${ctx.user.id}`, ctx);
}

// Unpublishing a profile also unpublishes its shelves,
// so a public shelf always has a public owner
function changeProfileVisibility(ctx, isPublic) {
    const { data: { targetUser } } = ctx;
    updateUserIsPublicById(targetUser.id, isPublic);
    if (!isPublic) {
        unpublishShelvesByOwnerId(targetUser.id);
    }
    ctx.flash = isPublic ? "Your profile is now public" : "Your profile is now private";
    return redirect("/profile", ctx);
}

export function publishProfileController(ctx) {
    return changeProfileVisibility(ctx, 1);
}

export function unpublishProfileController(ctx) {
    return changeProfileVisibility(ctx, 0);
}
