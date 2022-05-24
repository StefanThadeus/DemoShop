<?php

namespace Logeecom\DemoShop\App\Presentation\Controllers\FrontEndControllers;

use Logeecom\DemoShop\App\Presentation\Controllers\FrontEndBaseController;
use Logeecom\DemoShop\Framework\Response\HTMLResponse;

class FrontEndErrorController extends FrontEndBaseController
{
    // changes view to "page not found" error page
    public function errorPageNotFound(array $params): HTMLResponse
    {
        $view = $this->getView($this->viewDirectory . 'errorPage');

        $header = array("Content-Type: text/html");
        $statusCode = 404;

        $viewData = array('heading' => 'Something seems to be missing...', 'message' => 'Error 404: The resource does not exist.');

        return new HTMLResponse($statusCode, $header, $view, $viewData);
    }
    // changes view to "page not found" error page
    public function errorUnauthorizedAccess(array $params): HTMLResponse
    {
        $view = $this->getView($this->viewDirectory . 'errorPage');

        $header = array('Content-Type: text/html');
        $statusCode = 404;

        $viewData = array('heading' => 'It seems like there was a mistake...', 'message' => 'Error 401: Unauthorized access for requested resource.');

        return new HTMLResponse($statusCode, $header, $view, $viewData);
    }
}