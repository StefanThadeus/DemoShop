<?php

namespace Logeecom\DemoShop\Framework\ObjectRelationalMapping;

use Illuminate\Database\Capsule\Manager as DB;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;

// Object Relation Mapping singleton class, for ease of use of the database
class ORM
{
    private static ?DB $instance = null;

    // The constructor is private
    // to prevent initiation with outer code.
    private function __construct()
    {
        // create instance
        ORM::$instance = new DB();

        // load database connection parameters from the Environment config file
        $connectionParameters = require $_SERVER['DOCUMENT_ROOT'] . '/../App/Config/Environment.php';
        ORM::$instance->addConnection([
            'driver' => $connectionParameters['driver'],
            'host' => $connectionParameters['host'],
            'database' => $connectionParameters['database'],
            'username' => $connectionParameters['username'],
            'password' => $connectionParameters['password'],
            'charset' => $connectionParameters['charset'],
            'collation' => $connectionParameters['collation'],
            'prefix' => $connectionParameters['prefix'],
        ]);

        // set event dispatcher
        ORM::$instance->setEventDispatcher(new Dispatcher(new Container));

        // make this Capsule instance available globally via static methods... (optional)
        ORM::$instance->setAsGlobal();

        // setup the Eloquent ORM... (optional; unless used setEventDispatcher())
        ORM::$instance->bootEloquent();
    }

    // The object is created from within the class itself
    // only if the class has no instance.
    public static function getInstance(): DB
    {
        if (self::$instance == null)
        {
            new ORM();
        }

        return self::$instance;
    }
}