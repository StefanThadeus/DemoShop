<?php
/** @var array $data */
?>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>DemoShop - Admin Dashboard</title>

    <link rel="icon" type="image/x-icon" href="Resources/Images/shopping-cart.png">

    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Pacifico&display=swap"
          rel="stylesheet">

    <!-- Include custom CSS -->
    <link rel="stylesheet" href="Resources/CSS/Styles.css">

    <!-- Include jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <!-- Include custom JavaScript files -->
    <script src="Resources/JavaScript/index.js"></script>
    <script src="Resources/JavaScript/Router.js"></script>
    <script src="Resources/JavaScript/Presentation/Controllers/DashboardController.js"></script>
    <script src="Resources/JavaScript/Presentation/Controllers/ProductsController.js"></script>
    <script src="Resources/JavaScript/Presentation/Controllers/ProductCategoriesController.js"></script>
    <script src="Resources/JavaScript/Presentation/Controllers/ErrorController.js"></script>
    <script src="Resources/JavaScript/Services/DashboardService.js"></script>
    <script src="Resources/JavaScript/Services/ProductsService.js"></script>
    <script src="Resources/JavaScript/Services/ProductCategoriesService.js"></script>
    <script src="Resources/JavaScript/Presentation/Views/DashboardView.js"></script>
    <script src="Resources/JavaScript/Presentation/Views/ProductsView.js"></script>
    <script src="Resources/JavaScript/Presentation/Views/ProductManagementView.js"></script>
    <script src="Resources/JavaScript/Presentation/Views/ProductCategoriesView.js"></script>
</head>

<body>

<!-- Side navigation -->
<div class="sidenav">
    <span class="sidenav-heading font-cursive">DemoShop</span>
    <a class="sidenav-item" id="nav-menu-dashboard" href="#dashboard">Dashboard</a>
    <a class="sidenav-item" id="nav-menu-products" href="#products">Products</a>
    <a class="sidenav-item" id="nav-menu-product-categories" href="#product-categories">Product Categories</a>
    <div class="sidenav-item">
        <div class="log-out-button-positioning">
            <form method="get" action="logout">
                <input type="submit" class="button-special" value="Log Out"/>
            </form>
        </div>
    </div>
</div>

<!-- table which will contain the view -->
<table class="background-container font-cursive align-center" id="viewContent">

</table>

</body>
</html>