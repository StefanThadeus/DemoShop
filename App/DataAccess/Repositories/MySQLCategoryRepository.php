<?php

namespace Logeecom\DemoShop\App\DataAccess\Repositories;

use Logeecom\DemoShop\App\BusinessServices\CategoryRepositoryInterface;
use Logeecom\DemoShop\App\DataAccess\Models\Category;
use Logeecom\DemoShop\App\DataAccess\Models\Product;

class MySQLCategoryRepository implements CategoryRepositoryInterface
{

    // Methods
    public function __construct()
    {
    }

    // returns array of all root categories
    public function getAllRootCategories(): array
    {
        // get all root categories (where parentId is equal to null)
        $rootCategories = Category::where('parentId', null)->get()->toArray();

        // find if each root category has children (subcategories) in order to know whether to display an arrow to expand tree view
        // search by key=>value, key being the index of the list element, and value being the element at the given key
        $categoryList = [];
        foreach ($rootCategories as $key => $category) {
            // copy title name
            $categoryList[$key]['title'] = $category['title'];
            $categoryList[$key]['id'] = $category['id'];
            // find if it has children by counting number of the category id occurrences in the parentId column
            if (Category::where('parentId', $category['id'])->count() > 0) {
                $categoryList[$key]['hasChildren'] = true;
            } else {
                $categoryList[$key]['hasChildren'] = false;
            }
        }

        return $categoryList;
    }

    // returns all subcategories of the given parent id
    public function getSubcategories(int $parentId): array
    {
        // get all subcategories (where parentId field is equal to the id of the parent)
        $categories = Category::where('parentId', $parentId)->get()->toArray();

        // find if each root category has children (subcategories) in order to know whether to display an arrow to expand tree view
        // search by key=>value, key being the index of the list element, and value being the element at the given key
        $categoryList = [];
        foreach ($categories as $key => $category) {
            // copy title name
            $categoryList[$key]['title'] = $category['title'];
            $categoryList[$key]['id'] = $category['id'];
            // find if it has children by counting number of the category id occurrences in the parentId column
            if (Category::where('parentId', $category['id'])->count() > 0) {
                $categoryList[$key]['hasChildren'] = true;
            } else {
                $categoryList[$key]['hasChildren'] = false;
            }
        }

        return $categoryList;
    }

    // returns all category data for the given category id
    public function getCategoryData(int $categoryId): array
    {
        // get category (where id is equal to $categoryId)
        $category = Category::where('id', $categoryId)->first();

        // find if each root category has children (subcategories) in order to know whether to display an arrow to expand tree view
        // search by key=>value, key being the index of the list element, and value being the element at the given key
        $categoryDataList = [];
        $categoryDataList['title'] = $category['title'];
        $categoryDataList['id'] = $category['id'];
        $categoryDataList['description'] = $category['description'];
        $categoryDataList['code'] = $category['code'];

        // find parent title and id
        $parent = Category::where('id', $category['parentId'])->first();
        $categoryDataList['parent'] = $parent['title'];
        $categoryDataList['parentId'] = $parent['id'];

        return $categoryDataList;
    }

    // returns a boolean stating whether the saving operation succeeded or failed
    public function addCategory(Category $category): array
    {
        if (Category::where('code', $category->code)->first() == null) {
            $category->save();
            return ['operationSuccess' => true];
        } else {
            return ['operationSuccess' => false, 'errorCode' => '409', 'errorMessage' => 'Category with the same code already exists.'];
        }
    }

    // returns all categories in a hierarchical structure
    public function getAllCategories(): array
    {
        $list = [];

        $rootCategories = Category::where('parentId', null)->get()->toArray();
        $subcategories = [];

        // get root children (subcategories) and save them in a list
        foreach ($rootCategories as $root) {
            $subcategories[] = $this->getAllSubcategories($root['id']);
        }

        // join the two lists
        for ($i = 0; $i < count($rootCategories); $i++) {
            $list[] = $rootCategories[$i];
            $list[$i]['subcategories'] = $subcategories[$i];
        }

        return $list;
    }

