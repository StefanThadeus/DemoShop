<?php

namespace Logeecom\DemoShop\App\BusinessServices;

use Logeecom\DemoShop\App\DataAccess\Models\Product;
use Exception;

class ProductService implements ProductServicesInterface
{
    protected ProductRepositoryInterface $dbProduct;
    protected CategoryRepositoryInterface $dbCategory;
    protected StorageRepositoryInterface $fileStorage;

    public function __construct(ProductRepositoryInterface $dbProductImplementation, CategoryRepositoryInterface $dbCategoryImplementation, StorageRepositoryInterface $fileStorageImplementation)
    {
        $this->dbProduct = $dbProductImplementation;
        $this->dbCategory = $dbCategoryImplementation;
        $this->fileStorage = $fileStorageImplementation;
    }

    public function getProducts(int $numOfProducts, array $sortOptions, array $filterOptions, int $pageNumber = 1): array
    {
        return $this->dbProduct->getProducts($numOfProducts, $sortOptions, $filterOptions, $pageNumber);
    }

    public function changeEnabledStatus(int $productId, bool $setEnabledStatus): array
    {
        return $this->dbProduct->changeEnabledStatus($productId, $setEnabledStatus);
    }

    public function deleteProduct(int $productId): array
    {
        return $this->dbProduct->deleteProduct($productId);
    }

    public function addProduct(Product $product): array
    {
        try {
            $this->dbProduct->beginTransaction();

            // initialise view count
            $product->viewCount = 0;

            // if image is provided
            if ($product->image != '') {

                // find image extension from Base64 format string
                $imageExtension = explode('/', mime_content_type($product->image))[1];
                $image = base64_decode(explode(',', $product->image)[1]);

                // name image by concatenating SKU and its extension (product SKU is unique)
                $product->image = $product->sku . '.' . $imageExtension;
            }

            // add product to database
            $data = $this->dbProduct->addProduct($product);

            // if image is provided
            if ($product->image != '') {

                // write image into file
                $this->fileStorage->storeFile($product->sku . '.' . $imageExtension, $image);
            }

            $this->dbProduct->commitTransaction();

            return $data;
        } catch (Exception $e) {
            $this->dbProduct->rollbackTransaction();

            $data = [];
            $data['operationSuccess'] = false;
            $data['errorCode'] = '507';
            $data['errorMessage'] = 'Server was unable to add new product.';
            return $data;
        }
    }

    public function getProduct(string $sku): array
    {
        $data = $this->dbProduct->getProductBySKU($sku);

        if ($data['product']->image) {
            $data['image'] = $this->fileStorage->getFile($data['product']->image);
        }

        return $data;
    }

    public function updateProduct(Product $product, bool $imageChanged): array
    {
        try {
            $this->dbProduct->beginTransaction();

            if ($product->image != '' && $imageChanged) {

                // find image extension from Base64 format string
                $imageExtension = explode('/', mime_content_type($product->image))[1];
                $image = base64_decode(explode(',', $product->image)[1]);

                // name image by concatenating SKU and its extension (product SKU is unique)
                $product->image = $product->sku . '.' . $imageExtension;
            }

            // update product in the database
            $data = $this->dbProduct->updateProduct($product, $imageChanged);

            // if image is provided
            if ($product->image != '' && $imageChanged) {
                // get original product
                $originalProduct = $this->dbProduct->getProductById($product->id)['product'];

                // delete previous image
                $this->fileStorage->deleteFile($originalProduct->image);

                // write image into file
                $this->fileStorage->storeFile($product->sku . '.' . $imageExtension, $image);
            }

            $this->dbProduct->commitTransaction();

            return $data;
        } catch (Exception $e) {
            $this->dbProduct->rollbackTransaction();

            $data = [];
            $data['operationSuccess'] = false;
            $data['errorCode'] = '507';
            $data['errorMessage'] = 'Server was unable to update product.';
            return $data;
        }
    }

    public function getFilterOptions(): array
    {
        $data['brandList'] = $this->dbProduct->getBrandList();
        $data['categoryList'] = $this->dbCategory->getCategoryList();
        return $data;
    }

    public function batchChangeEnabledStatus(array $productIds, bool $setEnabledStatus): array
    {
        try {
            $this->dbProduct->beginTransaction();
            foreach ($productIds as $productId) {
                $this->dbProduct->changeEnabledStatus($productId, $setEnabledStatus);
            }
            $this->dbProduct->commitTransaction();

            $data['operationSuccess'] = true;
            return $data;
        } catch (Exception $e) {
            $this->dbProduct->rollbackTransaction();

            $data = [];
            $data['operationSuccess'] = false;
            $data['errorCode'] = '507';
            $data['errorMessage'] = 'Server was unable to update product statuses.';
            return $data;
        }
    }

    public function batchDeleteProducts(array $productIds): array
    {
        try {
            $this->dbProduct->beginTransaction();
            foreach ($productIds as $productId) {
                $this->dbProduct->deleteProduct($productId);
            }
            $this->dbProduct->commitTransaction();

            $data['operationSuccess'] = true;
            return $data;
        } catch (Exception $e) {
            $this->dbProduct->rollbackTransaction();

            $data = [];
            $data['operationSuccess'] = false;
            $data['errorCode'] = '507';
            $data['errorMessage'] = 'Server was unable to delete selected products.';
            return $data;
        }
    }
}