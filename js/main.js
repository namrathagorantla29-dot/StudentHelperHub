// =======================
// USER SESSION
// =======================

window.addEventListener("load", function(){

    let userName = localStorage.getItem("userName");
    let loggedIn = localStorage.getItem("isLoggedIn");

    if(loggedIn === "true" && userName){

        let welcome = document.getElementById("welcomeUser");
        let hero = document.getElementById("heroGreeting");

        if(welcome) welcome.innerText = "Welcome, " + userName + " 👋";
        if(hero) hero.innerText = "Glad to see you again, " + userName;

        let loginBtn = document.getElementById("loginBtn");
        let signupBtn = document.getElementById("signupBtn");
        let logoutBtn = document.getElementById("logoutBtn");

        if(loginBtn) loginBtn.style.display = "none";
        if(signupBtn) signupBtn.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "inline-block";
    }
});

// =======================
// NAVIGATION
// =======================

function openPage(page){
    window.location.href = page;
}

// =======================
// NAVBAR ACTIVE
// =======================

function setActiveNavbar(){

    let page = window.location.pathname.split("/").pop();

    let map = {
        "index.html":"home",
        "notes.html":"notes",
        "links.html":"links",
        "doubts.html":"doubts",
        "login.html":"login"
    };

    let id = map[page];
    if(id){
        let el = document.getElementById(id);
        if(el) el.classList.add("active");
    }
}

setActiveNavbar();

// ======================================
// OPEN SUBJECT LINKS PAGE
// ======================================

function openSubjectLinks(subject){

    localStorage.setItem("selectedSubject", subject);

    window.location.href = "../links/subjectlinks.html";
}

// ======================================
// SHOW NOTES SUBJECTS
// ======================================

function showSubjects(sem, clickedCard){

    let semesterPage = document.getElementById("semesterPage");
    let subjectPage = document.getElementById("subjectPage");

    let title = document.getElementById("subjectTitle");
    let box = document.getElementById("subjectCards");

    if(!semesterPage || !subjectPage || !title || !box) return;

    semesterPage.style.display = "none";
    subjectPage.style.display = "block";

    document.querySelectorAll(".card").forEach(card=>{
        card.classList.remove("active");
    });

    if(clickedCard){
        clickedCard.classList.add("active");
    }

    function createCard(name, desc){

        return `
        <div class="subject-card"
             onclick="openNotes('${name}')">

            <h3>${name}</h3>
            <p>${desc}</p>

        </div>
        `;
    }

    // ================= SEMESTERS =================

    if(sem == 1){

        title.innerText = "Semester 1 Subjects";

        box.innerHTML =
            createCard("C Programming","Notes & Programs") +
            createCard("Python","Notes & Practice");
    }

    else if(sem == 2){

        title.innerText = "Semester 2 Subjects";

        box.innerHTML =
            createCard("Data Structures","Notes & Problems") +
            createCard("EEE","Unit Notes");
    }

    else if(sem == 3){

        title.innerText = "Semester 3 Subjects";

        box.innerHTML =
            createCard("DAA","Algorithms Notes") +
            createCard("C++","Programs & Notes");
    }

    else if(sem == 4){

        title.innerText = "Semester 4 Subjects";

        box.innerHTML =
            createCard("Web Development","HTML CSS JS Notes") +
            createCard("DBMS","Database Notes");
    }

    else if(sem == 5){

        title.innerText = "Semester 5 Subjects";

        box.innerHTML =
            createCard("Operating System","OS Notes") +
            createCard("Computer Networks","CN Notes") +
            createCard("Java","Java Notes");
    }

    else if(sem == 6){

        title.innerText = "Semester 6 Subjects";

        box.innerHTML =
            createCard("Artificial Intelligence","AI Notes") +
            createCard("Cloud Computing","Cloud Notes") +
            createCard("Cyber Security","Security Notes");
    }
}

// ======================================
// OPEN NOTES PAGE
// ======================================

function openNotes(subject){

    localStorage.setItem("selectedSubject", subject);

    window.location.href = "subjectlinks.html";
}

