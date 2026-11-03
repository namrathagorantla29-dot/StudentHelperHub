// ==========================================
// Student Helper Hub
// subjectnotes.js
// ==========================================

window.onload = function () {

    loadSubjects();

};

// ==========================================
// SUBJECT ICONS
// ==========================================

function getSubjectIcon(subjectName){

    switch(subjectName){

        case "C Programming":
            return "💻";

        case "Python":
            return "🐍";

        case "Data Structures":
            return "🌳";

        case "EEE":
            return "⚡";

        case "C++":
            return "⚙️";

        case "DAA":
            return "🧩";

        case "DBMS":
            return "🗄️";

        case "Web Development":
            return "🌐";

        case "Java":
            return "☕";

        case "Operating Systems":
            return "💽";

        case "Computer Networks":
            return "🌍";

        case "Artificial Intelligence":
            return "🤖";

        case "Cloud Computing":
            return "☁️";

        case "Cyber Security":
            return "🔐";

        default:
            return "📘";

    }

}

// ==========================================
// LOAD SUBJECTS
// ==========================================

async function loadSubjects() {

    const token = localStorage.getItem("token");

    let completedProgress = [];

    if (token) {

        try {

            const response = await fetch(
                "http://localhost:5000/progress",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {

                completedProgress = data.progress;

            }

        }
        catch(error) {

            console.error(
                "SUBJECT PROGRESS ERROR:",
                error
            );

        }

    }

    let semester = localStorage.getItem("selectedSemester");

    if (!semester) {

        alert("Please select a semester first.");

        window.location.href = "notes.html";

        return;

    }

    semester = Number(semester);

    let semesterData = notesData[semester];

    if (!semesterData) {

        alert("Semester not found.");

        window.location.href = "notes.html";

        return;

    }

    document.getElementById("semesterTitle").innerText =
        semesterData.title;

    let container =
        document.getElementById("subjectsContainer");

    container.innerHTML = "";

    semesterData.subjects.forEach(function (subject) {

        // ===============================
        // DEFAULT ICON
        // ===============================

        let icon = getSubjectIcon(subject.name);

        // ===============================
        // DEFAULT DESCRIPTION
        // ===============================

        let description =
            subject.description ||
            "Complete notes with important topics, PDFs and interview preparation.";

        // ===============================
        // TOTAL TOPICS
        // ===============================

        let totalTopics =
            subject.topics.length;

        // ===============================
        // PROGRESS
        // ===============================

        let completedCount = completedProgress.filter(function(item) {

            return item.subject_id === subject.id;

        }).length;

        let progress = 0;

        if (totalTopics > 0) {

            progress = Math.round(
                (completedCount / totalTopics) * 100
            );

        }

        // ===============================
        // CARD
        // ===============================

        container.innerHTML += `

        <div class="subject-card">

            <div class="subject-icon">

                ${icon}

            </div>

            <h2>

                ${subject.name}

            </h2>

            <p>

                ${description}

            </p>

            <div class="topic-count">

                📚 ${totalTopics} Topics

            </div>

            <br>

            <div
                style="
                width:100%;
                background:#ddd;
                border-radius:30px;
                overflow:hidden;
                height:12px;
                margin-top:15px;">

                <div
                    style="
                    width:${progress}%;
                    height:12px;
                    background:#1565c0;">
                </div>

            </div>

            <p
                style="
                margin-top:12px;
                color:#0d47a1;
                font-weight:bold;">

                Progress : ${progress}%

            </p>

            <button
                onclick="openSubject('${subject.id}')">

                📖 Open Subject

            </button>

        </div>

        `;

    });

}

// ==========================================
// OPEN SUBJECT
// ==========================================

function openSubject(subjectId) {

    localStorage.setItem(

        "selectedSubject",

        subjectId

    );

    window.location.href =
        "topic.html";

}

// ==========================================
// GO HOME
// ==========================================

function goHome() {

    window.location.href =
        "notes.html";

}