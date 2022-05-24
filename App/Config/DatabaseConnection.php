<?php

namespace Logeecom\DemoShop\Config;

use PDO;
use PDOException;

// Singleton DatabaseConnection class
class DatabaseConnection
{
    protected static ?PDO $instance = null;

    private function __construct(string $dataSourceName, string $username, string $password)
    {
        while (true) {
            try {
                self::$instance = new PDO($dataSourceName, $username, $password);
                return;
            } catch (PDOException $e) {
                //echo "MySql Connection Error: " . $e->getMessage();
                error_log('MySql Connection Error: ' . $e->getMessage());
            }
        }
    }

    public static function getInstance(): PDO
    {
        if (!self::$instance) {
            // load list of parameters to start database connection
            $connectionParameters = require $_SERVER['DOCUMENT_ROOT'] . '/../Config/DBConnectionParameters.php';

            $dataSourceName = $connectionParameters['dataSourceName'];
            $username = $connectionParameters['username'];
            $password = $connectionParameters['password'];

            new DatabaseConnection($dataSourceName, $username, $password);
        }

        return self::$instance;
    }
}
