<?php

require __DIR__ . '/../vendor/autoload.php';

use Logeecom\DemoShop\Framework\Framework;

try {
    Framework::start();
} catch (ReflectionException $e) {
}
