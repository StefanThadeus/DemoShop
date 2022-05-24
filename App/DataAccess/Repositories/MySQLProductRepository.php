<?php

namespace Logeecom\DemoShop\App\DataAccess\Repositories;

use Logeecom\DemoShop\App\BusinessServices\ProductRepositoryInterface;
use Logeecom\DemoShop\App\DataAccess\Models\Category;
use Logeecom\DemoShop\App\DataAccess\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Capsule\Manager as DB;

class MySQLProductRepository implements ProductRepositoryInterface
{
    // Methods
    public function __construct()
    {
    }

    // returns the amount of products on the given page
    public function getProducts(int $numOfProducts, array $sortOptions, array $filterOptions, int $pageNumber = 1): array
    {
        $products = Product::all()->toArray();
        $amountOfPages = (int)ceil(count($products) / $numOfProducts);

        if ($pageNumber > $amountOfPages || $pageNumber <= 0) {
            return ['operationSuccess' => false, 'errorCode' => '400', 'errorMessage' => 'Page number error.'];
        } else {

            $offset = ($pageNumber - 1) * $numOfProducts;
            $limit = $numOfProducts;

            $builder = $this->buildFetchProductsQuery($offset, $limit, $sortOptions, $filterOptions);
            $data['productList'] = $builder->get()->all();

            $data['operationSuccess'] = true;

            $builder = $this->buildFetchProductsQuery(0, 0, $sortOptions, $filterOptions);
            $numOfResultsTotal = $builder->get()->count();
            $data['amountOfPages'] = (int)ceil($numOfResultsTotal / $numOfProducts);

            $data['currentPage'] = $pageNumber;

            foreach ($data['productList'] as $key => $product) {
                $data['productList'][$key]['category'] = Category::where('id', $product['categoryId'])->first()->title;
            }

            return $data;
        }
    }

    // builds a query to fetch products
    private function buildFetchProductsQuery (int $offset, int $limit, array $sortOptions, array $filterOptions): Builder
    {
        $builder = Product::query();

        if ($offset > 0) {
            $builder = $builder->offset($offset);
        }
        if ($limit > 0) {
            $builder = $builder->limit($limit);
        }

        // sorting options
        if ($sortOptions['titleSort'] == 'up') {
            $builder = $builder->orderBy('title', 'desc');
        } else {
            $builder = $builder->orderBy('title', 'asc');
        }

        if ($sortOptions['brandSort'] == 'up') {
            $builder = $builder->orderBy('brand', 'desc');
        } else {
            $builder = $builder->orderBy('brand', 'asc');
        }

        if ($sortOptions['categorySort'] == 'up') {
            $builder = $builder->orderBy('categoryId', 'desc');
        } else {
            $builder = $builder->orderBy('categoryId', 'asc');
        }

        if ($sortOptions['shortDescriptionSort'] == 'up') {
            $builder = $builder->orderBy('shortDescription', 'desc');
        } else {
            $builder = $builder->orderBy('shortDescription', 'asc');
        }

        if ($sortOptions['priceSort'] == 'up') {
            $builder = $builder->orderBy('price', 'desc');
        } else {
            $builder = $builder->orderBy('price', 'asc');
        }

        // filter options
        if ($filterOptions['title'] != '') {
            $builder = $builder->where('title', 'like', $filterOptions['title'].'%');
        }

        if ($filterOptions['sku'] != '') {
            $builder = $builder->where('sku', 'like', $filterOptions['sku'].'%');
        }

        if ($filterOptions['brands']){
            $builder = $builder->whereIn('brand', $filterOptions['brands']);
        }

        if ($filterOptions['categories']){
            $builder = $builder->whereIn('categoryId', $filterOptions['categories']);
        }

        return $builder;
    }

    // changes value of the product enabled attribute
    public function changeEnabledStatus(int $productId, bool $setEnabledStatus): array
    {
        $product = Product::where('id', $productId)->first();
        $product->enabled = $setEnabledStatus;

        $product->save();

        $data['operationSuccess'] = true;
        return $data;
    }

    // deletes product from the database
    public function deleteProduct(int $productId): array
    {
        $product = Product::where('id', $productId)->first();
        if ($product != null) {
            $product->delete();
            $data['operationSuccess'] = true;
            return $data;
        } else {
            $data['operationSuccess'] = false;
            $data['errorCode'] = '400';
            $data['errorMessage'] = 'Product with the given ID does not exist.';
            return $data;
        }
    }

    // adds product to the database
    public function addProduct(Product $product): array
    {
        $product->save();
        $data['operationSuccess'] = true;
        return $data;
    }

    // updates product in the database
    public function updateProduct(Product $product, bool $imageChanged): array
    {
        $originalProduct = Product::where('id', $product->id)->first();

        // update attributes
        $originalProduct->title = $product->title;
        $originalProduct->sku = $product->sku;
        $originalProduct->brand = $product->brand;
        $originalProduct->categoryId = $product->categoryId;
        $originalProduct->price = $product->price;
        $originalProduct->shortDescription = $product->shortDescription;
        $originalProduct->description = $product->description;
        $originalProduct->enabled = $product->enabled;
        $originalProduct->featured = $product->featured;
        if ($imageChanged) {
            $originalProduct->image = $product->image;
        }

        $originalProduct->save();

        $data['operationSuccess'] = true;
        return $data;
    }

    // returns product identified by its SKU
    public function getProductBySKU(string $sku): array
    {
        $product = Product::where('sku', $sku)->first();

        if ($product != null) {
            $data['product'] = $product;
            $data['operationSuccess'] = true;
            return $data;
        } else {
            $data['operationSuccess'] = false;
            $data['errorCode'] = '400';
            $data['errorMessage'] = 'Product with the given SKU does not exist.';
            return $data;
        }
    }

    // returns product identified by its id
    public function getProductById(int $id): array
    {
        $product = Product::where('id', $id)->first();

        if ($product != null) {
            $data['product'] = $product;
            $data['operationSuccess'] = true;
            return $data;
        } else {
            $data['operationSuccess'] = false;
            $data['errorCode'] = '400';
            $data['errorMessage'] = 'Product with the given SKU does not exist.';
            return $data;
        }
    }

    public function beginTransaction(): void
    {
        DB::beginTransaction();
    }

    public function commitTransaction(): void
    {
        DB::commit();
    }

    public function rollbackTransaction(): void
    {
        DB::rollback();
    }

    public function getBrandList(): array
    {
        $builder = Product::query();
        $builder = $builder->distinct('brand');

        $products = $builder->get()->toArray();
        $brands = [];

        foreach ($products as $product) {
            array_push($brands, $product['brand']);
        }
        return $brands;
    }

    // returns all necessary product statistics for the dashboard
    public function getDashboardProductData(): array
    {
        $data['numOfProducts'] = Product::all()->count();
        $data['numOfViewsOfMostViewed'] = DB::table('Product')->max('viewCount');
        $data['mostOftenViewedProduct'] = Product::where('viewCount', $data['numOfViewsOfMostViewed'])->first()->title;
        return $data;
    }
}