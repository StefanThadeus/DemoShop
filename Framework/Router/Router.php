<?php

namespace Logeecom\DemoShop\Framework\Router;
use Logeecom\DemoShop\Framework\Request\HTTPRequest;

// Router class which chooses the correct controller and method from the URL
class Router
{
    private array $routes;

    // load list of all routes
    public function __construct()
    {
        // load list of all controllers and their methods that may be referred to via URL
        $this->routes = require $_SERVER['DOCUMENT_ROOT'] . '/../App/Config/Routes.php';
    }

    // returns route object with controller, method and params information if route found, null if not
    public function getRoute(HTTPRequest $request): ?Route
    {
        foreach ($this->routes as $route)
        {
            if($route['request'] === $request->getMethod())
            {
                $pattern = $route['path'];
                // see if route regex matches
                if (preg_match($pattern, $request->getURL(), $matches)) {

                    // route match found, pass arguments (captured as groups) if there are any (which begin from index 1)
                    // group at index 0 is the whole match without the separated arguments
                    $params = array_slice($matches, 1);

                    // add query arguments if there are any
                    $params = array_merge($params, $request->getParams());

                    // fill middleware list if middleware is bound to this route
                    $middlewareList = [];
                    foreach ($route['middleware'] as $middleware)
                    {
                        $middlewareList[] = $middleware;
                    }

                    return new Route($route['controller'], $route['method'], $params, $middlewareList);
                }
            }
        }

        return null;
    }

    // returns the base website URL to method caller
    public static function getBaseURL(): string
    {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? 'https://' : 'http://';
        $domainName = $_SERVER['HTTP_HOST'] . '/';

        return $protocol . $domainName;
    }
}
