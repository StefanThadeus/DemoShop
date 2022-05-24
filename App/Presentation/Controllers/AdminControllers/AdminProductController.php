<?php

namespace Logeecom\DemoShop\App\Presentation\Controllers\AdminControllers;

use Logeecom\DemoShop\App\BusinessServices\ProductServicesInterface;
use Logeecom\DemoShop\App\DataAccess\Models\Product;
use Logeecom\DemoShop\App\Presentation\Controllers\AdminBaseController;
use Logeecom\DemoShop\Framework\Response\JSONResponse;
use Logeecom\DemoShop\Framework\Response\Response;

class AdminProductController extends AdminBaseController
{
    protected ProductServicesInterface $productServices;

    public function __construct(ProductServicesInterface $productServices)
    {
        parent::__construct();
        $this->productServices = $productServices;
    }

    // returns data for the products panel view
    public function productsData(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);
        $numberOfProducts = $decoded['numberOfProducts'];
        $pageNumber = $decoded['pageNumber'];

        // sort options
        $sortOptions = [];
        $sortOptions['titleSort'] = $decoded['titleSort'];
        $sortOptions['brandSort'] = $decoded['brandSort'];
        $sortOptions['categorySort'] = $decoded['categorySort'];
        $sortOptions['shortDescriptionSort'] = $decoded['shortDescriptionSort'];
        $sortOptions['priceSort'] = $decoded['priceSort'];

        // filter options
        $filterOptions = $decoded['filters'];

        $data = $this->productServices->getProducts($numberOfProducts, $sortOptions, $filterOptions, $pageNumber);

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // changes enabled attribute for the product with the given id
    public function changeEnabledStatus(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);
        $productId = $decoded['productIds'];

        $setEnabledStatus = $decoded['setEnabledStatus'];

        if (is_array($productId)) {
            $data = $this->productServices->batchChangeEnabledStatus($productId, $setEnabledStatus);
        } else {
            $data = $this->productServices->changeEnabledStatus($productId, $setEnabledStatus);
        }

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // delete product with the given id
    public function deleteProduct(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);
        $productId = $decoded['productIds'];

        if (is_array($productId)) {
            $data = $this->productServices->batchDeleteProducts($productId);
        } else {
            $data = $this->productServices->deleteProduct($productId);
        }

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // add product to the database
    public function addProduct(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);

        $product = new Product();
        $product->title = $decoded['productTitle'];
        $product->sku = $decoded['productSKU'];
        $product->brand = $decoded['productBrand'];
        $product->categoryId = $decoded['productCategory'];
        $product->price = $decoded['productPrice'];
        $product->shortDescription = $decoded['productShortDescription'];
        $product->description = $decoded['productDescription'];
        $product->enabled = $decoded['productEnabled'];
        $product->featured = $decoded['productFeatured'];
        $product->image = $decoded['productImageSource'];

        $data = $this->productServices->addProduct($product);

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // update product in the database
    public function updateProduct(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);

        $product = new Product();
        $product->id = $decoded['productId'];
        $product->title = $decoded['productTitle'];
        $product->sku = $decoded['productSKU'];
        $product->brand = $decoded['productBrand'];
        $product->categoryId = $decoded['productCategory'];
        $product->price = $decoded['productPrice'];
        $product->shortDescription = $decoded['productShortDescription'];
        $product->description = $decoded['productDescription'];
        $product->enabled = $decoded['productEnabled'];
        $product->featured = $decoded['productFeatured'];
        $product->image = $decoded['productImageSource'];
        $imageChanged = $decoded['productImageChanged'];

        $data = $this->productServices->updateProduct($product, $imageChanged);

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // retrieves data for a single product, identified by the provided SKU which are unique
    public function productData(array $params): Response
    {
        $postInput = file_get_contents('php://input');
        $decoded = json_decode($postInput, true);

        $sku = $decoded['sku'];

        $data = $this->productServices->getProduct($sku);

        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }

    // returns filter options to product view, namely list of brands and categories
    public function getFilterOptions(array $params): Response
    {
        $data = $this->productServices->getFilterOptions();
        $header = array('Content-Type: application/json');
        $statusCode = 200;

        return new JSONResponse($statusCode, $header, json_encode($data));
    }
}