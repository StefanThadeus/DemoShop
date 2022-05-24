<?php

namespace Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware;

use Logeecom\DemoShop\Framework\Response\ResponseHandler;
use Logeecom\DemoShop\Framework\Router\Route;

class MiddlewareServer
{
    private MiddlewareInterface $middleware;

    // set middleware
    public function setMiddleware(MiddlewareInterface $middleware): void
    {
        $this->middleware = $middleware;
    }

    // the server gets a route from the client and sends the
    // authorization request to the middleware
    public function executeMiddleware(Route $route): void
    {
        // start executing the middleware chain
        $response = $this->middleware->handle($route);

        // execute the response returned from the middleware chain
        ResponseHandler::getInstance()->handleResponse($response);
    }
}