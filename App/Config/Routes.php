<?php

use Logeecom\DemoShop\App\Presentation\Controllers\FrontEndControllers\FrontEndErrorController;
use Logeecom\DemoShop\App\Presentation\Controllers\FrontEndControllers\FrontEndLoginController;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers\AdminDashboardController;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers\AdminCategoryController;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers\AdminProductController;
use Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware\UserAuthenticationMiddleware;
use Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware\ControllerMiddleware;

return [
    [
        // render the login page, redirects to dashboard if already logged in
        'path' => '{login}',
        'request' => 'GET',
        'controller' => FrontEndLoginController::class,
        'method' => 'index',
        'middleware' => [ControllerMiddleware::class]
    ],
    [
        // authenticate and login Admin user
        'path' => '{login}',
        'request' => 'POST',
        'controller' => FrontEndLoginController::class,
        'method' => 'login',
        'middleware' => [ControllerMiddleware::class]
    ],
    [
        // get dashboard data via ajax call
        'path' => '{api/statistics}',
        'request' => 'GET',
        'controller' => AdminDashboardController::class,
        'method' => 'dashboardData',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // get products data via ajax call
        'path' => '{api/products}',
        'request' => 'POST',
        'controller' => AdminProductController::class,
        'method' => 'productsData',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // get single product data via ajax call
        'path' => '{api/product-by-sku}',
        'request' => 'POST',
        'controller' => AdminProductController::class,
        'method' => 'productData',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // change product enabled status via ajax call
        'path' => '{api/product-change-enabled-status}',
        'request' => 'POST',
        'controller' => AdminProductController::class,
        'method' => 'changeEnabledStatus',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // delete product via ajax call
        'path' => '{api/delete-product}',
        'request' => 'POST',
        'controller' => AdminProductController::class,
        'method' => 'deleteProduct',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // add product via ajax call
        'path' => '{api/add-product}',
        'request' => 'POST',
        'controller' => AdminProductController::class,
        'method' => 'addProduct',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // update product via ajax call
        'path' => '{api/update-product}',
        'request' => 'POST',
        'controller' => AdminProductController::class,
        'method' => 'updateProduct',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // returns list of filter options to product view, namely list of brands and categories
        'path' => '{api/filter-options}',
        'request' => 'GET',
        'controller' => AdminProductController::class,
        'method' => 'getFilterOptions',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // get product-categories data via ajax call
        'path' => '{api/product-categories}',
        'request' => 'GET',
        'controller' => AdminCategoryController::class,
        'method' => 'productCategoriesData',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // get product-subcategories data via ajax call
        'path' => '{api/product-subcategories}',
        'request' => 'POST',
        'controller' => AdminCategoryController::class,
        'method' => 'productSubcategoriesData',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // get category data via ajax call
        'path' => '{api/category-data}',
        'request' => 'POST',
        'controller' => AdminCategoryController::class,
        'method' => 'categoryData',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // add category with given data via ajax call
        'path' => '{api/add-category}',
        'request' => 'POST',
        'controller' => AdminCategoryController::class,
        'method' => 'addCategory',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // delete category with given data via ajax call
        'path' => '{api/delete-category}',
        'request' => 'POST',
        'controller' => AdminCategoryController::class,
        'method' => 'deleteCategory',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // delete category with given data via ajax call
        'path' => '{api/update-category}',
        'request' => 'POST',
        'controller' => AdminCategoryController::class,
        'method' => 'updateCategory',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // add category with given data via ajax call
        'path' => '{api/get-all-categories}',
        'request' => 'GET',
        'controller' => AdminCategoryController::class,
        'method' => 'getAllCategories',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // render the dashboard page
        'path' => '{dashboard}',
        'request' => 'GET',
        'controller' => AdminDashboardController::class,
        'method' => 'index',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // logout user
        'path' => '{logout}',
        'request' => 'GET',
        'controller' => AdminDashboardController::class,
        'method' => 'logout',
        'middleware' => [UserAuthenticationMiddleware::class, ControllerMiddleware::class]
    ],
    [
        // catch two arguments after controller and method name
        'path' => '{c1\/m1\/([^\/]*)\/([^\/]*)}',
        'request' => 'GET',
        'controller' => BaseControllerOne::class,
        'method' => 'methodOne'
    ],
    [   // for route not found, controller to display error 401, must be last in the list
        'path' => '{errorUnauthorizedAccess}',
        'request' => 'GET',
        'controller' => FrontEndErrorController::class,
        'method' => 'errorUnauthorizedAccess',
        'middleware' => [ControllerMiddleware::class]
    ],
    [   // for route not found, controller to display error 404, must be last in the list
        'path' => '{.*}',
        'request' => 'GET',
        'controller' => FrontEndErrorController::class,
        'method' => 'errorPageNotFound',
        'middleware' => [ControllerMiddleware::class]
    ],
];