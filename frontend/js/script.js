window.addEventListener("load", function(){

    let userName = localStorage.getItem("userName");
    let loggedIn = localStorage.getItem("isLoggedIn");

    if(loggedIn === "true" && userName){

        let welcomeUser = document.getElementById("welcomeUser");

        if(welcomeUser){
            welcomeUser.innerText =
            "Welcome, " + userName + " 👋";
        }

        let heroGreeting = document.getElementById("heroGreeting");

        if(heroGreeting){
            heroGreeting.innerText =
            "Glad to see you again, " + userName;
        }

        let loginBtn = document.getElementById("loginBtn");
        let signupBtn = document.getElementById("signupBtn");
        let logoutBtn = document.getElementById("logoutBtn");

        if(loginBtn) loginBtn.style.display = "none";
        if(signupBtn) signupBtn.style.display = "none";
        if(logoutBtn) logoutBtn.style.display = "inline-block";
            }
});

function showFeatures(){
    document.getElementById("features").style.display = "flex";
}
// =======================
// OPEN PAGE FROM CARDS
// =======================

function openPage(page)
{
    window.location.href = page;
}


// =======================
// NOTES PAGE
// =======================

function showSubjects(sem, clickedCard)
{
    let semesterPage = document.getElementById("semesterPage");
    let subjectPage = document.getElementById("subjectPage");

    let title = document.getElementById("subjectTitle");
    let box = document.getElementById("subjectCards");

    if(!semesterPage || !subjectPage || !title || !box) return;

    semesterPage.style.display = "none";
    subjectPage.style.display = "block";

    // remove active
    let cards = document.querySelectorAll(".card");
    cards.forEach(function(card){
        card.classList.remove("active");
    });

    if(clickedCard){
        clickedCard.classList.add("active");
    }

    // helper function to create clickable subject
    function createCard(name, desc){
        return `
        <div class="subject-card"
             onclick="openNotes('${name}')">
            <h3>${name}</h3>
            <p>${desc}</p>
        </div>
        `;
    }

    // =====================

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

    else if(sem == 7){
        title.innerText = "My Saved Notes";
        box.innerHTML =
            createCard("My Note 1","Personal Notes") +
            createCard("My Note 2","Saved Material");
    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// =======================
// BACK BUTTON
// =======================

function goBack()
{
    let semesterPage = document.getElementById("semesterPage");
    let subjectPage = document.getElementById("subjectPage");

    if(!semesterPage || !subjectPage) return;

    subjectPage.style.display = "none";
    semesterPage.style.display = "block";

    // Remove active style
    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card){
        card.classList.remove("active");
    });

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// =======================
// NAVBAR ACTIVE PAGE
// =======================

function setActiveNavbar()
{
    let page = window.location.pathname.split("/").pop();

    if(page == "index.html" || page == "")
    {
        let home = document.getElementById("home");
        if(home) home.classList.add("active");
    }

    else if(page == "notes.html")
    {
        let notes = document.getElementById("notes");
        if(notes) notes.classList.add("active");
    }

    else if(page == "links.html")
    {
        let links = document.getElementById("links");
        if(links) links.classList.add("active");
    }

    else if(page == "doubts.html")
    {
        let doubts = document.getElementById("doubts");
        if(doubts) doubts.classList.add("active");
    }

    else if(page == "login.html")
    {
        let login = document.getElementById("login");
        if(login) login.classList.add("active");
    }
}

setActiveNavbar();

// ===============================
// LINKS DATA
// ===============================

const linksData = {

1:{
title:"Semester 1 Resources",
items:[
["C Programming","Beginner to Advanced"],
["Python","Basics to Projects"]
]
},

2:{
title:"Semester 2 Resources",
items:[
["Data Structures","Complete Playlist"],
["EEE","Easy Concepts"]
]
},

3:{
title:"Semester 3 Resources",
items:[
["DAA","Algorithms Made Easy"],
["C++","OOP Concepts"]
]
},

4:{
title:"Semester 4 Resources",
items:[
["Web Development","HTML CSS JS Full Course"],
["DBMS","SQL + Theory"]
]
},

5:{
title:"Semester 5 Resources",
items:[
["Operating System","Full Notes Playlist"],
["Computer Networks","Networking Course"],
["Java","Core Java to OOP"]
]
},

6:{
title:"Semester 6 Resources",
items:[
["Artificial Intelligence","AI Basics"],
["Cloud Computing","AWS + Cloud Intro"],
["Cyber Security","Security Concepts"]
]
},

7:{
title:"My Saved Links",
items:[
["My Internship Link","Saved Resource"],
["My Coding Resource","Saved Tutorial"]
]
}

};
// ===============================
// SHOW LINKS PAGE
// ===============================

function showLinks(sem, clickedCard)
{
    let mainPage = document.getElementById("linksMainPage");
    let resourcePage = document.getElementById("resourcePage");
    let title = document.getElementById("resourceTitle");
    let box = document.getElementById("resourceCards");

    if(!mainPage || !resourcePage || !title || !box) return;

    let data = linksData[sem];

    if(!data) return;

    // Hide semester page
    mainPage.style.display = "none";

    // Show subjects page
    resourcePage.style.display = "block";

    // Remove active card
    document.querySelectorAll(".card").forEach(function(card){
        card.classList.remove("active");
    });

    // Highlight clicked semester
    if(clickedCard){
        clickedCard.classList.add("active");
    }

    // Title
    title.innerText = data.title;

    // Build subject cards
    let html = "";

    data.items.forEach(function(item){

        html += `
        <div class="card">

            <h3>${item[0]}</h3>

            <p>${item[1]}</p>

            <button href="#"
               class="open-btn"
               onclick="openSubjectLinks('${item[0]}')">
               Open Resources
            </button>

        </div>
        `;
    });

    box.innerHTML = html;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}


// ===============================
// OPEN SUBJECT RESOURCE PAGE
// ===============================

function openSubjectLinks(subject)
{
    localStorage.setItem("selectedSubject", subject);

    window.location.href = "../links/subjectlinks.html";
}



// ===============================
// BACK BUTTON
// ===============================

function goBackLinks()
{
    let mainPage = document.getElementById("linksMainPage");
    let resourcePage = document.getElementById("resourcePage");

    if(!mainPage || !resourcePage) return;

    resourcePage.style.display = "none";
    mainPage.style.display = "block";

    document.querySelectorAll(".card").forEach(function(card){
        card.classList.remove("active");
    });

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

// ===============================
// SUBJECT LINKS PAGE LOAD
// ===============================

window.addEventListener("load", function(){

    if(window.location.pathname.includes("subjectlinks.html")){

        let subject = localStorage.getItem("selectedSubject");

        let title = document.getElementById("subjectTitle");
        let box = document.getElementById("resourceBox");

        if(!title || !box) return;

        title.innerText = subject + " Resources";

        let html = "";

        // ===============================
        // SEMESTER 1
        // ===============================

        if(subject == "C Programming"){
            html = `
            <div class="card">
                <h3>C Programming Playlist</h3>
                <a href="https://www.youtube.com/results?search_query=c+programming+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "Python"){
            html = `
            <div class="card">
                <h3>Python Full Course</h3>
                <a href="https://www.youtube.com/results?search_query=python+full+course" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        // ===============================
        // SEMESTER 2
        // ===============================

        else if(subject == "Data Structures"){
            html = `
            <div class="card">
                <h3>Data Structures Playlist</h3>
                <a href="https://www.youtube.com/results?search_query=data+structures+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "EEE"){
            html = `
            <div class="card">
                <h3>EEE Tutorials</h3>
                <a href="https://www.youtube.com/results?search_query=EEE+tutorials" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        // ===============================
        // SEMESTER 3
        // ===============================

        else if(subject == "DAA"){
            html = `
            <div class="card">
                <h3>DAA Algorithms Course</h3>
                <a href="https://www.youtube.com/results?search_query=design+analysis+algorithm+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "C++"){
            html = `
            <div class="card">
                <h3>C++ Full Course</h3>
                <a href="https://www.youtube.com/results?search_query=c%2B%2B+full+course" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        // ===============================
        // SEMESTER 4
        // ===============================

        else if(subject == "Web Development"){
            html = `
            <div class="card">
                <h3>Web Development Full Stack</h3>
                <a href="https://www.youtube.com/results?search_query=web+development+full+course" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "DBMS"){
            html = `
            <div class="card">
                <h3>DBMS Full Course</h3>
                <a href="https://www.youtube.com/results?search_query=dbms+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        // ===============================
        // SEMESTER 5
        // ===============================

        else if(subject == "Operating System"){
            html = `
            <div class="card">
                <h3>Operating System Playlist</h3>
                <a href="https://www.youtube.com/results?search_query=operating+system+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "Computer Networks"){
            html = `
            <div class="card">
                <h3>Computer Networks Course</h3>
                <a href="https://www.youtube.com/results?search_query=computer+networks+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "Java"){
            html = `
            <div class="card">
                <h3>Java Full Course</h3>
                <a href="https://www.youtube.com/results?search_query=java+full+course" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        // ===============================
        // SEMESTER 6
        // ===============================

        else if(subject == "Artificial Intelligence"){
            html = `
            <div class="card">
                <h3>Artificial Intelligence Course</h3>
                <a href="https://www.youtube.com/results?search_query=artificial+intelligence+course" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "Cloud Computing"){
            html = `
            <div class="card">
                <h3>Cloud Computing Playlist</h3>
                <a href="https://www.youtube.com/results?search_query=cloud+computing+playlist" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        else if(subject == "Cyber Security"){
            html = `
            <div class="card">
                <h3>Cyber Security Course</h3>
                <a href="https://www.youtube.com/results?search_query=cyber+security+course" target="_blank" class="open-btn">Open YouTube</a>
            </div>`;
        }

        // ===============================
        // DEFAULT
        // ===============================

        else{
            html = `
            <div class="card">
                <h3>${subject}</h3>
                <a href="https://www.youtube.com/results?search_query=${subject}" target="_blank" class="open-btn">Search YouTube</a>
            </div>`;
        }

        box.innerHTML = html;
    }

});

// ===============================
// LOGIN FUNCTION
// ===============================

async function loginUser() {

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let remember = document.getElementById("remember");
    let msg = document.getElementById("msg");
    let button = document.querySelector(".login-btn");

    if (!email || !password || !msg || !button) return;

    let userEmail = email.value.trim();
    let userPassword = password.value.trim();

    msg.innerText = "";
    msg.style.color = "#0d47a1";

    // ===============================
    // EMPTY FIELD CHECK
    // ===============================

    if (userEmail === "" || userPassword === "") {
        msg.innerText = "Please fill all fields.";
        msg.style.color = "red";
        return;
    }

    // ===============================
    // EMAIL VALIDATION
    // ===============================

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

    if (!emailPattern.test(userEmail)) {
        msg.innerText = "Enter valid email address.";
        msg.style.color = "red";
        return;
    }

    // ===============================
    // PASSWORD LENGTH
    // ===============================

    if (userPassword.length < 6) {
        msg.innerText = "Password must be at least 6 characters.";
        msg.style.color = "red";
        return;
    }

    // ===============================
    // REMEMBER EMAIL
    // ===============================

    if (remember && remember.checked) {
        localStorage.setItem("savedEmail", userEmail);
    } else {
        localStorage.removeItem("savedEmail");
    }


    // ===============================
    // BUTTON LOADING
    // ===============================

    button.innerText = "Logging in...";
    button.disabled = true;

    // ===============================
    // BACKEND LOGIN API
    // ===============================

    try {

        const response = await fetch("https://studenthelperhub.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        });

        const data = await response.json();

        // ===============================
        // SUCCESS LOGIN
        // ===============================

        if (data.message === "Login Success ✅") {

            msg.innerText = "Login Successful 🎉";
            msg.style.color = "green";

            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userEmail", data.user.email);
            localStorage.setItem("isLoggedIn", "true");

            setTimeout(function () {
                window.location.href = "../index.html";
            }, 1200);

        }
        // ===============================
        // WRONG LOGIN
        // ===============================

        else {
            msg.innerText = data.message;
            msg.style.color = "red";
        }

    }
    // ===============================
    // SERVER ERROR
    // ===============================

    catch (error) {
        msg.innerText = "Server not responding!";
        msg.style.color = "red";
        console.log(error);
    }

    button.innerText = "Login";
    button.disabled = false;
}

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

function togglePassword() {

    let password = document.getElementById("password");
    let btn = document.querySelector(".show-btn");

    if (!password || !btn) return;

    if (password.type === "password") {
        password.type = "text";
        btn.innerText = "Hide";
    } else {
        password.type = "password";
        btn.innerText = "Show";
    }
}

// ===============================
// ENTER KEY LOGIN
// ===============================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        loginUser();
    }

});

function openMyNotes() {

    const token = localStorage.getItem("token");

    if (token) {
        window.location.href = "mynotes/mynotes.html";
    }
    else {
        alert("Please login first");
        window.location.href = "auth/login.html";
    }
}

// =====================================
// DOUBTS PAGE PROFESSIONAL JAVASCRIPT
// =====================================

// ===============================
// POST NEW DOUBT
// ===============================

function postDoubt()
{
    let subjectInput = document.getElementById("subjectInput");
    let doubtInput = document.getElementById("doubtInput");
    let myDoubts = document.getElementById("myDoubts");
    let recentDoubts = document.getElementById("recentDoubts");

    if(!subjectInput || !doubtInput || !myDoubts || !recentDoubts) return;

    let subject = subjectInput.value.trim();
    let doubt = doubtInput.value.trim();

    // Validation
    if(subject === "" || doubt === "")
    {
        alert("Please fill subject and doubt.");
        return;
    }

    // Create doubt card
    let newCard = createDoubtCard(subject, doubt, true);

    // Add to My Doubts
    myDoubts.prepend(newCard);

    // Clone for Recent Doubts
    let publicCard = createDoubtCard(subject, doubt, false);
    recentDoubts.prepend(publicCard);

    // Clear fields
    subjectInput.value = "";
    doubtInput.value = "";

    // Smooth scroll
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}



// ===============================
// CREATE DOUBT CARD
// ===============================

function createDoubtCard(subject, doubt, isMine)
{
    let card = document.createElement("div");
    card.className = "doubt-item";

    let buttons = "";

    if(isMine)
    {
        buttons = `
        <button class="small-btn" onclick="likeDoubt(this)">❤️ Like</button>
        <button class="small-btn" onclick="deleteDoubt(this)">🗑 Delete</button>
        `;
    }
    else
    {
        buttons = `
        <button class="small-btn" onclick="likeDoubt(this)">❤️ Like</button>
        <button class="small-btn" onclick="replyDoubt()">Reply</button>
        `;
    }

    card.innerHTML = `
        <h3>${subject}</h3>
        <p>${doubt}</p>

        <div class="actions">
            ${buttons}
        </div>
    `;

    return card;
}



// ===============================
// DELETE DOUBT
// ===============================

function deleteDoubt(button)
{
    let card = button.parentElement.parentElement;

    if(card)
    {
        card.remove();
    }
}



// ===============================
// LIKE BUTTON
// ===============================

function likeDoubt(button)
{
    if(button.innerText == "❤️ Like")
    {
        button.innerText = "💙 Liked";
    }
    else
    {
        button.innerText = "❤️ Like";
    }
}



// ===============================
// REPLY BUTTON
// ===============================

function replyDoubt()
{
    let text = prompt("Enter your reply:");

    if(text && text.trim() !== "")
    {
        alert("Reply Posted: " + text);
    }
    else
    {
        alert("Reply cancelled.");
    }
}

// ===============================
// MY NOTES PAGE LOAD
// ===============================

window.addEventListener("load", function () {

    if (window.location.pathname.includes("mynotes.html")) {

        let loggedIn = localStorage.getItem("isLoggedIn");
        let userName = localStorage.getItem("userName");

        if (loggedIn !== "true") {
            window.location.href = "../auth/login.html";
            return;
        }

        document.getElementById("welcomeText").innerText =
            "Welcome, " + userName + " 👋";

        loadNotes();
    }

});
let editId = null;

function toggleTheme(){

    let body = document.body;
    let btn = document.getElementById("themeBtn");

    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
        if(btn) btn.innerText = "☀ Light";
    }
    else{
        localStorage.setItem("theme","light");
        if(btn) btn.innerText = "🌙 Dark";
    }
}

window.addEventListener("load", function(){

    let savedTheme = localStorage.getItem("theme");
    let btn = document.getElementById("themeBtn");

    if(savedTheme === "dark"){
        document.body.classList.add("dark-mode");

        if(btn) btn.innerText = "☀ Light";
    }
});

window.addEventListener("load", function(){

    let saved = localStorage.getItem("siteTheme");

    if(saved){
        document.body.classList.add(saved + "-theme");
    }
});

// ======================================
// PREMIUM SUBJECT MASTER DATA
// ======================================

const subjectResources = {

    // ================= SEM 1 =================
    "C Programming":{
        youtube:"https://www.youtube.com/results?search_query=c+programming+playlist",
        pdf:"https://www.google.com/search?q=c+programming+pdf",
        interview:"https://www.google.com/search?q=c+programming+interview+questions",
        practice:"https://www.google.com/search?q=50+c+programming+questions",
        quiz:"https://www.google.com/search?q=c+programming+quiz",
        website:"https://www.w3schools.com/c/"
    },

    "Python":{
        youtube:"https://www.youtube.com/results?search_query=python+full+course",
        pdf:"https://www.google.com/search?q=python+notes+pdf",
        interview:"https://www.google.com/search?q=python+interview+questions",
        practice:"https://www.google.com/search?q=50+python+practice+questions",
        quiz:"https://www.google.com/search?q=python+quiz",
        website:"https://www.w3schools.com/python/"
    },

    "Mathematics 1":{
        youtube:"https://www.youtube.com/results?search_query=engineering+maths+1",
        pdf:"https://www.google.com/search?q=engineering+maths+1+pdf",
        interview:"#",
        practice:"https://www.google.com/search?q=maths+1+problems",
        quiz:"https://www.google.com/search?q=maths+quiz",
        website:"https://www.khanacademy.org/"
    },

    // ================= SEM 2 =================

    "Data Structures":{
        youtube:"https://www.youtube.com/results?search_query=data+structures+playlist",
        pdf:"https://www.google.com/search?q=data+structures+pdf",
        interview:"https://www.google.com/search?q=data+structures+interview+questions",
        practice:"https://www.google.com/search?q=data+structures+practice+questions",
        quiz:"https://www.google.com/search?q=data+structures+quiz",
        website:"https://www.geeksforgeeks.org/data-structures/"
    },

    "EEE":{
        youtube:"https://www.youtube.com/results?search_query=EEE+tutorials",
        pdf:"https://www.google.com/search?q=EEE+notes+pdf",
        interview:"#",
        practice:"https://www.google.com/search?q=EEE+questions",
        quiz:"#",
        website:"#"
    },

    "Digital Logic":{
        youtube:"https://www.youtube.com/results?search_query=digital+logic+design",
        pdf:"https://www.google.com/search?q=digital+logic+pdf",
        interview:"#",
        practice:"#",
        quiz:"#",
        website:"#"
    },

    // ================= SEM 3 =================

    "DAA":{
        youtube:"https://www.youtube.com/results?search_query=design+analysis+algorithm",
        pdf:"https://www.google.com/search?q=daa+notes+pdf",
        interview:"https://www.google.com/search?q=daa+questions",
        practice:"https://www.google.com/search?q=algorithm+problems",
        quiz:"#",
        website:"https://www.geeksforgeeks.org/"
    },

    "C++":{
        youtube:"https://www.youtube.com/results?search_query=c%2B%2B+full+course",
        pdf:"https://www.google.com/search?q=c%2B%2B+pdf",
        interview:"https://www.google.com/search?q=c%2B%2B+interview+questions",
        practice:"https://www.google.com/search?q=c%2B%2B+practice+questions",
        quiz:"#",
        website:"https://www.w3schools.com/cpp/"
    },

    "Java":{
        youtube:"https://www.youtube.com/results?search_query=java+full+course",
        pdf:"https://www.google.com/search?q=java+notes+pdf",
        interview:"https://www.google.com/search?q=java+interview+questions",
        practice:"https://www.google.com/search?q=java+practice+questions",
        quiz:"https://www.google.com/search?q=java+quiz",
        website:"https://www.w3schools.com/java/"
    },

    // ================= SEM 4 =================

    "DBMS":{
        youtube:"https://www.youtube.com/results?search_query=dbms+playlist",
        pdf:"https://www.google.com/search?q=dbms+notes+pdf",
        interview:"https://www.google.com/search?q=dbms+interview+questions",
        practice:"https://www.google.com/search?q=dbms+practice+questions",
        quiz:"https://www.google.com/search?q=dbms+quiz",
        website:"https://www.geeksforgeeks.org/dbms/"
    },

    "Web Development":{
        youtube:"https://www.youtube.com/results?search_query=web+development+full+course",
        pdf:"https://www.google.com/search?q=web+development+notes+pdf",
        interview:"https://www.google.com/search?q=web+development+interview+questions",
        practice:"https://www.google.com/search?q=html+css+js+practice+questions",
        quiz:"#",
        website:"https://www.w3schools.com/"
    },

    "Operating System":{
        youtube:"https://www.youtube.com/results?search_query=operating+system+playlist",
        pdf:"https://www.google.com/search?q=operating+system+notes+pdf",
        interview:"https://www.google.com/search?q=os+interview+questions",
        practice:"#",
        quiz:"#",
        website:"#"
    },

    // ================= SEM 5 =================

    "Computer Networks":{
        youtube:"https://www.youtube.com/results?search_query=computer+networks+playlist",
        pdf:"https://www.google.com/search?q=computer+networks+pdf",
        interview:"https://www.google.com/search?q=computer+network+interview+questions",
        practice:"#",
        quiz:"#",
        website:"#"
    },

    "Software Engineering":{
        youtube:"https://www.youtube.com/results?search_query=software+engineering+playlist",
        pdf:"https://www.google.com/search?q=software+engineering+pdf",
        interview:"#",
        practice:"#",
        quiz:"#",
        website:"#"
    },

    // ================= SEM 6 =================

    "Artificial Intelligence":{
        youtube:"https://www.youtube.com/results?search_query=artificial+intelligence+course",
        pdf:"https://www.google.com/search?q=artificial+intelligence+pdf",
        interview:"https://www.google.com/search?q=ai+interview+questions",
        practice:"#",
        quiz:"#",
        website:"#"
    },

    "Cloud Computing":{
        youtube:"https://www.youtube.com/results?search_query=cloud+computing+playlist",
        pdf:"https://www.google.com/search?q=cloud+computing+pdf",
        interview:"#",
        practice:"#",
        quiz:"#",
        website:"#"
    },

    "Cyber Security":{
        youtube:"https://www.youtube.com/results?search_query=cyber+security+course",
        pdf:"https://www.google.com/search?q=cyber+security+pdf",
        interview:"https://www.google.com/search?q=cyber+security+interview+questions",
        practice:"#",
        quiz:"#",
        website:"#"
    }

};

// ======================================
// AUTO LOAD PREMIUM SUBJECT PAGE
// ======================================

window.addEventListener("load", function(){

    if(window.location.pathname.includes("subjectlinks.html")){

        let subject = localStorage.getItem("selectedSubject");

        let data = subjectResources[subject];

        document.getElementById("subjectTitle").innerText = subject;

        if(!data) return;

        document.querySelector(".youtube-card a").href = data.youtube;
        document.querySelector(".pdf-card a").href = data.pdf;
        document.querySelector(".interview-card a").href = data.interview;
        document.querySelector(".practice-card a").href = data.practice;
        document.querySelector(".quiz-card a").href ="quiz.html?subject=" + encodeURIComponent(subject);
        document.querySelector(".site-card a").href = data.website;
    }

});