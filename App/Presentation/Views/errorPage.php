<?php
/** @var array $data */
$baseURL="";
$heading = $data["heading"];
$message = $data["message"];
?>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>DemoShop - Error 404</title>

    <link rel="icon" type="image/x-icon" href="Resources/Images/shopping-cart.png">

    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Pacifico&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="Resources/CSS/Styles.css">

</head>

<body>

<table class="background-container font-cursive">
    <tr>
        <td colspan="2">
            <span class="heading-large">Whoops!</span><br>
            <span class="heading-small"><?php echo $heading?></span><br>&nbsp;
        </td>
    </tr>
    <tr class="input-area-padding font-simple">
        <td class="" colspan="2">
            <em>
                <span class="error-text-color">
                    <?php echo $message?>
                </span>
            </em>
        </td>
    </tr>
    <tr>
        <td>
            &nbsp;
            <form method="get" action="<?php echo $baseURL; ?>login">
                <input type="submit" class="button-special" value="Go back to home page"/>
            </form>
        </td>
    </tr>
</table>

</body>
</html>