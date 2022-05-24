<?php

namespace Logeecom\DemoShop\App\Presentation\Controllers;

class BaseController
{
    // directory with view HTML files
    public string $viewDirectory =  '/App/Presentation/Views/';

    // Load the view (checks for the file)
    public function getView($view): string
        {//return view path
        if (file_exists(__DIR__ . '/../../..' . $view . '.php')) {
            return __DIR__ . '/../../..' . $view . '.php';
        } else {
           return 'View does not exist!';
        }
    }
}