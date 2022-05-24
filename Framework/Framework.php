<?php

namespace Logeecom\DemoShop\Framework;

// Framework class

use Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware\MiddlewareServer;
use Logeecom\DemoShop\Framework\Request\Request;
use Logeecom\DemoShop\Framework\Router\Router;
use Logeecom\DemoShop\Framework\DependencyInjection\DIContainer;
use Logeecom\DemoShop\Framework\ObjectRelationalMapping\ORM;
use ReflectionException;

class Framework
{
    /**
     * @throws ReflectionException
     */
    public static function start(): void
    {
        // initialize ORM by calling getInstance method
        $CapsuleORM = ORM::getInstance();

        // get request
        $request = Request::createRequest();

        // get route
        $router = new Router();
        $route = $router->getRoute($request);

        // create new middleware server which executes middleware
        $middlewareServer = new MiddlewareServer();

        // create middleware chain (at least one default Controller middleware exists in the chain)
        $middleware = DIContainer::getInstance()->get($route->getMiddleware()[0]);

        // link the first item in chain with the rest of the items in the array
        foreach (array_slice($route->getMiddleware(), 1) as $middlewareListItem)
        {
            $middleware->linkWith(DIContainer::getInstance()->get($middlewareListItem));
        }

        // call middleware server to execute
        $middlewareServer->setMiddleware($middleware);
        $middlewareServer->executeMiddleware($route);
    }
}