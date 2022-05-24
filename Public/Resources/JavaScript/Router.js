class Router {

    constructor() {
        // array of routes, which are pairs of url paths and corresponding controller names and methods, as well as server request path
        this.routes = [
            {
                path: new RegExp('^http://demoshop.test:8080/dashboard$'),
                controller: DashboardController,
                method: 'getView',
                requestPath: 'api/statistics'
            },
            {
                path: new RegExp('^http://demoshop.test:8080/dashboard#dashboard$'),
                controller: DashboardController,
                method: 'getView',
                requestPath: 'api/statistics'
            },
            {
                path: new RegExp('^http:\\/\\/demoshop.test:8080\\/dashboard#products(\\?{1}[A-Za-z0-9=,\\[\\]&%-\']+)?$'),
                controller: ProductsController,
                method: 'getView',
                requestPath: 'api/products'
            },
            {
                path: new RegExp('^http://demoshop.test:8080/dashboard#product-categories$'),
                controller: ProductCategoriesController,
                method: 'getView',
                requestPath: 'api/product-categories'
            },
            {
                path: new RegExp('^http://demoshop.test:8080/dashboard#products/create$'),
                controller: ProductsController,
                method: 'getProductCreateView',
                requestPath: 'api/get-all-categories'
            },
            {
                path: new RegExp('^http:\\/\\/demoshop.test:8080\\/dashboard#products\\/[a-zA-z0-9-]+$'),
                controller: ProductsController,
                method: 'getProductEditView',
                requestPath: 'api/get-all-categories'
            }
        ];

        // variable which holds information about controller name and action it needs to execute
        this.routeFound = {};
    }

    // load appropriate view based on url
    navigate() {
        // find controller name based on url
        this.routeFound = this.findRoute(this.routes);

        // call controller and action, with the server request path as argument
        let controller = new this.routeFound['controller'];
        let method = this.routeFound['method'];
        controller[method](this.routeFound['requestPath']);
    }

    // returns controller name based on url
    findRoute(routes) {
        let foundRoute = '';
        for (let i = 0; i < routes.length; i++) {
            let path = routes[i]['path'];
            if (path.test(window.location.href)) {
                //if found, return object containing controller and method info
                foundRoute = routes[i];
                break;
            }
        }

        // default page not found route
        if (foundRoute === '') {
            foundRoute = {
                controller: ErrorController,
                method: 'pageNotFound',
                requestPath: 'pageNotFound'
            };
        }

        return foundRoute;
    }
}