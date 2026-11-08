document.addEventListener("DOMContentLoaded", function () {
    initializeCertificate();
});

const API_BASE_URL = "https://studenthelperhub.onrender.com";

async function initializeCertificate() {

    const studentName = document.getElementById("studentName");
    const courseName = document.getElementById("courseName");
    const issueDate = document.getElementById("issueDate");
    const certificateId = document.getElementById("certificateId");
    const certificate = document.getElementById("certificate");

    if (
        !studentName ||
        !courseName ||
        !issueDate ||
        !certificateId ||
        !certificate
    ) {
        console.error("Certificate HTML elements are missing.");
        return;
    }

    const token = localStorage.getItem("token");

    // Check whether the student is logged in.
    if (!token) {

        showCertificateMessage(
            "Please log in to access your certificate."
        );

        return;
    }

    // Get the selected subject.
    const subjectId = localStorage.getItem("selectedSubject");

    if (!subjectId) {

        showCertificateMessage(
            "Please select a subject before opening your certificate."
        );

        return;
    }

    // Show loading information.
    studentName.textContent = "Loading...";
    courseName.textContent = "Loading...";
    issueDate.textContent = "Loading...";
    certificateId.textContent = "Loading...";

    try {

        // STEP 1: Fetch the logged-in student's profile.
        const profileResponse = await fetch(
            `${API_BASE_URL}/profile`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const profileData = await profileResponse.json();

        if (
            profileResponse.status === 401 ||
            profileResponse.status === 403
        ) {

            localStorage.removeItem("token");

            showCertificateMessage(
                "Your session has expired. Please log in again."
            );

            return;
        }

        if (
            !profileResponse.ok ||
            profileData.success === false
        ) {

            throw new Error(
                profileData.message || "Unable to load your profile."
            );

        }

        const user = profileData.user || profileData;

        if (!user.name) {

            throw new Error(
                "Your registered name could not be retrieved."
            );

        }

        // STEP 2: Get the subject name from notesData.
        // data_notes.js must be loaded before certificate.js.

        let selectedSubject = null;

        if (typeof notesData !== "undefined") {

            Object.values(notesData).forEach(function (semester) {

                if (!semester || !Array.isArray(semester.subjects)) {
                    return;
                }

                const foundSubject = semester.subjects.find(
                    function (subject) {
                        return subject.id === subjectId;
                    }
                );

                if (foundSubject) {
                    selectedSubject = foundSubject;
                }

            });

        }

        if (!selectedSubject) {

            throw new Error(
                "The selected subject could not be found. Please return to Notes and select the subject again."
            );

        }

        // STEP 3: Display the student's name and course name.
        studentName.textContent = user.name;
        courseName.textContent = selectedSubject.name;

        // STEP 4: Ask the backend to verify completion and issue
        // a certificate. This endpoint must be implemented in server.js.

        const certificateResponse = await fetch(
            `${API_BASE_URL}/certificates/issue`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({
                    subjectId: selectedSubject.id
                })
            }
        );

        const certificateData = await certificateResponse.json();

        if (!certificateResponse.ok || !certificateData.success) {

            if (certificateResponse.status === 401 ||
                certificateResponse.status === 403) {

                showCertificateMessage(
                    "Your session has expired. Please log in again."
                );

                return;
            }

            if (certificateResponse.status === 400 ||
                certificateResponse.status === 409) {

                showCertificateMessage(
                    certificateData.message ||
                    "You must complete all topics before receiving this certificate."
                );

                return;
            }

            throw new Error(
                certificateData.message ||
                "Unable to issue the certificate."
            );

        }

        // STEP 5: Use the certificate details generated by the backend.
        const issuedCertificate = certificateData.certificate;

        if (
            !issuedCertificate ||
            !issuedCertificate.certificateId ||
            !issuedCertificate.issueDate
        ) {

            throw new Error(
                "The server did not return a valid certificate ID and issue date."
            );

        }

        certificateId.textContent =
            issuedCertificate.certificateId;

        issueDate.textContent =
            formatIssueDate(issuedCertificate.issueDate);

        // STEP 6: Display the certificate.
        certificate.style.display = "block";

        console.log(
            "Certificate loaded successfully:",
            issuedCertificate.certificateId
        );

    }
    catch (error) {

        console.error("Certificate Error:", error);

        showCertificateMessage(
            error.message ||
            "Unable to load your certificate. Please try again."
        );

    }

}


// Format the issue date for display.
function formatIssueDate(dateValue) {

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return String(dateValue);
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    });

}


// Display an error or information message.
function showCertificateMessage(message) {

    let messageBox = document.getElementById(
        "certificateMessage"
    );

    if (!messageBox) {

        messageBox = document.createElement("div");

        messageBox.id = "certificateMessage";

        messageBox.style.cssText = `
            max-width: 700px;
            margin: 25px auto;
            padding: 18px 22px;
            border-radius: 10px;
            background: #fff3f3;
            color: #a12626;
            border: 1px solid #f0caca;
            font-family: Poppins, sans-serif;
            font-size: 14px;
            line-height: 1.7;
            text-align: center;
        `;

        const page = document.querySelector(".certificate-page");

        if (page) {
            page.prepend(messageBox);
        }

    }

    messageBox.textContent = message;
    messageBox.style.display = "block";

    const certificate = document.getElementById("certificate");

    if (certificate) {
        certificate.style.display = "none";
    }

}
