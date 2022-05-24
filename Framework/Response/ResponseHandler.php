<?php

namespace Logeecom\DemoShop\Framework\Response;

class ResponseHandler
{
    // Hold the class instance.
    private static ?ResponseHandler $instance = null;

    // private constructor to forbid instantiation from the outside
    private function __construct()
    {
    }

    // The object is created from within the class itself
    // only if the class has no instance.
    public static function getInstance(): ?ResponseHandler
    {
        if (self::$instance == null) {
            self::$instance = new ResponseHandler();
        }

        return self::$instance;
    }

    public function handleResponse(Response $response): void
    {
        $response->execute();
    }
}