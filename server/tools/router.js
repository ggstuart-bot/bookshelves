import { NotFoundError } from "./errors.js";

// Placeholder: this will need to change when we add URL parameters
export class Router {
    constructor() {
        this.routes = [];
        this.middleware = [];
    }

    register(pathname, handler) {
        const pattern = new URLPattern({ pathname });
        this.routes.push({ pattern, handler });
    }

    use(fn) {
        this.middleware.push(fn);
    }

    handle(ctx) {
        const { url } = ctx;
        const route = this.routes.find((route) => {
            return route.pattern.test(url);
        });
        if (!route) {
            throw new NotFoundError(`${url.pathname} doesn't match any known route`);
        }
        return this.chain(ctx, [...this.middleware, route.handler]);
    }

    chain(ctx, handlers) {
        const [fn, ...remaining] = handlers;
        if (!remaining.length) return fn(ctx);
        const next = (ctx) => this.chain(ctx, remaining);
        return fn(ctx, next);
    }
}
