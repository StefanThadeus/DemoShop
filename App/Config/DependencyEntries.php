<?php /** @noinspection ALL */

use Logeecom\DemoShop\App\BusinessServices\AdminRepositoryInterface;
use Logeecom\DemoShop\App\BusinessServices\ProductRepositoryInterface;
use Logeecom\DemoShop\App\BusinessServices\LoginServicesInterface;
use Logeecom\DemoShop\App\BusinessServices\DashboardServicesInterface;
use Logeecom\DemoShop\App\BusinessServices\ProductServicesInterface;
use Logeecom\DemoShop\App\BusinessServices\StorageRepositoryInterface;
use Logeecom\DemoShop\App\BusinessServices\LoginService;
use Logeecom\DemoShop\App\BusinessServices\DashboardService;
use Logeecom\DemoShop\App\BusinessServices\ProductService;
use Logeecom\DemoShop\App\BusinessServices\CategoryServicesInterface;
use Logeecom\DemoShop\App\BusinessServices\CategoryService;
use Logeecom\DemoShop\App\DataAccess\Repositories\MySQLAdminRepository;
use Logeecom\DemoShop\App\DataAccess\Repositories\MySQLProductRepository;
use Logeecom\DemoShop\App\DataAccess\Repositories\MySQLCategoryRepository;
use Logeecom\DemoShop\App\DataAccess\Repositories\StorageRepository;
use Logeecom\DemoShop\Config\DatabaseConnection;
use Logeecom\DemoShop\Framework\DependencyInjection\DIContainer;
use Logeecom\DemoShop\Framework\DependencyInjection\DIService;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers\AdminDashboardController;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers\AdminProductsController;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers\AdminCategoryController;
use Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware\UserAuthenticationMiddleware;
use Logeecom\DemoShop\Framework\ChainOfResponsibilityMiddleware\ControllerMiddleware;

/*
    ClassX::class => new DIService(bool, callback)

    bool -> tells if class is singleton

    callback -> anonymous function (of type Closure) which returns class instance, like:
    return new LoginService(DIContainer::getInstance()->get(ServiceClassB::class));
 */

return [
    FrontEndLoginController::class => new DIService(false, function () {
        return new FrontEndLoginController(DIContainer::getInstance()->get(LoginServicesInterface::class));
    }),
    AdminDashboardController::class => new DIService(false, function () {
        return new AdminDashboardController(DIContainer::getInstance()->get(LoginServicesInterface::class), DIContainer::getInstance()->get(DashboardServicesInterface::class));
    }),
    AdminProductsController::class => new DIService(false, function () {
        return new AdminProductsController(DIContainer::getInstance()->get(ProductServicesInterface::class));
    }),
    AdminCategoryController::class => new DIService(false, function () {
        return new AdminCategoryController(DIContainer::getInstance()->get(CategoryServicesInterface::class));
    }),
    LoginServicesInterface::class => new DIService(false, function () {
        return new LoginService(DIContainer::getInstance()->get(AdminRepositoryInterface::class));
    }),
    DashboardServicesInterface::class => new DIService(false, function () {
        return new DashboardService(DIContainer::getInstance()->get(ProductRepositoryInterface::class), DIContainer::getInstance()->get(CategoryRepositoryInterface::class));
    }),
    ProductServicesInterface::class => new DIService(false, function () {
        return new ProductService(DIContainer::getInstance()->get(ProductRepositoryInterface::class), DIContainer::getInstance()->get(CategoryRepositoryInterface::class), DIContainer::getInstance()->get(StorageRepositoryInterface::class));
    }),
    CategoryServicesInterface::class => new DIService(false, function () {
        return new CategoryService(DIContainer::getInstance()->get(CategoryRepositoryInterface::class));
    }),
    AdminRepositoryInterface::class => new DIService(false, function () {
        return new MySQLAdminRepository();
    }),
    ProductRepositoryInterface::class => new DIService(false, function () {
        return new MySQLProductRepository();
    }),
    StorageRepositoryInterface::class => new DIService(false, function () {
        return new StorageRepository();
    }),
    CategoryRepositoryInterface::class => new DIService(false, function () {
        return new MySQLCategoryRepository();
    }),
    UserAuthenticationMiddleware::class => new DIService(false, function () {
        return new UserAuthenticationMiddleware(DIContainer::getInstance()->get(LoginServicesInterface::class), 'errorUnauthorizedAccess');
    }),
    ControllerMiddleware::class => new DIService(false, function () {
        return new ControllerMiddleware();
    }),
    DatabaseConnection::class => new DIService(true, function () {
        return DatabaseConnection::getInstance();
    })
];
