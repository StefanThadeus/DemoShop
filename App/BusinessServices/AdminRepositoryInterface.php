<?php

namespace Logeecom\DemoShop\App\BusinessServices;

interface AdminRepositoryInterface
{
    public function getAdminIdByUsername(string $username): ?int;
    public function getAdminPasswordByUsername(string $username): ?string;
    public function getAdminUsernameByToken(string $token): ?string;
    public function updateAdminToken(int $id, string $token): void;
    public function checkIfTokenExists(string $token): bool;
    public function getAdminTokenByUsername(string $username): ?string;
}