import { setCookie } from "@std/http";

export function signin(userId, ctx) {
    const { headers } = ctx;
    setCookie(headers, {
        name: "userId",
        value: String(userId),
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
    });
}
