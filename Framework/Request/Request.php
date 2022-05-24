<?php

namespace Logeecom\DemoShop\Framework\Request;
use Logeecom\DemoShop\Framework\Router\Router;

// singleton Request class
class Request
{
    private static ?HTTPRequest $instance = null;

    private function __construct($method, $url, $params)
    {
        self::$instance = new HTTPRequest($method, $url, $params);
    }

    // create a Request object
    public static function createRequest(): HTTPRequest
    {
        if (!self::$instance) {
            // find method
            $method = $_SERVER['REQUEST_METHOD'];

            // find url
            $url = substr($_GET['url'], strpos($_GET['url'], Router::getBaseURL()));

            // find query parameters
            $url_components = parse_url("$_SERVER[HTTP_HOST] . $_SERVER[REQUEST_URI]");
            $parameters = [];
            parse_str($url_components['query'], $parameters);

            // if POST method, append post parameters too
            if($method === 'POST')
            {
                foreach ($_POST as $key => $value) {
                    $parameters[$key] = $value;
                }
            }

            new Request($method, $url, $parameters);
        }

        return self::$instance;
    }
}