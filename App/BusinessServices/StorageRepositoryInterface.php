<?php

namespace Logeecom\DemoShop\App\BusinessServices;

interface StorageRepositoryInterface
{
    public function storeFile (string $fileName, string $fileContent): void;
    public function getFile (string $fileName): string;
    public function deleteFile (string $fileName): void;
}