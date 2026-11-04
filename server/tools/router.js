// Placeholder: this will need to change when we add middleware and URL parameters
export class Router {
    constructor() {
        this.routes = [];
    }

    register(method, path, handler) {
        const pattern = new URLPattern({ pathname: path });
        this.routes.push({ method, pattern, handler });
    }

    get(...args) {
        this.register("GET", ...args);
    }

    handle(ctx) {
        const { url, request } = ctx;
        const route = this.routes.find((route) => {
            return route.method === request.method && route.pattern.test(url);
        });
        if (!route) {
            return;
        }
        return route.handler(ctx);
    }
}
