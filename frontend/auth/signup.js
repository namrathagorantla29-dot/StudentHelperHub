let verifiedEmail = "";


// =======================
// STEP 1 - SEND OTP
// =======================

async function sendOTP() {

    const email =
        document.getElementById("signupEmail").value.trim();

    const msg =
        document.getElementById("signupMsg");


    // Check empty email
    if (email === "") {

        msg.innerText = "Please enter your email.";
        msg.style.color = "red";
        return;

    }


    // Check email format
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        msg.innerText =
            "Please enter a valid email address.";

        msg.style.color = "red";
        return;

    }


    try {

        msg.innerText = "Sending OTP...";
        msg.style.color = "#0d47a1";


        const response = await fetch(
            "https://studenthelperhub.onrender.com/send-otp",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email
                })

            }
        );


        const data = await response.json();


        if (data.success) {

            // Store email temporarily
            verifiedEmail = email;


            msg.innerText =
                "OTP sent successfully to your email 📧";

            msg.style.color = "green";


            // Hide email step
            document.getElementById("emailStep")
                .style.display = "none";


            // Show OTP step
            document.getElementById("otpStep")
                .style.display = "block";


            document.getElementById("subtitle")
                .innerText =
                "Enter the OTP sent to your email";


            // Automatically focus OTP
            document.getElementById("otp").focus();

        }

        else {

            msg.innerText = data.message;
            msg.style.color = "red";

        }

    }

    catch (error) {

        console.log("OTP Error:", error);

        msg.innerText =
            "Unable to connect to server.";

        msg.style.color = "red";

    }

}



// =======================
// STEP 2 - VERIFY OTP
// =======================

async function verifyOTP() {

    const otp =
        document.getElementById("otp").value.trim();

    const msg =
        document.getElementById("signupMsg");


    // Check empty OTP
    if (otp === "") {

        msg.innerText =
            "Please enter the OTP.";

        msg.style.color = "red";
        return;

    }


    // OTP must contain exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {

        msg.innerText =
            "OTP must contain exactly 6 digits.";

        msg.style.color = "red";
        return;

    }


    // Make sure email exists
    if (verifiedEmail === "") {

        msg.innerText =
            "Please request an OTP first.";

        msg.style.color = "red";
        return;

    }


    try {

        msg.innerText = "Verifying OTP...";
        msg.style.color = "#0d47a1";


        const response = await fetch(
            "https://studenthelperhub.onrender.com/verify-otp",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: verifiedEmail,
                    otp: otp

                })

            }
        );


        const data = await response.json();


        if (data.success) {

            msg.innerText =
                "Email verified successfully ✅";

            msg.style.color = "green";


            // Hide OTP step
            document.getElementById("otpStep")
                .style.display = "none";


            // Show account creation step
            document.getElementById("accountStep")
                .style.display = "block";


            document.getElementById("subtitle")
                .innerText =
                "Create your Student Helper Hub account";


            // Automatically focus name
            document.getElementById("name").focus();

        }

        else {

            msg.innerText = data.message;
            msg.style.color = "red";

        }

    }

    catch (error) {

        console.log("OTP Verification Error:", error);

        msg.innerText =
            "Unable to connect to server.";

        msg.style.color = "red";

    }

}



// =======================
// STEP 3 - CREATE ACCOUNT
// =======================

async function signupUser() {

    const name =
        document.getElementById("name").value.trim();

    const password =
        document.getElementById("signupPassword").value.trim();

    const msg =
        document.getElementById("signupMsg");


    // Make sure OTP was verified
    if (verifiedEmail === "") {

        msg.innerText =
            "Please verify your email first.";

        msg.style.color = "red";
        return;

    }


    // Check name
    if (name === "") {

        msg.innerText =
            "Please enter your name.";

        msg.style.color = "red";
        return;

    }


    // Check password
    if (password === "") {

        msg.innerText =
            "Please create a password.";

        msg.style.color = "red";
        return;

    }


    // Password length
    if (password.length < 6) {

        msg.innerText =
            "Password must contain at least 6 characters.";

        msg.style.color = "red";
        return;

    }


    try {

        msg.innerText =
            "Creating your account...";

        msg.style.color = "#0d47a1";


        const response = await fetch(
            "https://studenthelperhub.onrender.com/register",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,
                    email: verifiedEmail,
                    password: password

                })

            }
        );


        const data = await response.json();


        if (data.success) {

            msg.innerText =
                "Account created successfully 🎉";

            msg.style.color = "green";


            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 1500);

        }

        else {

            msg.innerText =
                data.message;

            msg.style.color = "red";

        }

    }

    catch (error) {

        console.log("Signup Error:", error);

        msg.innerText =
            "Unable to connect to server.";

        msg.style.color = "red";

    }

}



// =======================
// SHOW / HIDE PASSWORD
// =======================

function toggleSignupPassword() {

    const password =
        document.getElementById("signupPassword");

    const button =
        document.querySelector(".show-password");


    if (password.type === "password") {

        password.type = "text";

        button.innerText = "Hide";

    }

    else {

        password.type = "password";

        button.innerText = "Show";

    }

}



// =======================
// ENTER KEY SUPPORT
// =======================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Enter") {
            return;
        }


        // Step 1
        const emailStep =
            document.getElementById("emailStep");


        // Step 2
        const otpStep =
            document.getElementById("otpStep");


        // Step 3
        const accountStep =
            document.getElementById("accountStep");


        if (
            emailStep &&
            emailStep.style.display !== "none"
        ) {

            sendOTP();

        }

        else if (
            otpStep &&
            otpStep.style.display !== "none"
        ) {

            verifyOTP();

        }

        else if (
            accountStep &&
            accountStep.style.display !== "none"
        ) {

            signupUser();

        }

    }
);