(function () {
    const token = localStorage.getItem("token");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!token && !loggedIn) {
        alert("Please login or sign up to access this page.");

        window.location.replace("../auth/login.html");
    }
})();

