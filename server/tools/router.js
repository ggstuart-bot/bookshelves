import { NotFoundError } from "./errors.js";

// Placeholder: this will need to change when we add URL parameters
export class Router {
    constructor() {
        this.routes = [];
        this.middleware = [];
    }

    register(method, pathname, handler) {
        const pattern = new URLPattern({ pathname });
        this.routes.push({ method, pattern, handler });
    }

    use(fn) {
        this.middleware.push(fn);
    }

    get(...args) {
        this.register("GET", ...args);
    }
    post(...args) {
        this.register("POST", ...args);
    }

    handle(ctx) {
        return this.chain(ctx, [...this.middleware, (ctx) => this.dispatch(ctx)]);
    }

    dispatch(ctx) {
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

    chain(ctx, handlers) {
        const [fn, ...remaining] = handlers;
        if (!remaining.length) return fn(ctx);
        const next = (ctx) => this.chain(ctx, remaining);
        return fn(ctx, next);
    }
}
