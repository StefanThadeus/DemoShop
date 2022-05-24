<?php

namespace Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware;

use Logeecom\DemoShop\Framework\DependencyInjection\DIContainer;
use Logeecom\DemoShop\Framework\Response\Response;
use Logeecom\DemoShop\Framework\Router\Route;
use ReflectionException;

class ControllerMiddleware extends BaseMiddleware
{
    public function __construct()
    {
    }

    /**
     * @throws ReflectionException
     */
    public function handle(Route $route): Response
    {
        $controller = DIContainer::getInstance()->resolveDependency($route->getController());

        // call controller and save response
        $method = $route->getMethod();
        $params = $route->getParams();
        $response = $controller->$method($params);
        $this->response = $response;

        // if successfully authenticated, try to call the next member of chain (handle implementation of the base class)
        return parent::handle($route);
    }
}