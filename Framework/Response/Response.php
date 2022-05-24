<?php

namespace Logeecom\DemoShop\Framework\Response;

class Response implements ResponseInterface
{
    private int $statusCode;
    private array $headers;
    private string $content;

    public function __construct(int $statusCode, array $headers, string $content)
    {
        $this->statusCode = $statusCode;
        $this->headers = $headers;
        $this->content = $content;
    }

    // getter for response status code
    public function getResponseStatusCode(): int
    {
        return $this->statusCode;
    }

    // getter for response header
    public function getResponseHeaders(): array
    {
        return $this->headers;
    }

    // getter for response content
    public function getResponseContent(): string
    {
        return $this->content;
    }

    // function which executes the response
    public function execute(): void
    {
        // virtual function
    }
}