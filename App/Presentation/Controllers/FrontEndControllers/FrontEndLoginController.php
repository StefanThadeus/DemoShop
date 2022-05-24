<?php

namespace Logeecom\DemoShop\App\Presentation\Controllers\FrontEndControllers;

use Logeecom\DemoShop\App\BusinessServices\LoginServicesInterface;
use Logeecom\DemoShop\App\Presentation\Controllers\FrontEndBaseController;
use Logeecom\DemoShop\Framework\Response\HTMLResponse;
use Logeecom\DemoShop\Framework\Response\RedirectResponse;
use Logeecom\DemoShop\Framework\Response\Response;

class FrontEndLoginController extends FrontEndBaseController
{
    protected LoginServicesInterface $adminServices;

    public function __construct(LoginServicesInterface $adminServices)
    {
        parent::__construct();
        $this->adminServices = $adminServices;
    }

    // returns login page
    public function index(array $params): Response
    {
        // check if already logged in, if so, redirect to dashboard
        $isLoggedIn = $this->adminServices->checkIfLoggedIn();
        if($isLoggedIn)
        {
            $view = 'dashboard';

            $header = array('Content-Type: text/html');
            $statusCode = 302;

            return new RedirectResponse($statusCode, $header, $view);
        }

        $viewData = array();
        $view = $this->getView($this->viewDirectory . 'login');

        $header = array('Content-Type: text/html');
        $statusCode = 200;

        return new HTMLResponse($statusCode, $header, $view, $viewData);
    }

    // checks form data, if valid, logs in user if successfully authenticated,
    // else, stays on login page with the error displayed
    public function login(array $params): Response
    {
        // assume failed login attempt
        $loginSuccess = false;
        $errorMessage = 'User with provided credentials does not exist.';

        // get post data
        $username = $params['username'];
        $password = $params['password'];
        $keepLoggedIn = $params['keepLoggedIn'];

        // check if username and password in correct format: false if not
        // username: cannot contain special characters (to prevent SQL injection)
        $pattern = "/(^[A-Za-z0-9]+$)/";
        $regexCheckUsername = preg_match($pattern, $username);

        // password: first character must be small letter, last character a capital letter,
        // and between them zero or more groups of number-special character pairs
        $pattern = "/(^[a-z]([0-9][$&+,:;~=?@#|'<>.-^*()%!])+[A-Z]$)/";
        $regexCheckPassword = preg_match($pattern, $password);

        // if regex check passes, get admin from database
        if ($regexCheckUsername and $regexCheckPassword) {
            $hashedPassword = hash('sha256', $password);

            $adminId = $this->adminServices->getAdminIdByUsername($username);
            $adminPassword = $this->adminServices->getAdminPasswordByUsername($username);

            // id = null if admin not found, else, authentication success, user can log in
            if ($adminId != null and $hashedPassword === $adminPassword) {
                $loginSuccess = true;
            }
        } else {
            // write error message, regex failed
            $errorMessage = 'Username or password not in correct format!';
        }

        // user found, proceed to log user in
        if ($loginSuccess === true) {

            // log in user
            $this->adminServices->logInUser($username, isset($keepLoggedIn));

            $view = 'dashboard';

            $header = array('Content-Type: text/html');
            $statusCode = 302;

            return new RedirectResponse($statusCode, $header, $view);
        } else {
            // authentication failed, stay on login page with error message
            $viewData = array('authenticationFailed' => true, 'errorMessage' => $errorMessage, 'username' => $username, 'password' => $password);
            $view = $this->getView($this->viewDirectory . 'login');

            $header = array('Content-Type: text/html');
            $statusCode = 401;

            return new HTMLResponse($statusCode, $header, $view, $viewData);
        }
    }
}