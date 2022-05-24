<?php

namespace Logeecom\DemoShop\App\BusinessServices;

use Logeecom\DemoShop\App\DataAccess\Models\Category;

class CategoryService implements CategoryServicesInterface
{
    protected CategoryRepositoryInterface $db;

    public function __construct(CategoryRepositoryInterface $dbImplementation)
    {
        $this->db = $dbImplementation;
    }


    public function getAllRootCategories(): array
    {
        return $this->db->getAllRootCategories();
    }

    public function getSubcategories(int $parentId): array
    {
        return $this->db->getSubcategories($parentId);
    }

    public function getCategoryData(int $categoryId): array
    {
        return $this->db->getCategoryData($categoryId);
    }

    public function addCategory(Category $category): array
    {
        return $this->db->addCategory($category);
    }

    public function getAllCategories(): array
    {
        return $this->db->getAllCategories();
    }

    public function deleteCategory($id): array
    {
        return $this->db->deleteCategory($id);
    }

    public function updateCategory($id, $title, $description, $code, $parentId): array
    {
        return $this->db->updateCategory($id, $title, $description, $code, $parentId);
    }
}