window.onload = function () {
    // initialize router object
    const router = new Router();

    // on load, call router to navigate to the appropriate view with necessary data
    router.navigate();

    // add listener to url change for further calls to Router
    if (window.history) {
        let myOldUrl = window.location.href;
        window.addEventListener('hashchange', function () {
            //window.history.pushState({}, null, myOldUrl);

            router.navigate();
        });
    }
};
