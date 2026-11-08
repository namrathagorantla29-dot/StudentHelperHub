function requireLogin() {

    const token = localStorage.getItem("token");

    console.log("AUTH CHECK - TOKEN:", token);

    if (!token) {

        localStorage.setItem(
            "redirectAfterLogin",
            window.location.href
        );

        window.location.href = "../auth/login.html";

        return false;
    }

    return true;
}


function isUserLoggedIn() {

    const token = localStorage.getItem("token");

    return token !== null;
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("redirectAfterLogin");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "/frontend/index.html";
}

