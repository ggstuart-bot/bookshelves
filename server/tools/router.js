// Placeholder: this will need to change when we add middleware and URL parameters
export class Router {
    constructor() {
        this.routes = [];
    }

    register(method, pathname, handler) {
        const pattern = new URLPattern({ pathname });
        this.routes.push({ method, pattern, handler });
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
