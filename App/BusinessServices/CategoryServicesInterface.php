<?php

namespace Logeecom\DemoShop\App\BusinessServices;

use Logeecom\DemoShop\App\DataAccess\Models\Category;

interface CategoryServicesInterface
{
    public function getAllRootCategories(): array;
    public function getSubcategories(int $parentId): array;
    public function getCategoryData(int $categoryId): array;
    public function addCategory(Category $category): array;
    public function getAllCategories(): array;
    public function deleteCategory($id): array;
    public function updateCategory($id, $title, $description, $code, $parentId): array;
}