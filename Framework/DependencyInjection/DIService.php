<?php

namespace Logeecom\DemoShop\Framework\DependencyInjection;
use Closure;

// class that contains services of the DI container: a callback function that returns object instance of requested class,
// and a flag that marks whether the class is a singleton
class DIService
{
    private Closure $callBackFunction;
    private bool $isSingleton;

    // constructor that takes an anonymous function as argument (type Closure)
    public function __construct(bool $isSingleton, Closure $closure)
    {
        $this->isSingleton = $isSingleton;
        $this->callBackFunction = $closure;
    }

    // getter for the callback function
    public function getCallBack():Closure
    {
        return $this->callBackFunction;
    }

    // getter for the isSingleton bool
    public function getIsSingleton():bool
    {
        return $this->isSingleton;
    }
}