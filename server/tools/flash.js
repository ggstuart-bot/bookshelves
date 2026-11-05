import { setCookie } from "@std/http/cookie";

export function setFlash(ctx) {
    const { headers, flash } = ctx;
    if (!flash) return;
    setCookie(headers, {
        name: "flash",
        value: encodeURIComponent(flash),
        path: "/",
        httpOnly: true,
    });
}
