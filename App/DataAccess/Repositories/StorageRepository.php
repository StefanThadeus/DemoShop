<?php

namespace Logeecom\DemoShop\App\DataAccess\Repositories;

use  Logeecom\DemoShop\App\BusinessServices\StorageRepositoryInterface;

class StorageRepository implements StorageRepositoryInterface
{
    private string $filePath = '/var/www/App/Public/Storage/';
    // Methods
    public function __construct()
    {
    }

    // stores file with the given content to the given filepath under the provided file name
    public function storeFile(string $fileName, string $fileContent): void
    {
        file_put_contents($this->filePath . $fileName, $fileContent);
    }

    public function getFile(string $fileName): string
    {
        return '/Storage/' . $fileName;
    }

    public function deleteFile(string $fileName): void
    {
        unlink('/Storage/' . $fileName);
    }
}