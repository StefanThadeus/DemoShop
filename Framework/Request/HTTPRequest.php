<?php

namespace Logeecom\DemoShop\Framework\Request;

class HTTPRequest
{
    private string $httpMethod = "";
    private string $URL = "";
    private array $params = [];

    public function __construct($method, $URL, $params)
    {
        $this->httpMethod = $method;
        $this->URL = $URL;
        $this->params = $params;
    }

    // return Request Method
    public function getMethod(): string
    {
        return $this->httpMethod;
    }

    // return Request URL
    public function getURL(): string
    {
        return $this->URL;
    }

    // return Request params
    public function getParams(): array
    {
        return $this->params;
    }
}