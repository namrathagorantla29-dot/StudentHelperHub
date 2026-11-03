// =======================
// AUTHENTICATION CHECK
// =======================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "../auth/login.html";
}

// =======================
// ADD / UPDATE NOTE
// =======================

async function addNote() {

    let userId =
        localStorage.getItem("userId");

    console.log("USER ID:", userId);
}

function openSemester(semester){

    localStorage.setItem(

        "selectedSemester",

        semester

    );

    window.location.href =

        "subjectnotes.html";

}