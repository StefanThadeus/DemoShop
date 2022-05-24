<?php

namespace Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware;

use Logeecom\DemoShop\Framework\Response\Response;
use Logeecom\DemoShop\Framework\Router\Route;

interface MiddlewareInterface
{
    public function handle(Route $route): Response;
    public function linkWith(BaseMiddleware $next): MiddlewareInterface;
}