// ======================================
// SHOW LINKS
// ======================================

function showLinks(sem, clickedCard){

    let semesterPage = document.getElementById("linksMainPage");
    let subjectPage = document.getElementById("resourcePage");

    let title = document.getElementById("resourceTitle");
    let box = document.getElementById("resourceCards");

    if(!semesterPage || !subjectPage || !title || !box) return;

    semesterPage.style.display = "none";
    subjectPage.style.display = "block";

    // remove active class
    document.querySelectorAll(".card").forEach(card=>{
        card.classList.remove("active");
    });

    // active clicked card
    if(clickedCard){
        clickedCard.classList.add("active");
    }

    // create subject card
    function createCard(name, desc){

        return `
        <div class="subject-card">

            <h3>${name}</h3>

            <p>${desc}</p>

            <a href="#"
            class="open-btn"
            onclick="openSubjectLinks('${name}')">
            Open
            </a>

        </div>
        `;
    }

    // ================= SEMESTER 1 =================

    if(sem == 1){

        title.innerText = "Semester 1 Resources";

        box.innerHTML =
            createCard("C Programming","Programming Resources") +
            createCard("Python","Python Resources");
    }

    // ================= SEMESTER 2 =================

    else if(sem == 2){

        title.innerText = "Semester 2 Resources";

        box.innerHTML =
            createCard("Data Structures","DS Resources") +
            createCard("EEE","EEE Resources");
    }

    // ================= SEMESTER 3 =================

    else if(sem == 3){

        title.innerText = "Semester 3 Resources";

        box.innerHTML =
            createCard("DAA","Algorithms Resources") +
            createCard("C++","C++ Resources");
    }

    // ================= SEMESTER 4 =================

    else if(sem == 4){

        title.innerText = "Semester 4 Resources";

        box.innerHTML =
            createCard("Web Development","Web Resources") +
            createCard("DBMS","DBMS Resources");
    }

    // ================= SEMESTER 5 =================

    else if(sem == 5){

        title.innerText = "Semester 5 Resources";

        box.innerHTML =
            createCard("Operating System","OS Resources") +
            createCard("Computer Networks","CN Resources") +
            createCard("Java","Java Resources");
    }

    // ================= SEMESTER 6 =================

    else if(sem == 6){

        title.innerText = "Semester 6 Resources";

        box.innerHTML =
            createCard("Artificial Intelligence","AI Resources") +
            createCard("Cloud Computing","Cloud Resources") +
            createCard("Cyber Security","Security Resources");
    }

    // ================= SAVED LINKS =================

    else if(sem == 7){

        title.innerText = "⭐ My Saved Links";

        box.innerHTML = `

        <div class="subject-card">

            <h3>📌 GeeksforGeeks</h3>

            <p>Coding Tutorials</p>

            <a href="https://www.geeksforgeeks.org/"
               target="_blank"
               class="open-btn">
               Open
            </a>

        </div>

        <div class="subject-card">

            <h3>📌 W3Schools</h3>

            <p>Web Development Tutorials</p>

            <a href="https://www.w3schools.com/"
               target="_blank"
               class="open-btn">
               Open
            </a>

        </div>

        <div class="subject-card">

            <h3>📌 LeetCode</h3>

            <p>Practice Coding Questions</p>

            <a href="https://leetcode.com/"
               target="_blank"
               class="open-btn">
               Open
            </a>

        </div>

        `;
    }
}

function updateAuthUI() {

    const token = localStorage.getItem("token");

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileBtn = document.getElementById("profileBtn");

    if (!loginBtn || !signupBtn || !logoutBtn || !profileBtn) {
        return;
    }

    if (token) {

        // User is logged in
        loginBtn.style.display = "none";
        signupBtn.style.display = "none";

        logoutBtn.style.display = "block";
        profileBtn.style.display = "block";

    } else {

        // User is logged out
        loginBtn.style.display = "block";
        signupBtn.style.display = "block";

        logoutBtn.style.display = "none";
        profileBtn.style.display = "none";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    updateAuthUI();
});