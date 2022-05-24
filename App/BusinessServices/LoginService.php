<?php

namespace Logeecom\DemoShop\App\BusinessServices;

class LoginService implements LoginServicesInterface
{
    protected AdminRepositoryInterface $db;

    public function __construct(AdminRepositoryInterface $dbImplementation)
    {
        $this->db = $dbImplementation;
    }

    // get admin by username (it is unique)
    public function getAdminIdByUsername(string $username): int
    {
        return $this->db->getAdminIdByUsername($username);
    }

    // get admin by username (it is unique)
    public function getAdminPasswordByUsername(string $username): string
    {
        return $this->db->getAdminPasswordByUsername($username);
    }

    // get admin by token (it is unique)
    public function getAdminUsernameByToken(string $token): string
    {
        return $this->db->getAdminUsernameByToken($token);
    }

    // updates admin (found via id) token value
    public function updateAdminToken(int $id, string $token): void
    {
        $this->db->updateAdminToken($id, $token);
    }

    // check if user with given token is currently logged in
    public function checkIfTokenExists(string $token): bool
    {
        return $this->db->checkIfTokenExists($token);
    }

    // check if logged in via session or cookie, and log user in if cookie exists but session does not
    public function checkIfLoggedIn(): bool
    {
        // start session so that $_SESSION becomes available
        session_start();

        // check if both session and cookie exist, and make sure there is no mismatch
        if(isset($_SESSION['username']) and isset($_COOKIE['token']))
        {
            // exists, check if unique token matches unique username
            if($this->db->getAdminTokenByUsername($_SESSION['username']) === $_COOKIE['token'])
            {
                // match found, return true
                return true;
            }
        }

        // check only session exists, if username exists in it
        if(isset($_SESSION['username']))
        {
            // check if username is real
            if($this->getAdminIdByUsername($_SESSION['username']) != null)
            {
                return true;
            }
        }

        // if session doesn't exist, check if "keep me logged in" cookie exists, and if so, log in user
        if (isset($_COOKIE['token'])) {
            // if token exists
            if($this->checkIfTokenExists($_COOKIE['token']))
            {
                // token exists, get username from database and log user in
                $adminUsername = $this->getAdminUsernameByToken($_COOKIE['token']);
                $this->logInUser($adminUsername, true);
                return true;
            }
        }

        // neither session nor cookie found, return false
        return false;
    }

    // log in user
    public function logInUser(string $username, bool $keepLoggedIn): void
    {
        // start session so that $_SESSION becomes available
        session_start();
        // add username to session
        $_SESSION['username'] = $username;

        // if "keep me logged in" checkbox is true
        if ($keepLoggedIn) {
            // generate unique token (keep doing so until unique is found)
            $token = hash('sha256', rand());
            // keep generating new token value until it is unique
            while ($this->checkIfTokenExists($token))
            {
                $token = hash('sha256', rand());
            }

            $this->updateAdminToken($this->getAdminIdByUsername($username), $token);

            // put token in cookie, time is set so that cookie doesn't expire after browser is closed
            setcookie('token', $token, time() + 60*60*24*365);
        }
    }

    // log user out
    public function logOutUser(): void
    {
        // invalidate token by setting empty, and setting negative time to expire
        session_start();
        $adminId = $this->getAdminIdByUsername($_SESSION['username']);
        $this->updateAdminToken($adminId, '');
        setcookie('token' , '', -3600);

        // end session by unsetting the username parameter
        unset($_SESSION['username']);
    }
}