import { getCookies, setCookie } from "@std/http";
import { createSession, getSessionById } from "../models/sessions.js";

const SESSION_LENGTH = 1000 * 60 * 60 * 24;

export function signin(userId, ctx) {
    const expires = Date.now() + SESSION_LENGTH;
    const session = createSession(userId, expires);
    const { headers } = ctx;
    setCookie(headers, {
        name: "sessionId",
        value: session.id,
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        maxAge: SESSION_LENGTH / 1000,
    });
}

export function currentSession(ctx) {
    const { request } = ctx;
    const { sessionId } = getCookies(request.headers);
    return sessionId && getSessionById(sessionId);
}
