// ============================================
// Student Helper Hub
// topic_content.js
// ============================================

// Selected Subject & Topic
let currentSubject = null;
let currentTopic = null;
let currentTopicContent = null;

// ============================================
// LOAD PAGE
// ============================================

window.onload = function () {

    loadTopic();

};

// ============================================
// LOAD SELECTED TOPIC
// ============================================

function loadTopic() {

    const semester =
        Number(localStorage.getItem("selectedSemester"));

    const subjectId =
        localStorage.getItem("selectedSubject");

    console.log("Subject ID:", subjectId);
    console.log("ContentData Keys:", Object.keys(contentData));

    const topicId =
        localStorage.getItem("selectedTopic");

    if (!semester || !subjectId || !topicId) {

        alert("Unable to load topic.");

        window.location.href = "topic.html";

        return;

    }

    const semesterData = notesData[semester];

    if (!semesterData) {

        alert("Semester not found.");

        window.location.href = "topic.html";

        return;

    }

    currentSubject =
        semesterData.subjects.find(function (subject) {

            return subject.id === subjectId;

        });

    if (!currentSubject) {

        alert("Subject not found.");

        window.location.href = "topic.html";

        return;

    }

    currentTopic =
        currentSubject.topics.find(function (topic) {

            return topic.id === topicId;

        });

    if (!currentTopic) {

        alert("Topic not found.");

        window.location.href = "topic.html";

        return;

    }
    currentTopicContent =
       contentData[subjectId].topics[currentTopic.id];


        console.log("Current Topic ID:", currentTopic.id);
        console.log("Available Keys:", Object.keys(contentData));

    if (!currentTopicContent) {

        alert("Topic content not available.");

        return;

    }

    displayTopic();
    renderContent();
    updateProgress();

}

// ============================================
// DISPLAY BASIC INFORMATION
// ============================================

function displayTopic() {

    document.getElementById("topicTitle").innerText =
        currentTopic.title;

    document.getElementById("topicDescription").innerText =
        currentTopic.description;

    document.getElementById("readingTime").innerText =
        "⏱ " + currentTopic.readingTime;

    document.getElementById("readingTimeCard").innerText =
        currentTopic.readingTime;

    document.getElementById("difficultyBadge").innerText =
        getDifficultyIcon(currentTopic.difficulty) +
        " " +
        currentTopic.difficulty;

    document.getElementById("difficultyCard").innerText =
        getDifficultyIcon(currentTopic.difficulty) +
        " " +
        currentTopic.difficulty;

}

// ============================================
// DIFFICULTY ICON
// ============================================

function getDifficultyIcon(level) {

    switch (level) {

        case "Beginner":
            return "🟢";

        case "Intermediate":
            return "🟡";

        case "Advanced":
            return "🔴";

        default:
            return "⚪";

    }

}

