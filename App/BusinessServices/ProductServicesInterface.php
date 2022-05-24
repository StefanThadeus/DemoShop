<?php

namespace Logeecom\DemoShop\App\BusinessServices;

use Logeecom\DemoShop\App\DataAccess\Models\Product;

interface ProductServicesInterface
{
    public function getProducts(int $numOfProducts, array $sortOptions, array $filterOptions, int $pageNumber = 1): array;
    public function changeEnabledStatus(int $productId, bool $setEnabledStatus): array;
    public function batchChangeEnabledStatus(array $productIds, bool $setEnabledStatus): array;
    public function deleteProduct(int $productId): array;
    public function batchDeleteProducts(array $productIds): array;
    public function addProduct(Product $product): array;
    public function updateProduct(Product $product, bool $imageChanged): array;
    public function getProduct(string $sku): array;
    public function getFilterOptions(): array;
}