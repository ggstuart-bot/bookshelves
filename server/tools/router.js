// Placeholder: this will need to change when we add middleware and URL parameters
export class Router {
    constructor() {
        this.routes = [];
    }

    register(pathname, handler) {
        const pattern = new URLPattern({ pathname });
        this.routes.push({ pattern, handler });
    }

    handle(ctx) {
        const { url } = ctx;
        const route = this.routes.find((route) => {
            return route.pattern.test(url);
        });
        if (!route) {
            return;
        }
        return route.handler(ctx);
    }
}