function renderContent() {

    // -----------------------------
    // Overview
    // -----------------------------
    document.getElementById("overviewText").innerHTML = `
        <p>${currentTopicContent.overview}</p>
    `;

    // -----------------------------
    // Definition
    // -----------------------------
    document.getElementById("definitionText").innerHTML = `
        <p>${currentTopicContent.definition}</p>
    `;

    // -----------------------------
    // Features
    // -----------------------------
    let featureHTML = "<ul>";

    currentTopicContent.features.forEach(function(feature){

        featureHTML += `
            <li>${feature}</li>
        `;

    });

    featureHTML += "</ul>";

    document.getElementById("featuresList").innerHTML =
        featureHTML;

    // -----------------------------
    // Syntax
    // -----------------------------
    document.getElementById("syntaxCode").innerHTML = `
        <pre><code>${currentTopicContent.syntax}</code></pre>
    `;

    // -----------------------------
    // Example
    // -----------------------------
    document.getElementById("exampleCode").innerHTML = `
        <pre><code>${currentTopicContent.example}</code></pre>
    `;

    // -----------------------------
    // Applications
    // -----------------------------
    let appHTML = "<ul>";

    currentTopicContent.applications.forEach(function(app){

        appHTML += `
            <li>${app}</li>
        `;

    });

    appHTML += "</ul>";

    document.getElementById("applicationsList").innerHTML =
        appHTML;

    // -----------------------------
    // Advantages
    // -----------------------------
    let advHTML = "<ul>";

    currentTopicContent.advantages.forEach(function(item){

        advHTML += `
            <li>${item}</li>
        `;

    });

    advHTML += "</ul>";

    document.getElementById("advantagesList").innerHTML =
        advHTML;

    // -----------------------------
    // Disadvantages
    // -----------------------------
    let disHTML = "<ul>";

    currentTopicContent.disadvantages.forEach(function(item){

        disHTML += `
            <li>${item}</li>
        `;

    });

    disHTML += "</ul>";

    document.getElementById("disadvantagesList").innerHTML =
        disHTML;

    // -----------------------------
    // Summary
    // -----------------------------
    document.getElementById("summaryText").innerHTML = `
        <p>${currentTopicContent.summary}</p>
    `;

    // -----------------------------
    // Interview Questions
    // -----------------------------

    let interviewHTML = "";

    currentTopicContent.interviewQuestions.forEach(function(question){

        interviewHTML += `
            <div class="question">
                ${question}
            </div>
        `;

    });

    document.getElementById("interviewQuestions").innerHTML =
    interviewHTML;

    // -----------------------------
    // Practice Questions
    // -----------------------------

    let practiceHTML = "";

    currentTopicContent.practiceQuestions.forEach(function(question){

        practiceHTML += `
            <div class="practice">
                ${question}
            </div>
        `;

    });

    document.getElementById("practiceQuestions").innerHTML =
    practiceHTML;

    // -----------------------------
    // Note
    // -----------------------------
    document.getElementById("noteText").innerText =
    currentTopicContent.note || "No note available.";

    // -----------------------------
    // Tip
    // -----------------------------
    document.getElementById("tipText").innerText =
    currentTopicContent.tip || "No tip available.";

    // -----------------------------
    // Warning
    // -----------------------------
    document.getElementById("warningText").innerText =
    currentTopicContent.warning || "No warning available.";

    // -----------------------------
    // Important
    // -----------------------------
    document.getElementById("importantText").innerText =
    currentTopicContent.important || "No important point available.";
}

// Bookmark Topic
function bookmarkTopic(){

    let bookmarks =
    JSON.parse(localStorage.getItem("studyBookmarks")) || [];

    let alreadyBookmarked =
    bookmarks.find(function(item){

        return item.id === currentTopic.id;

    });

    if(alreadyBookmarked){

        alert("⭐ Topic already bookmarked!");

        return;

    }

    bookmarks.push({

        id: currentTopic.id,

        title: currentTopic.title,

        subject: currentSubject.name,

        semester:
        localStorage.getItem("selectedSemester")

    });

    localStorage.setItem(

        "studyBookmarks",

        JSON.stringify(bookmarks)

    );

    alert("⭐ Topic Bookmarked Successfully!");

}

// ============================================
// MARK COMPLETE
// ============================================

function markComplete(){

    let completedTopics =
    JSON.parse(localStorage.getItem("completedTopics")) || [];

    let exists =
    completedTopics.find(function(item){

        return item.id === currentTopic.id;

    });

    if(!exists){

        completedTopics.push({

            id: currentTopic.id,

            title: currentTopic.title

        });

        localStorage.setItem(

            "completedTopics",

            JSON.stringify(completedTopics)

        );

    }

    updateProgress();

    alert("✅ Topic Marked as Completed!");

}

// ============================================
// UPDATE PROGRESS
// ============================================

function updateProgress(){

    if(!currentSubject){
        return;
    }

    let completedTopics =
    JSON.parse(localStorage.getItem("completedTopics")) || [];

    let completed = 0;

    currentSubject.topics.forEach(function(topic){

        let found =
        completedTopics.find(function(item){

            return item.id === topic.id;

        });

        if(found){
            completed++;
        }

    });

    let percentage =
    Math.round(
        (completed/currentSubject.topics.length)*100
    );

    document.getElementById("progressFill").style.width =
    percentage + "%";
}

