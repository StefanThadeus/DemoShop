<?php

namespace Logeecom\DemoShop\Framework\Response;

interface ResponseInterface
{
    public function getResponseStatusCode(): int;
    public function getResponseHeaders(): array;
    public function getResponseContent(): string;
    public function execute():void;
}