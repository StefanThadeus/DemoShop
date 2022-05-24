<?php

namespace Logeecom\DemoShop\Framework\Response;

class HTMLResponse extends Response
{
    private array $viewData;

    public function __construct(int $statusCode, array $headers, string $content, array $viewData = [])
    {
        parent::__construct($statusCode, $headers, $content);
        $this->viewData = $viewData;
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

        // display views
        echo $this->getView($this->getResponseContent(), $this->viewData);
    }

    // fetch the view from path provided inside the response content
    private function getView(string $resourcePath, array $data): string
    {
        // start output buffer, the 'require' below won't display the contents immediately to screen,
        // but will fill the buffer instead
        ob_start();

        require $resourcePath;

        // return the buffer content as string and empty the buffer after
        return ob_get_clean();
    }
}