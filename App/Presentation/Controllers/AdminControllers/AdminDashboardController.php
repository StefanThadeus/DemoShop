<?php

namespace Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers;

use Logeecom\DemoShop\App\BusinessServices\LoginServicesInterface;
use Logeecom\DemoShop\App\BusinessServices\DashboardServicesInterface;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminBaseController;
use Logeecom\DemoShop\Framework\Response\HTMLResponse;
use Logeecom\DemoShop\Framework\Response\JSONResponse;
use Logeecom\DemoShop\Framework\Response\RedirectResponse;
use Logeecom\DemoShop\Framework\Response\Response;

class AdminDashboardController extends AdminBaseController
{
    protected LoginServicesInterface $adminLoginServices;
    protected DashboardServicesInterface $dashboardServices;

    public function __construct(LoginServicesInterface $adminLoginServices, DashboardServicesInterface $dashboardServices)
    {
        parent::__construct();
        $this->adminLoginServices = $adminLoginServices;
        $this->dashboardServices = $dashboardServices;
    }

    // returns login page
    public function index(array $params): Response
    {
        $viewData = array();

        $view = $this->getView($this->viewDirectory . 'adminDashboard');

        $header = array('Content-Type: text/html');
        $statusCode = 200;

        return new HTMLResponse($statusCode, $header, $view, $viewData);
    }

    // logs out user
    public function logout(array $params): Response
    {
        // invalidate token
        $this->adminLoginServices->logOutUser();

        // route to user log in
        $address = 'login';

        $header = array('Content-Type: text/html');
        $statusCode = 302;

        return new RedirectResponse($statusCode, $header, $address);
    }

    // returns data for the dashboard panel view
    public function dashboardData(array $params): Response
    {
        $data = $this->dashboardServices->getDashboardData();

        // no homepage so far, mock value
        $data['numOfHomepageOpenings'] = 52794;

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }
}