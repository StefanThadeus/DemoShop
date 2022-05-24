<?php

namespace Logeecom\DemoShop\Framework\DependencyInjection;
use Exception;
use ReflectionClass;
use ReflectionException;

class DIContainer
{
    private static ?DIContainer $instance = null;
    private array $entries;
    private array $singletonList;

    // load list of key-value pairs: class names and a function to initialize them
    private function __construct()
    {
        // load list of all controllers and their methods that may be referred to via URL
        $this->entries = require $_SERVER['DOCUMENT_ROOT'] . '/../App/Config/DependencyEntries.php';
        $this->singletonList = [];
    }

    // return container instance
    public static function getInstance(): DIContainer
    {
        if (DIContainer::$instance === null) {
            DIContainer::$instance = new DIContainer();
        }

        return DIContainer::$instance;
    }

    /**
     * resolve dependency by finding it in the list of entries
     * @throws ReflectionException
     * @throws Exception
     */
    public function resolveDependency($id): ?object
    {
        // inspect the class that is trying to be returned from the DI container using the Reflection Concept
        $reflectionClass = new ReflectionClass($id);

        // by this line, constructor was determined to contain parameters, fetch them
        $params = $reflectionClass->getConstructor()->getParameters();

        $dependencies = [];
        foreach ($params as $param)
        {
            // fill dependency list with class names
            $dependencies[] = self::getInstance()->get($param->getType()->getName());
        }

        // return new instance with arguments in list "dependencies"
        return $reflectionClass->newInstanceArgs($dependencies);
    }

    /**
     * get entry from list by the given id and resolve it
     * @param string $id
     * @return object|null
     * @throws Exception
     */
    public function get(string $id): ?object
    {
        // if entry exists
        if ($this->has($id)) {
            $entry = $this->entries[$id];

            // get the DIService, if non-singleton, instantiate and return
            // if singleton, instantiate the first time and add instance to singleton list to fetch next time

            if($entry->getIsSingleton())
            {
                // class is singleton
                // if already instantiated, return class instance
                if(isset($this->singletonList[$id]))
                {
                    return $this->singletonList[$id];
                }

                // not instantiated, instantiate it and save instance in singletonList
                $returnInstance = $entry->getCallback()();

                $this->singletonList[$id] = $returnInstance;
                return $returnInstance;
            }

            // class is not singleton, return new instance: getCallback() only returns callback, the additional
            // set of () calls the callback which returns the instance
            return $entry->getCallback()();
        }

        // if entry doesn't exist, attempt to resolve dependency on your own
        return $this->resolveDependency($id);
    }

    /**
     * check if entry exists
     * @param string $id
     * @return bool
     */
    public function has(string $id): bool
    {
        return isset($this->entries[$id]);
    }

    /**
     * adds entry to entries list
     * @param string $id
     * @param callable $implementation
     * @return void
     */
    public function set(string $id, callable $implementation): void
    {
        $this->entries[$id] = $implementation;
    }
}