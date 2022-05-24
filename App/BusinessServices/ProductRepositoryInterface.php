<?php

namespace Logeecom\DemoShop\App\BusinessServices;

use Logeecom\DemoShop\App\DataAccess\Models\Product;

interface ProductRepositoryInterface
{
    public function getProducts(int $numOfProducts, array $sortOptions, array $filterOptions, int $pageNumber = 1): array;
    public function changeEnabledStatus(int $productId, bool $setEnabledStatus): array;
    public function deleteProduct(int $productId): array;
    public function addProduct(Product $product): array;
    public function updateProduct(Product $product, bool $imageChanged): array;
    public function getProductBySKU(string $sku): array;
    public function getProductById(int $id): array;
    public function getBrandList(): array;
    public function beginTransaction(): void;
    public function commitTransaction(): void;
    public function rollbackTransaction(): void;
    public function getDashboardProductData(): array;
}