// ============================================
// BUTTON EVENTS
// ============================================

const bookmarkButton =
document.getElementById("bookmarkBtn");

if(bookmarkButton){

    bookmarkButton.addEventListener(

        "click",

        bookmarkTopic

    );

}

const completeButton =
document.getElementById("completeBtn");

if(completeButton){

    completeButton.addEventListener(

        "click",

        markComplete

    );

}

// ============================================
// LOAD PROGRESS
// ============================================

updateProgress();

// Previous Topic
function previousTopic(){

    let currentIndex =
    currentSubject.topics.findIndex(function(topic){

        return topic.id === currentTopic.id;

    });

    if(currentIndex <= 0){

        alert("This is the first topic.");

        return;

    }

    let previousTopic =
    currentSubject.topics[currentIndex-1];

    localStorage.setItem(

        "selectedTopic",

        previousTopic.id

    );

    location.reload();

}

// ============================================
// NEXT TOPIC
// ============================================

function nextTopic(){

    let currentIndex =
    currentSubject.topics.findIndex(function(topic){

        return topic.id === currentTopic.id;

    });

    if(currentIndex >= currentSubject.topics.length-1){

        alert("Congratulations! You completed all topics.");

        return;

    }

    let nextTopic =
    currentSubject.topics[currentIndex+1];

    localStorage.setItem(

        "selectedTopic",

        nextTopic.id

    );

    location.reload();

}

// ============================================
// BUTTON EVENTS
// ============================================

const previousButton =
document.getElementById("previousBtn");

if(previousButton){

    previousButton.addEventListener(

        "click",

        previousTopic

    );

}

const nextButton =
document.getElementById("nextBtn");

if(nextButton){

    nextButton.addEventListener(

        "click",

        nextTopic

    );

}

// ============================================
// COPY CODE
// ============================================

function copyCode(button){

    let code =
    button.parentElement.querySelector("code").innerText;

    navigator.clipboard.writeText(code);

    let originalText =
    button.innerText;

    button.innerText =
    "Copied ✓";

    setTimeout(function(){

        button.innerText =
        originalText;

    },1500);

}

// ============================================
// ATTACH COPY EVENTS
// ============================================

let copyButtons =
document.querySelectorAll(".copy-btn");

copyButtons.forEach(function(button){

    button.addEventListener(

        "click",

        function(){

            copyCode(button);

        }

    );

});

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll(".sidebar a").forEach(function(link){

    link.addEventListener("click",function(e){

        e.preventDefault();
        console.log("Clicked:", this.getAttribute("href"));
        let target =
        document.querySelector(

            this.getAttribute("href")

        );
        console.log(target);
        if(target){

            target.scrollIntoView({
                behavior:"smooth",
                block: "start"
            });

        }    else {

                 console.log("Target not found");
        }

    });

});

// ============================================
// BACK BUTTON
// ============================================

function goBack(){

    window.location.href =
    "topic.html";

}

// ============================================
// HIGHLIGHT ACTIVE SECTION
// ============================================

window.addEventListener("scroll",function(){

    let sections =
    document.querySelectorAll("section");

    let navLinks =
    document.querySelectorAll(".sidebar a");

    let current = "";

    sections.forEach(function(section){

        let sectionTop =
        section.offsetTop-120;

        if(pageYOffset >= sectionTop){

            current =
            section.getAttribute("id");

        }

    });

    navLinks.forEach(function(link){

        link.classList.remove("active");

        if(

            link.getAttribute("href") === "#"+current

        ){

            link.classList.add("active");

        }

    });

});

// ============================================
// INITIALIZE
// ============================================

console.log(

    "Student Helper Hub Study Page Loaded Successfully."

);

function openInterview(){

    window.location.href =
        "interview.html";

}