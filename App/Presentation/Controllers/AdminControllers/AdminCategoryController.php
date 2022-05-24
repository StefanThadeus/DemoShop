<?php

namespace Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers;

use Logeecom\DemoShop\App\BusinessServices\CategoryServicesInterface;
use Logeecom\DemoShop\App\DataAccess\Models\Category;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminBaseController;
use Logeecom\DemoShop\Framework\Response\JSONResponse;
use Logeecom\DemoShop\Framework\Response\Response;

class AdminCategoryController extends AdminBaseController
{
    protected CategoryServicesInterface $categoryServices;

    public function __construct(CategoryServicesInterface $categoryServices)
    {
        parent::__construct();
        $this->categoryServices = $categoryServices;
    }

    // returns data for the product categories panel view
    public function productCategoriesData(array $params): Response
    {
        // returns all root categories titles and whether they have subcategories
        $data = $this->categoryServices->getAllRootCategories();

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // returns subcategories data to the product categories panel view for the given parentId
    public function productSubcategoriesData(array $params): Response
    {
        // returns all subcategories titles and whether they have subcategories
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);
        $parentId = $decoded['parentId'];

        $data = $this->categoryServices->getSubcategories($parentId);

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // returns category data to the product categories panel view for the given categoryId
    public function categoryData(array $params): Response
    {
        // returns all subcategories titles and whether they have subcategories
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);
        $categoryId = $decoded['categoryId'];

        $data = $this->categoryServices->getCategoryData($categoryId);

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // adds category with the given data to database
    public function addCategory(array $params): Response
    {
        // returns all subcategories titles and whether they have subcategories
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);

        $category = new Category();
        $category->title = $decoded['title'];;

        if ($decoded['parentId'] != 0) {
            $category->parentId = $decoded['parentId'];
        }
        $category->code = $decoded['code'];
        $category->description = $decoded['description'];


        $operationSuccess = $this->categoryServices->addCategory($category);

        $header = array('Content-Type: application/json');
        $statusCode = 200;
        $data = $operationSuccess;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // returns all categories in a hierarchical structure
    public function getAllCategories(array $params): Response
    {
        $header = array('Content-Type: application/json');
        $statusCode = 200;
        $data = $this->categoryServices->getAllCategories();

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // deletes category with the given data from the database
    public function deleteCategory(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);

        $header = array('Content-Type: application/json');
        $statusCode = 200;
        $data = $this->categoryServices->deleteCategory($decoded['deleteId']);

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // updates category with the given data in the database
    public function updateCategory(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);

        $title = $decoded['title'];
        $description = $decoded['description'];
        $code = $decoded['code'];
        $parentId = $decoded['parentId'];
        $id = $decoded['id'];

        $header = array('Content-Type: application/json');
        $statusCode = 200;
        $data = $this->categoryServices->updateCategory($id, $title, $description, $code, $parentId);

        return new JSONResponse($statusCode, $header, json_encode($data));
    }
}