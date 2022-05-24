<?php

namespace Logeecom\DemoShop\Framework\Response;
use Logeecom\DemoShop\Framework\Router\Router;

class RedirectResponse extends Response
{
    public function __construct(int $statusCode, array $headers, string $content)
    {
        parent::__construct($statusCode, $headers, $content);
    }

    public function execute(): void
    {
        // set response code
        http_response_code($this->getResponseStatusCode());

        // set headers
        foreach ($this->getResponseHeaders() as $header)
        {
            header($header);
        }

        // redirect, content has the address route for redirection
        $baseURL = Router::getBaseURL();
        header("LOCATION: " . $baseURL . $this->getResponseContent());
    }
}