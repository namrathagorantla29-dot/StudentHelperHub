// =======================
// LOGIN USER
// =======================

async function loginUser() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const msg =
        document.getElementById("msg");


    // =======================
    // VALIDATION
    // =======================

    if (email === "" || password === "") {

        msg.innerText =
            "Please enter email and password.";

        msg.style.color = "red";

        return;

    }


    // Basic email format validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        msg.innerText =
            "Please enter a valid email address.";

        msg.style.color = "red";

        return;

    }


    try {

        msg.innerText = "Logging in...";
        msg.style.color = "#0d47a1";


        const response = await fetch(
            "http://localhost:5000/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,
                    password: password

                })

            }
        );


        const data =
            await response.json();


// =======================
// LOGIN SUCCESS
// =======================

if (data.success) {

    // Store JWT
    localStorage.setItem(
        "token",
        data.token
    );


    // Store user information
    localStorage.setItem(
        "userId",
        data.user.id
    );

    localStorage.setItem(
        "userName",
        data.user.name
    );

    localStorage.setItem(
        "userEmail",
        data.user.email
    );


    msg.innerText =
        "Login Successful 🎉";

    msg.style.color = "green";


    // =======================
    // REDIRECT
    // =======================

    const redirectPage =
        localStorage.getItem(
            "redirectAfterLogin"
        );


    localStorage.removeItem(
        "redirectAfterLogin"
    );


    setTimeout(function () {

        if (redirectPage) {

            window.location.href =
                redirectPage;

        }

        else {

            window.location.href =
                "../index.html";

        }

    }, 800);

}

        // =======================
        // LOGIN FAILED
        // =======================

        else {

            msg.innerText =
                data.message;

            msg.style.color = "red";

        }

    }

    catch (error) {

        console.log(
            "Login Error:",
            error
        );

        msg.innerText =
            "Unable to connect to server.";

        msg.style.color = "red";

    }

}



// =======================
// SHOW / HIDE PASSWORD
// =======================

function togglePassword() {

    const password =
        document.getElementById("password");

    const button =
        document.querySelector(".show-btn");


    if (password.type === "password") {

        password.type = "text";

        button.innerText =
            "Hide Password";

    }

    else {

        password.type = "password";

        button.innerText =
            "Show Password";

    }

}



// =======================
// ENTER KEY SUPPORT
// =======================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            loginUser();

        }

    }
);