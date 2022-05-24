<?php
/** @var array $data */
$authenticationFailed = $data["authenticationFailed"];
$errorMessage = $data['errorMessage'];
$username = $data['username'];
$password = $data['password'];
?>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>DemoShop - Login</title>

    <link rel="icon" type="image/x-icon" href="Resources/Images/shopping-cart.png">

    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Pacifico&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="Resources/CSS/Styles.css">
</head>

<body>

<form method="post" action="login" id="loginForm">
    <table class="background-container font-cursive">
        <tr>
            <td colspan="2">
                <span class="heading-large">Welcome</span><br>
                <span class="heading-small">To DemoShop administration!</span><br>&nbsp;
            </td>
        </tr>
        <tr class="input-area-padding font-simple">
            <td class="cell-padding-vertical">
                Username:
            </td>
            <td class="cell-padding-vertical">
                <input class="form-input-area" type="text" name="username" placeholder="Enter username" value="<?php echo $username?>">
            </td>
        </tr>
        <tr class="input-area-padding font-simple">
            <td class="">
                Password:
            </td>
            <td class="">
                <input class="form-input-area" type="password" name="password" placeholder="Enter password" value="<?php echo $password?>">
            </td>
        </tr>
        <tr>
            <td class="align-left align-vertical-bottom">
                <label class="checkmark-container">Keep me logged in
                    <input type="checkbox" checked="checked" name="keepLoggedIn[]">
                    <span class="checkmark"></span>
                </label>
            </td>
            <td class="align-right">
                <br><input type="submit" name="submit" value="Log In" class="button-special">
            </td>
        </tr>
        <?php if($authenticationFailed === true){ ?>
        <tr>
            <td class="align-center align-vertical-bottom" colspan="2">
                <br>
                <span class="error-text-color font-simple font-size-login-status">
                    <em>
                        <?php echo $errorMessage;?>
                    </em>
                </span>
            </td>
        </tr>
        <?php } ?>
    </table>
</form>

</body>
</html>