    // recursively returns all subcategories all the way to the bottom of the hierarchy for the given parent id
    private function getAllSubcategories(int $parentId): array
    {
        $list = [];

        // get all subcategories (where parentId field is equal to the id of the parent)
        $categories = Category::where('parentId', $parentId)->get()->toArray();
        $subcategories = [];

        // get children (subcategories) for the given category and save them in a list
        foreach ($categories as $category) {
            $subcategories[] = $this->getAllSubcategories($category['id']);
        }

        // join the two lists
        for ($i = 0; $i < count($categories); $i++) {
            $list[] = $categories[$i];
            $list[$i]['subcategories'] = $subcategories[$i];
        }

        return $list;
    }

    // deletes the category with the given id from the database, and all its subcategories
    public function deleteCategory($id): array
    {
        $rootCategory = Category::find($id);

        // get category children (subcategories) and save them in a list
        $subcategories = Category::where('parentId', $id)->get()->toArray();
        for ($i = 0; $i < count($subcategories); $i++) {
            $newSubcategories = Category::where('parentId', $subcategories[$i]['id'])->get()->toArray();
            $subcategories = array_merge($subcategories, $newSubcategories);
        }

        // check if subcategories contain products
        $containsProducts = false;
        foreach ($subcategories as $subcategory) {
            if (Product::where('categoryId', $subcategory['id'])->count() > 0){
                $containsProducts = true;
                break;
            }
        }

        // check if root category has products
        if (!$containsProducts) {
            if (Product::where('categoryId', $rootCategory->id)->count() > 0){
                $containsProducts = true;
            }
        }

        // if categories don't contain products, delete theme
        if (!$containsProducts) {
            // delete all subcategories in reverse order (so that subcategories on the bottom of the hierarchy get deleted first)
            $index = count($subcategories);
            while ($index) {
                Category::destroy($subcategories[--$index]['id']);
            }

            $rootCategory->delete();
            return ['operationSuccess' => true];
        } else {
            return ['operationSuccess' => false, 'errorCode' => 400, 'errorMessage' => 'Cannot delete categories which contain products!'];
        }
    }

    // updates category with the given id
    public function updateCategory($id, $title, $description, $code, $parentId): array
    {
        // check that the parentId isn't the same as id, and if so, disallow it (a category can't be its own parent)
        if ($id == $parentId) {
            return ['operationSuccess' => false, 'errorCode' => '400', 'errorMessage' => 'Category cannot be its own parent.'];
        }

        // if code doesn't exist, or if it does, and is the same as the id of the category, allow changes
        if (Category::where('code', $code)->first() == null || Category::where('code', $code)->first()->id == $id) {

            // fetch the category which is to be edited
            $category = Category::where('id', $id)->first();

            // check if parentId to be set is currently an own child category,and if so, update all direct
            // children to have current category's parent as parents
            $boolNewParentIsChild = false;
            // if parentId is set to null (so that it becomes root), no need to check children
            if ($parentId != null) {
                $subcategories = $this->getAllSubcategories($id);
                foreach ($subcategories as $subcategory) {
                    if ($subcategory->id == $parentId) {
                        $boolNewParentIsChild = true;
                    }
                }
            }

            if ($boolNewParentIsChild) {
                $child = Category::where('parentId', $id)->first();
                while ($child != null) {
                    $child->parentId = $category->parentId;
                    $child->save();
                    $child = Category::where('parentId', $id)->first();
                }
            }

            // update current category
            $category->title = $title;
            $category->description = $description;
            $category->code = $code;
            $category->parentId = $parentId;

            $category->save();
            return ['operationSuccess' => true];
        } else {
            return ['operationSuccess' => false, 'errorCode' => '409', 'errorMessage' => 'Category with the same code already exists.'];
        }
    }

    public function getCategoryList(): array
    {
        $categories = Category::all()->toArray();
        $data = [];

        foreach ($categories as $category) {
            $categoryItem['title'] = $category['title'];
            $categoryItem['id'] = $category['id'];
            array_push($data, $categoryItem);
        }
        return $data;
    }

    // returns total number of categories in the database
    public function getNumOfCategories(): int
    {
        return Category::all()->count();
    }
}