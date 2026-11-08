// ==========================================================
// Student Helper Hub
// Premium Notes Page
// topic.js
// ==========================================================

async function loadUserProgress() {

    const token = localStorage.getItem("token");

    if (!token) {
        return;
    }

    try {

        const response = await fetch(
            "https://studenthelperhub.onrender.com/progress",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const data = await response.json();

        console.log("USER PROGRESS RESPONSE:", data);

        if (!response.ok || !data.success) {

            console.log("Failed to load user progress.");

            return;
        }

        window.completedTopicIds = data.progress
            .filter(function(item) {
                return item.subject_id === currentSubject.id;
            })
            .map(function(item) {
                return item.topic_id;
            });

        updateDashboard();

        displayTopics(filteredTopics);

    }
    catch(error) {

        console.error(
            "LOAD PROGRESS ERROR:",
            error
        );

    }
}

// ==========================================================
// GLOBAL VARIABLES
// ==========================================================

let currentSemester = null;

let currentSubject = null;

let currentTopics = [];

let filteredTopics = [];


// ==========================================================
// PAGE LOAD
// ==========================================================

window.onload = function(){

    initializePage();

};


// ==========================================================
// INITIALIZE PAGE
// ==========================================================

function initializePage(){

    loadSubject();

}


// ==========================================================
// LOAD SUBJECT
// ==========================================================

function loadSubject(){

    currentSemester =
    Number(
        localStorage.getItem("selectedSemester")
    );

    let subjectId =
    localStorage.getItem("selectedSubject");


    if(
        !currentSemester ||
        !subjectId
    ){

        alert("No subject selected.");

        window.location.href =
        "subjectnotes.html";

        return;

    }

    let semesterData =
         notesData[currentSemester];

    if(!semesterData){

        alert("Semester not found.");

        return;

    }


    currentSubject =
    semesterData.subjects.find(function(subject){

        return subject.id === subjectId;

    });


    if(!currentSubject){

        alert("Subject not found.");

        return;

    }


    currentTopics =
    currentSubject.topics;

    filteredTopics =
    [...currentTopics];


    loadSubjectDetails();

}


// ==========================================================
// LOAD SUBJECT DETAILS
// ==========================================================

function loadSubjectDetails(){

    document.getElementById("subjectTitle").innerText =
    currentSubject.name;

    document.getElementById("topicCount").innerText =
    currentTopics.length;

    document.getElementById("totalTopics").innerText =
    currentTopics.length;


    updateDashboard();


    displayTopics(filteredTopics);

    loadUserProgress();

}

// ==========================================================
// PREMIUM BACKGROUND IMAGES
// ==========================================================

const topicImages = [

"https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

"https://images.unsplash.com/photo-1498050108023-c5249f4df085",

"https://images.unsplash.com/photo-1517694712202-14dd9538aa97",

"https://images.unsplash.com/photo-1555066931-4365d14bab8c",

"https://images.unsplash.com/photo-1516321318423-f06f85e504b3",

"https://images.unsplash.com/photo-1516116216624-53e697fedbea",

"https://images.unsplash.com/photo-1526379095098-d400fd0bf935",

"https://images.unsplash.com/photo-1519389950473-47ba0277781c"

];


// ==========================================================
// DISPLAY TOPICS
// ==========================================================



function openBookmarks(){

    window.location.href = "bookmarks.html";
}

function displayTopics(topics){

    let container =
    document.getElementById("topicsContainer");

    container.innerHTML = "";

    topics.forEach(function(topic,index){

        let image =

        topicImages[
            index %
            topicImages.length
        ];


        container.innerHTML += `

<div
class="topic-card"
style="background-image:url('${image}')">

    <div class="topic-overlay">

        <div class="topic-header">

            <div class="topic-number">

                ${String(index + 1).padStart(2,"0")}

            </div>

            <div class="topic-badge ${isCompleted(index) ? 'completed-badge' : topic.difficulty.toLowerCase()}">

                ${
                    isCompleted(index)
                    ?
                    "✅ Completed"
                    :
                    topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)
                }

            </div>

        </div>

        <div class="topic-content">

            <h2>

                ${topic.title}

            </h2>

            <p>

                ${topic.description}

            </p>

        </div>

        <div class="topic-footer">

            <div class="topic-time">

                <i class="fa-regular fa-clock"></i>

                ${topic.readingTime}

            </div>

            <button
            class="study-btn"
            onclick="openFilteredTopic(${index})">

                <i class="fa-solid fa-book-open"></i>

                Study Topic

            </button>

            <div class="topic-actions">

                <button
                class="icon-btn bookmark-btn"
                onclick="bookmarkTopic(${index})">

                    <i class="fa-solid fa-bookmark"></i>

                </button>

                <button
                class="icon-btn complete-btn"
                onclick="${
                    isCompleted(index)
                    ?
                    'markIncomplete(' + index + ')'
                    :
                    'markComplete(' + index + ')'
                }">

                    <i class="fa-solid fa-check"></i>

                </button>

            </div>

        </div>

    </div>

</div>

`;

    });

}

// ==========================================================
// UPDATE DASHBOARD
// ==========================================================

function updateDashboard(){

    let completed = 0;

    let remainingMinutes = 0;

    let nextTopic = null;

    currentTopics.forEach(function(topic){

        const isCompleted =
            window.completedTopicIds &&
            window.completedTopicIds.includes(topic.id);

        if(isCompleted){

            completed++;

        }
        else{

            if(nextTopic === null){

                nextTopic = topic;

            }

            let minutes =
                parseInt(topic.readingTime) || 0;

            remainingMinutes += minutes;

        }

    });


    // =====================================
    // PROGRESS
    // =====================================

    let percentage = 0;

    if(currentTopics.length > 0){

        percentage = Math.round(
            (completed / currentTopics.length) * 100
        );

    }

    document.getElementById("progressBar")
        .style.width = percentage + "%";

    document.getElementById("progressText")
        .innerText = percentage + "% Completed";


    // =====================================
    // STATISTICS
    // =====================================

    document.getElementById("completedTopics")
        .innerText = completed;

    document.getElementById("remainingTopics")
        .innerText =
        currentTopics.length - completed;

    document.getElementById("totalTopics")
        .innerText =
        currentTopics.length;


    // =====================================
    // READING TIME
    // =====================================

    if(remainingMinutes >= 60){

        let hrs =
            Math.floor(remainingMinutes / 60);

        let mins =
            remainingMinutes % 60;

        document.getElementById("remainingTime")
            .innerText =
            hrs + "h " + mins + "m";

    }
    else{

        document.getElementById("remainingTime")
            .innerText =
            remainingMinutes + " mins";

    }


    // =====================================
    // NEXT TOPIC
    // =====================================

    if(nextTopic){

        document.getElementById("nextTopicText")
            .innerText =
            nextTopic.title;

    }
    else{

        document.getElementById("nextTopicText")
            .innerText =
            "🎉 Subject Completed";

    }


    // =====================================
    // BUTTON TEXT
    // =====================================

    let btn =
        document.getElementById("startLearningBtn");

    if(percentage === 0){

        btn.innerHTML =
            '<i class="fa-solid fa-play"></i> Start Learning';

    }
    else if(percentage === 100){

        btn.innerHTML =
            '<i class="fa-solid fa-rotate-left"></i> Revise Subject';

    }
    else{

        btn.innerHTML =
            '<i class="fa-solid fa-play"></i> Continue Learning';

    }
    const certificateBtn = document.getElementById("getCertificateBtn");

    if (certificateBtn) {
        certificateBtn.style.display = percentage === 100 ? "inline-block" : "none";
    }

}

function openCertificate() {
    const subjectId = currentSubject && currentSubject.id;

    if (!subjectId) {
        alert("Please select a subject first.");
        return;
    }

    localStorage.setItem("selectedSubject", subjectId);
    window.location.href = "certificate.html";
}

// ==========================================================
// SEARCH TOPICS
// ==========================================================

function searchTopics(){

    let keyword =

    document
    .getElementById("searchTopic")
    .value
    .toLowerCase()
    .trim();

    if(keyword === ""){

        filteredTopics = [...currentTopics];

    }

    else{

        filteredTopics = currentTopics.filter(function(topic){

            return (

                topic.title
                .toLowerCase()
                .includes(keyword)

                ||

                topic.description
                .toLowerCase()
                .includes(keyword)

                ||

                topic.difficulty
                .toLowerCase()
                .includes(keyword)

            );

        });

    }

    displayTopics(filteredTopics);

}



// ==========================================================
// START / CONTINUE LEARNING
// ==========================================================

function startLearning(){

    for(
        let i = 0;
        i < currentTopics.length;
        i++
    ){

        const completed =
            window.completedTopicIds &&
            window.completedTopicIds.includes(
                currentTopics[i].id
            );

        if(!completed){

            openTopic(i);

            return;

        }

    }

    openTopic(0);

}



// ==========================================================
// OPEN TOPIC
// ==========================================================

function openTopic(index){

    localStorage.setItem(

        "selectedTopic",

        currentTopics[index].id

    );

    localStorage.setItem(

        "selectedTopicId",

        currentTopics[index].id

    );

    window.location.href =

    "topic_content.html";

}



// ==========================================================
// GO TO FIRST IN SEARCH
// ==========================================================

function openFilteredTopic(index){

    let topic = filteredTopics[index];

    let actualIndex =

    currentTopics.findIndex(function(item){

        return item.id === topic.id;

    });

    openTopic(actualIndex);

}



// ==========================================================
// ENTER KEY SUPPORT
// ==========================================================

document.addEventListener(

"DOMContentLoaded",

function(){

    let search =

    document.getElementById("searchTopic");

    if(search){

        search.addEventListener(

        "keypress",

        function(event){

            if(event.key === "Enter"){

                searchTopics();

            }

        });

    }

});

// ==========================================================
// BOOKMARK TOPIC
// ==========================================================

async function bookmarkTopic(index){

    let topic = filteredTopics[index];

    const token = localStorage.getItem("token");

    // User must be logged in
    if(!token){

        alert("Please login to bookmark topics.");

        window.location.href = "../auth/login.html";

        return;
    }

    try {

        const response = await fetch(
            "https://studenthelperhub.onrender.com/bookmarks/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({

                    subjectId: currentSubject.id,

                    topicId: topic.id

                })
            }
        );

        const data = await response.json();

        console.log(
            "BOOKMARK API RESPONSE:",
            data
        );

        if(!response.ok || !data.success){

            alert(
                data.message ||
                "Failed to save bookmark."
            );

            return;
        }

        // Keep the existing localStorage bookmark system
        let bookmarks =
            JSON.parse(
                localStorage.getItem("bookmarks")
            ) || [];

        let exists =
            bookmarks.some(function(item){

                return item.topic.id === topic.id;

            });

        if(!exists){

            bookmarks.push({

                semester: currentSemester,

                subjectId: currentSubject.id,

                subjectName: currentSubject.name,

                topic: topic

            });

            localStorage.setItem(
                "bookmarks",
                JSON.stringify(bookmarks)
            );

        }

        alert("Bookmarked successfully!");

    }
    catch(error){

        console.error(
            "BOOKMARK ERROR:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

}

// ==========================================================
// MARK COMPLETE
// ==========================================================

async function markComplete(index){

    let topic = filteredTopics[index];

    const token = localStorage.getItem("token");

    // User must be logged in
    if(!token){

        alert("Please login to save your learning progress.");

        window.location.href = "../auth/login.html";

        return;
    }

    try {

        const response = await fetch(
            "https://studenthelperhub.onrender.com/progress/complete",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({

                    subjectId: currentSubject.id,

                    topicId: topic.id

                })
            }
        );

        const data = await response.json();

        console.log(
            "PROGRESS API RESPONSE:",
            data
        );

        if(!response.ok || !data.success){

            alert(
                data.message ||
                "Failed to save progress."
            );

            return;
        }

        // Update current page's progress immediately
        if(!window.completedTopicIds){

            window.completedTopicIds = [];

        }

        if(!window.completedTopicIds.includes(topic.id)){

            window.completedTopicIds.push(topic.id);

        }

        updateDashboard();

        displayTopics(filteredTopics);

    }
    catch(error){

        console.error(
            "PROGRESS ERROR:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

}



// ==========================================================
// REMOVE COMPLETION
// ==========================================================

async function markIncomplete(index){

    let topic = filteredTopics[index];

    const token = localStorage.getItem("token");

    if(!token){

        alert("Please login to update your learning progress.");

        window.location.href = "../auth/login.html";

        return;
    }

    try {

        const response = await fetch(
            "https://studenthelperhub.onrender.com/progress/incomplete",
            {
                method: "DELETE",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },

                body: JSON.stringify({

                    subjectId: currentSubject.id,

                    topicId: topic.id

                })
            }
        );

        const data = await response.json();

        console.log(
            "INCOMPLETE PROGRESS API RESPONSE:",
            data
        );

        if(!response.ok || !data.success){

            alert(
                data.message ||
                "Failed to update progress."
            );

            return;
        }

        if(window.completedTopicIds){

            window.completedTopicIds =
                window.completedTopicIds.filter(function(id){

                    return id !== topic.id;

                });

        }

        updateDashboard();

        displayTopics(filteredTopics);

    }
    catch(error){

        console.error(
            "INCOMPLETE PROGRESS ERROR:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

}

// ==========================================================
// CHECK COMPLETED
// ==========================================================

function isCompleted(index){

    let topic = filteredTopics[index];

    if(!topic){
        return false;
    }

    return (
        window.completedTopicIds &&
        window.completedTopicIds.includes(topic.id)
    );

}



// ==========================================================
// PAGE REFRESH
// ==========================================================

window.addEventListener(

"focus",

function(){

    updateDashboard();

    displayTopics(filteredTopics);

});