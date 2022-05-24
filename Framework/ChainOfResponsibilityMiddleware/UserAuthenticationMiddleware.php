<?php

namespace Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware;

use Logeecom\DemoShop\App\BusinessServices\LoginServicesInterface;
use Logeecom\DemoShop\Framework\DependencyInjection\DIContainer;
use Logeecom\DemoShop\Framework\Response\RedirectResponse;
use Logeecom\DemoShop\Framework\Response\Response;
use Logeecom\DemoShop\Framework\Router\Route;
use ReflectionException;

class UserAuthenticationMiddleware extends BaseMiddleware
{
    private string $unauthorizedErrorURL;

    // service to help authenticate user
    private LoginServicesInterface $authenticationService;

    public function __construct(LoginServicesInterface $authenticationService, string $url)
    {
        $this->authenticationService = $authenticationService;
        $this->unauthorizedErrorURL = $url;
    }

    /**
     * @throws ReflectionException
     */
    public function handle(Route $route): Response
    {
        // route that was passed to this middleware requires it to be authenticated
        // user which is not logged in must not gain access to this route, exception should be thrown
        // implement logic specific to this handler
        // authenticate user
        if ($this->authenticationService->checkIfLoggedIn()) {
            // successful authentication

            // get dependency
            $controller = DIContainer::getInstance()->resolveDependency($route->getController());

            // call controller and save response
            $method = $route->getMethod();
            $params = $route->getParams();
            $response = $controller->$method($params);
            $this->response = $response;
            return $response;
        } else {
            // authentication failed,
            // route which will result in displaying unauthorized access error
            $address = $this->unauthorizedErrorURL;

            $header = array('Content-Type: text/html');
            $statusCode = 302;

            $response = new RedirectResponse($statusCode, $header, $address);
            return $response;
        }
    }
}