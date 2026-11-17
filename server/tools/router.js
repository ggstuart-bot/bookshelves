import { NotFoundError } from "./errors.js";

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
        ctx.params = route.pattern.exec(url).pathname.groups;
        return route.handler(ctx);
    }

    chain(ctx, handlers) {
        const [fn, ...remaining] = handlers;
        if (!remaining.length) return fn(ctx);
        const next = (ctx) => this.chain(ctx, remaining);
        return fn(ctx, next);
    }
}
