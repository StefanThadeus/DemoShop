<?php

namespace Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware;

use Logeecom\DemoShop\Framework\Response\Response;
use Logeecom\DemoShop\Framework\Router\Route;

abstract class BaseMiddleware implements MiddlewareInterface
{
    private ?MiddlewareInterface $next = null;
    protected ?Response $response = null;

    public function linkWith(MiddlewareInterface $next): MiddlewareInterface
    {
        $this->next = $next;
        return $next;
    }

    // abstract method to be implemented in concrete handlers
    public function handle(Route $route): Response
    {
        if ($this->next === null) {
            return $this->response;
        }

        return $this->next->handle($route);
    }
}