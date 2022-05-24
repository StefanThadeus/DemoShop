<?php

namespace Logeecom\DemoShop\Framework\Router;

class Route
{
    private string $controller;
    private string $method;
    private array $params;
    private array $middleware;

    public function __construct(string $controller, string $method, array $params, array $middleware = [])
    {
        $this->controller = $controller;
        $this->method = $method;
        $this->params = $params;
        $this->middleware = $middleware;
    }

    public function getController(): string
    {
        return $this->controller;
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getParams(): array
    {
        return $this->params;
    }

    public function getMiddleware(): array
    {
        return $this->middleware;
    }
}