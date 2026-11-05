import { NotFoundError } from "./errors.js";

// Placeholder: this will need to change when we add middleware and URL parameters
export class Router {
    constructor() {
        this.routes = [];
    }

    register(method, pathname, handler) {
        const pattern = new URLPattern({ pathname });
        this.routes.push({ method, pattern, handler });
    }

    get(...args) {
        this.register("GET", ...args);
    }
    post(...args) {
        this.register("POST", ...args);
    }

    handle(ctx) {
        const { url, request } = ctx;
        const route = this.routes.find((route) => {
            return route.method === request.method && route.pattern.test(url);
        });
        if (!route) {
            throw new NotFoundError(
                `${request.method} ${url.pathname} doesn't match any known route`,
            );
        }
        return route.handler(ctx);
    }
}
