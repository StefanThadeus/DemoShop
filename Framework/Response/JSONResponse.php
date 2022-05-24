<?php

namespace Logeecom\DemoShop\Framework\Response;

class JSONResponse extends Response
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

        // TODO: return JSON content
        echo $this->getResponseContent();
    }
}