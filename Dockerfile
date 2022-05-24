# start from existing image in online registry
FROM oberd/php-8.1-apache

# install necessary PHP extensions (found inside composer.json)
RUN docker-php-ext-install pdo pdo_mysql

# get xdebug
RUN pecl install xdebug \ && docker-php-ext-enable xdebug

# get composer
RUN curl -sS https://getcomposer.org/installer | php -- \ --install-dir=/usr/bin --filename=composer

# get illuminate ORM
RUN composer require illuminate/database

# change working directory (positioned here by default when accessing container via bash)
WORKDIR /var/www/App
