<?php

namespace Logeecom\DemoShop\App\BusinessServices;

class DashboardService implements DashboardServicesInterface
{
    protected productRepositoryInterface $dbProduct;
    protected categoryRepositoryInterface $dbCategory;

    public function __construct(productRepositoryInterface $dbProduct, categoryRepositoryInterface $dbCategory)
    {
        $this->dbProduct = $dbProduct;
        $this->dbCategory = $dbCategory;
    }

    // returns dashboard statistics
    public function getDashboardData(): array
    {
        $data['numOfCategories'] = $this->dbCategory->getNumOfCategories();

        $productData = $this->dbProduct->getDashboardProductData();
        $data['numOfProducts'] = $productData['numOfProducts'];
        $data['numOfViewsOfMostViewed'] = $productData['numOfViewsOfMostViewed'];
        $data['mostOftenViewedProduct'] = $productData['mostOftenViewedProduct'];

        return $data;
    }
}