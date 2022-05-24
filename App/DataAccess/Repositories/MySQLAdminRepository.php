<?php

namespace Logeecom\DemoShop\App\DataAccess\Repositories;

use Logeecom\DemoShop\App\BusinessServices\AdminRepositoryInterface;
use Logeecom\DemoShop\App\DataAccess\Models\Admin;

class MySQLAdminRepository implements AdminRepositoryInterface
{

    // Methods
    public function __construct()
    {
    }

    // returns Admin record with the given username
    public function getAdminIdByUsername(string $username): ?int
    {
        $admin = Admin::where('username', $username)->first();
        if (isset($admin)) {
            return $admin->id;
        } else {
            return null;
        }
    }

    // returns Admin record with the given username
    public function getAdminPasswordByUsername(string $username): ?string
    {
        $admin = Admin::where('username', $username)->first();
        if (isset($admin)) {
            return $admin->password;
        } else {
            return null;
        }
    }

    // returns Admin token with the given username
    public function getAdminTokenByUsername(string $username): ?string
    {
        $admin = Admin::where('username', $username)->first();
        if (isset($admin)) {
            return $admin->token;
        } else {
            return null;
        }
    }

    // returns Admin username with the given token
    public function getAdminUsernameByToken(string $token): ?string
    {
        $admin = Admin::where('token', $token)->first();
        if (isset($admin)) {
            return $admin->username;
        } else {
            return null;
        }
    }

    // updates Author record with the given ID
    public function updateAdminToken(int $id, string $token): void
    {
        Admin::where('id', $id)->update(['token' => $token]);
    }

    public function checkIfTokenExists(string $token): bool
    {
        $admin = Admin::where('token', $token)->first();
        if (isset($admin)) {
            return true;
        } else {
            return false;
        }
    }
}